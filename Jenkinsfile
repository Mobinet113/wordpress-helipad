def composer = "/usr/local/bin/composer"
def themeDir = "httpdocs/app/themes/helipad"

pipeline {
    agent any

    environment {
        CI = 'true'
    }

    tools {
        nodejs 'Nodejs'
    }

   stages {
       stage('Download') {
           steps{
               sh "git pull origin master"
           }
       }
       stage('Install') {
           steps{
                sh "${composer} install"
                sh "npm install --prefix ${themeDir}"
           }
       }
       stage('Build') {
           steps {
                sh "npm run build --prefix ${themeDir}"
           }
       }
   }
}