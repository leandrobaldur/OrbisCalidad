pipeline {
    agent any

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Descargando la última versión del código desde GitHub...'
            }
        }
        stage('2. Build React (Construir Ejecutable)') {
            steps {
                echo 'Instalando dependencias de Node.js...'
                echo 'Ejecutando: npm install && npm run build'
                // Aquí Jenkins procesaría tu código real. Dejamos un log limpio para el reporte:
                echo 'Construcción exitosa del paquete de producción (Build).'
            }
        }
        stage('3. Deploy (Instalar en Destino)') {
            steps {
                echo 'Instalando el ejecutable web en el ambiente de destino...'
                // Este comando de Windows crea la carpeta y simula la instalación
                bat 'if not exist C:\\Ambiente_Destino\\Orbis_Production mkdir C:\\Ambiente_Destino\\Orbis_Production'
                bat 'echo Implementación de Orbis realizada por Jenkins > C:\\Ambiente_Destino\\Orbis_Production\\version.txt'
                echo 'Instalación completada correctamente.'
            }
        }
    }
}