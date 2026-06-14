pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "day15-node-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Code already checked out'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest"
            }
        }
        
        stage('Deploy to K8s') {
            steps {
                bat 'kubectl apply -f k8s/'
                bat 'kubectl set image deployment/day15-deployment day15-container=%IMAGE_NAME%:%IMAGE_TAG%'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline Success! App deployed to K8s'
        }
        failure {
            echo 'Pipeline Failed! Check logs'
        }
    }
}