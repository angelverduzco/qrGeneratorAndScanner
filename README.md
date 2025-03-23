# QR Generator

Este proyecto genera y escanea códigos QR. Está desarrollado utilizando **Ionic** y **React**.

A continuación, se detallan los pasos para instalar, configurar y ejecutar el proyecto.

## Requisitos previos

- Node.js y npm instalados.
- Android Studio instalado.
- Capacitor CLI instalado globalmente (`npm install -g @capacitor/cli`).

## Instalación de dependencias

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd qrGenerator
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Configuración de Capacitor

1. Inicializa Capacitor en el proyecto (si no está configurado):
   ```bash
   npx cap init
   ```
   - Nombre del proyecto: `QR Generator`
   - Identificador del paquete: `com.example.qrgenerator` (puedes personalizarlo).

2. Añade la plataforma Android:
   ```bash
   npx cap add android
   ```

3. Sincroniza los cambios con Capacitor:
   ```bash
   npx cap sync
   ```

## Ejecución en Android Studio

1. Abre el proyecto en Android Studio:
   ```bash
   npx cap open android
   ```

2. Una vez abierto en Android Studio:
   - Asegúrate de que las dependencias de Gradle se descarguen correctamente.
   - Conecta un dispositivo Android (no es recomendable usar emulador pues estos no cuentan con una camara para escanear los códigos QR)

3. Ejecuta la aplicación desde Android Studio:
   - Haz clic en el botón "Run" o usa el atajo `Shift + F10`.

## Notas adicionales

- Si realizas cambios en el código fuente, recuerda sincronizar nuevamente con Capacitor:
  ```bash
  npx cap copy
  npx cap sync
  ```

- Para depuración, utiliza las herramientas de desarrollo de Android Studio.

## Tecnologías utilizadas

- **Ionic Framework**: Para la interfaz de usuario y la estructura del proyecto.
- **React**: Para el desarrollo de componentes y lógica de la aplicación.
- **Capacitor**: Para la integración con plataformas nativas como Android.

