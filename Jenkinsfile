pipeline {
    agent any

    environment {
        IMAGE_NAME = "day15-node-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        K8S_DEPLOYMENT = "day15-deployment"
        K8S_CONTAINER = "day15-container"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Code already checked out'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG%."
                bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest"
            }
        }

        stage('Load Image to Minikube') {
            steps {
                bat "minikube image load %IMAGE_NAME%:%IMAGE_TAG%"
                bat "minikube image load %IMAGE_NAME%:latest"
            }
        }

        stage('Deploy to K8s') {
            steps {
                bat 'kubectl apply -f k8s/'
                bat "kubectl set image deployment/%K8S_DEPLOYMENT% %K8S_CONTAINER%=%IMAGE_NAME%:%IMAGE_TAG%"
                bat "kubectl rollout status deployment/%K8S_DEPLOYMENT%"
            }
        }
    }

    post {
        success {
            echo 'Pipeline Success! App deployed to K8s'
            bat 'kubectl get pods'
            bat 'kubectl get svc day15-service'
        }
        failure {
            echo 'Pipeline Failed! Check logs'
        }
    }
}