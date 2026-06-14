pipeline {
    agent any

    environment {
        IMAGE_NAME = "day15-node-app"
        IMAGE_TAG = "build-${BUILD_NUMBER}"
        K8S_DEPLOYMENT = "day15-deployment"
        K8S_CONTAINER = "day15-container"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                bat '''
                echo "Building Docker Image..."
                docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                kubectl apply -f k8s/
                kubectl set image deployment/%K8S_DEPLOYMENT% %K8S_CONTAINER%=%IMAGE_NAME%:%IMAGE_TAG%
                kubectl rollout status deployment/%K8S_DEPLOYMENT% --timeout=120s
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline SUCCESS!'
            bat 'kubectl get pods'
            bat 'kubectl get svc day15-service'
        }
        failure {
            echo 'Pipeline FAILED!'
            bat 'kubectl describe pods -l app=day15-app'
        }
    }
}