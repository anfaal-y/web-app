# web-app CI/CD Pipeline

## Overview
- Create and initialize a simple nodejs application locally
- Initiatize a git repository and push it into github
- Create a dockerfile,build a docker image and push it into github
- Launch an AWS-EC2 instance and create and configure CI/CD pipeline using Jenkins
- Whenever a push happens in github the pipeline triggered and build a new container

### 1.Installing nodejs and creating a project
 - install nodejs and dependencies
 ```
 apt install nodejs
 apt install npm
 npm install express
 ```
 - creating nodejs project
 ```
 mkdir web-app
 cd web-app
 npm init -y      #initializing express frame work
 nano index.js    #paste node js code
 node index.js    #now the app is running on port 3000
 ```
 *test the app by accessing http://localhost:3000
 *stop the app using ctrl+c in terminal

### 2.Initializing git repo and pushing to github
 - Setting up git
   *make sure you have a github account and create a new repository
 ```
 apt install git
 git init      #initializing git repository
 git add .     #adding all files to git repo
 git commit -m "initiated simple nodejs app"      #committed the change
 git remote add origin https:/github.com/username/repository name           #for connecting github repo to local git repo
 git push origin master
```
  * when you push it asks for userid and passord, create a personal access tocken from git hub and paste it in password section

### 3.Installing docker and testing locally
 - install docker and create a docker file in web-app repository
 ```
 apt install docker.io
 nano dockerfile
 ```
 - dockerfile (paste this)
 ```
 FROM node:14
 WORKDIR /usr/src/app
 COPY package*.json ./
 RUN npm install
 COPY . .
 EXPOSE 3000
 CMD ["node","index.js"]
 ```
 - create our web-app image using dockerfile and test it locally
 ```
 docker build -t web-app       #build web-app image from dockerfile 
 docker run -p 3000:3000 web-app      #create container by mapping port 3000
 ```
   *test the app by accessing http://localhost:3000

### 4.Setting up AWS-EC2 instance
 - login to aws account and launch an EC2 instance (ubuntu)
 - download the ssh key (pem)
 - click the EC2 and goto security groups
  - edit inbound rules and add the port numbers below
    * 22 (SSH)
    * 80 (http)
    * 8080 (Jenkins)
    * 3000 (nodejs)
 - ssh into your instance using terminal or cmd
 ```
 ssh -i "your_key_name.pem" ubuntu@<your-ec2-public-ip>
 ```
 - installing docker and jenkins on EC2
 ```
 
 sudo apt update
 sudo apt install docker.io
 sudo systemctl start docker
 sudo systemctl enable docker

 sudo apt install openjdk-11-jdk   #installing java development kit
 
 wget -q -O - https://pkg.jenkins.io/jenkins.io.key | sudo apt-key add -
 sudo sh -c 'echo deb http://pkg.jenkins.io/debian/ stable main > /etc/apt/sources.list.d/jenkins.list'
 sudo apt update
 sudo apt install jenkins
 sudo systemctl start jenkins
 sudo systemctl enable jenkins

 sudo usermod -aG docker jenkins    #adding jenkins user to docker group
 sudo systemctl restart jenkins

```
### Configuring Jenkins and creating CI/CD pipeline
 - open jenkins by accessing <ec2-public-ip>:8080
 - Complete the setup wizard (you’ll need the initial admin password from /var/lib/jenkins/secrets/initialAdminPassword)
 - Install suggested plugins and Create first admin user
 - Goto - jenkins dashboard > new item > pipeline >
   * check mark "Github Project"
     project url = https://github.com/<user_id>/<repository_name>
   * check mark "GitHub hook trigger for GITScm polling"
 - Type the script in pipeline scipt section
 ```
 pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/anfaal-x/web-app'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t web-app .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove the old container if it exists
                    sh '''
                    if [ "$(docker ps -q -f name=your-app-container)" ]; then
                        docker stop your-app-container
                        docker rm your-app-container
                    fi
                    '''
                    // Run the new container
                    sh 'docker run -d --name your-app-container -p 3000:3000 web-app'
                }
            }
        }
    }
}
```
  *save the pipeline

### Creating Github Webhook
 - Go to your GitHub repository.
 - Navigate to Settings > Webhooks > Add webhook.
 - In the Payload URL, enter the following URL for Jenkins
   * http://<your-ec2-public-ip>:8080/github-webhook/
 - Set Content type to application/json.
 - Choose Just the push event.
 - Click Add webhook.

### Building and triggering the pipeline
 - Test the pipeline by clicking Build in Jenkins dashboard
   * access the web app using <ec2-public-ip>:3000 
 - Triggering
   * When you push changes to your GitHub repository:

    * The GitHub webhook triggers Jenkins.
    * Jenkins pulls the latest code from GitHub.
    * Jenkins builds a new Docker image using the Dockerfile in the repository.
    * The old Docker container is stopped and removed (if it exists), and a new container is started with the latest image.
