pipeline {
    agent any

    environment {
        IMAGE_NAME = "day15-node-app"
        IMAGE_TAG = "build-${BUILD_NUMBER}"
        K8S_DEPLOYMENT = "day15-deployment"
        K8S_CONTAINER = "day15-container"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Building ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Build Docker Image in Minikube') {
            steps {
                bat '''
                @echo off
                echo "Setting Minikube Docker Env..."
                for /f "delims=" %%i in ('minikube -p minikube docker-env --shell cmd') do call %%i
                echo "Building Docker Image..."
                docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest
                docker images | findstr %IMAGE_NAME%
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
            echo 'Pipeline SUCCESS - App Deployed to K8s!'
            bat '''
            echo "--- PODS ---"
            kubectl get pods
            echo "--- SERVICE ---"
            kubectl get svc day15-service
            echo "--- APP URL ---"
            minikube service day15-service --url
            '''
        }
        failure {
            echo 'Pipeline FAILED! Check logs above'
            bat 'kubectl describe pods -l app=day15-app'
        }
    }
}