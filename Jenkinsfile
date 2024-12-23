pipeline {
    agent any
    parameters {
        choice(name: 'ENV', choices: ['DEV', 'QA'], description: 'Select Environment')
        string(name: 'SPEC', defaultValue: 'test/specs/*e2e.js', description: 'Test Spec Files')
    }
    environment {
        TEST_ENV = "${ENV.toLowerCase()}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    sh "ENV=${TEST_ENV} npx wdio run wdio.conf.js ${SPEC}"
                }
            }
        }
    }
    post {
        always {
            stage('Generate Allure Report') {
                steps {
                    allure([
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }
    }
}
