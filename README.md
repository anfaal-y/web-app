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
 docker run -p 3000:3000 web-app      #run web-app image by mapping port 3000
 ```
   *test the app by accessing http://localhost:3000
