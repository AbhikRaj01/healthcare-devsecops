pipeline {
    agent any

    environment {
        IMAGE_NAME = 'healthcare-devsecops:1.0'
        KUBECONFIG = 'C:\\ProgramData\\Jenkins\\.kube-config'
        MINIKUBE_HOME = 'C:\\ProgramData\\Jenkins'
        PATH = "C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\Program Files\\Kubernetes\\Minikube;C:\\ProgramData\\Jenkins\\tools;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checked out from GitHub'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .\\app'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                bat 'trivy image --severity HIGH,CRITICAL %IMAGE_NAME%'
                bat 'trivy image --severity CRITICAL --exit-code 1 %IMAGE_NAME%'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'minikube image load %IMAGE_NAME% -p minikube'
                bat 'kubectl apply -f k8s\\deployment.yaml'
                bat 'kubectl apply -f k8s\\service.yaml'
                bat 'kubectl rollout status deployment/healthcare-app --timeout=120s'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'kubectl get deployments,services'
                bat 'kubectl get pods'
            }
        }
    }

    post {
        success {
            echo 'Healthcare DevSecOps pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}