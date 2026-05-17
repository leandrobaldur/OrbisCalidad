pipeline {
    agent any

    // Aquí le decimos a Jenkins que use el Node.js que configuramos en sus herramientas
    tools {
        nodejs 'node20' 
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                // Jenkins descarga automáticamente el código de GitHub aquí
                echo 'Código descargado correctamente.'
            }
        }
        
        stage('2. Build Frontend (React)') {
            steps {
                echo 'Iniciando compilación de React...'
                // Ejecuta los comandos reales en Windows usando 'bat'
                // Cambia 'frontend' por el nombre real de tu carpeta si es diferente
                bat 'cd frontend && npm install && npm run build'
            }
        }

        stage('3. Deploy (Instalar en Destino)') {
            steps {
                echo 'Desplegando archivos de producción al ambiente destino...'
                // Creamos la carpeta destino si no existe e instalamos los archivos reales del build
                bat 'if not exist C:\\Ambiente_Destino\\Orbis_Production mkdir C:\\Ambiente_Destino\\Orbis_Production'
                bat 'xcopy /E /I /Y "frontend\\build" "C:\\Ambiente_Destino\\Orbis_Production"'
            }
        }//build test 3
    }
    
    post {
        success {
            echo '¡Integración Continua Exitosa! El sistema ha sido actualizado automáticamente.'
        }
        failure {
            echo 'La compilación falló. Revisa el código subido por posibles errores de sintaxis.'
        }
    }
}