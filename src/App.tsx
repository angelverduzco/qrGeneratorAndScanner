import React, { useState } from 'react';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAlert,
  setupIonicReact
} from '@ionic/react';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { QRCodeCanvas } from 'qrcode.react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

const App: React.FC = () => {
  const [qrText, setQrText] = useState<string>('');
  const [scanResult, setScanResult] = useState<string>('');
  const [showGenerator, setShowGenerator] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkPermissions = async (): Promise<boolean> => {
    try {
      // Comprobar el estado de los permisos
      const { camera } = await BarcodeScanner.checkPermissions();

      if (camera === 'granted') {
        return true;
      } else if (camera === 'denied' || camera === 'prompt') {
        // Solicitar permisos
        const request = await BarcodeScanner.requestPermissions();
        return request.camera === 'granted';
      }

      return false;
    } catch (e) {
      console.error('Error al verificar permisos:', e);
      setErrorMessage('Error al verificar permisos de cámara');
      setShowAlert(true);
      return false;
    }
  };

  const scanQRCode = async (): Promise<void> => {
    try {
      const hasPermission = await checkPermissions();

      if (!hasPermission) {
        setErrorMessage('Se requieren permisos de cámara para escanear códigos QR');
        setShowAlert(true);
        return;
      }

      // Inicia el escaneo
      const { barcodes } = await BarcodeScanner.scan();

      if (barcodes.length > 0) {
        setScanResult(barcodes[0].rawValue || '');
      }
    } catch (e) {
      console.error('Error al escanear:', e);

      const error = e as Error;
      if (error.message === 'Camera permission was not granted') {
        setErrorMessage('El permiso de cámara no fue concedido');
      } else if (error.message === 'User cancelled the scan') {
        // Usuario canceló, no mostramos error
        return;
      } else {
        setErrorMessage(`Error al escanear: ${error.message}`);
      }

      setShowAlert(true);
    }
  };

  const openScanner = async (): Promise<void> => {
    setShowGenerator(false);
    await scanQRCode();
  };

  const openGenerator = (): void => {
    setShowGenerator(true);
  };

  const handleInputChange = (event: CustomEvent): void => {
    setQrText(event.detail.value || '');
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>QR Scanner & Generator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={openScanner}>Escanear QR</IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" onClick={openGenerator}>Generar QR</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

          {showGenerator && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Generador de Código QR</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel position="floating">Ingresa el texto para el QR</IonLabel>
                  <IonInput
                    value={qrText}
                    onIonChange={handleInputChange}
                    placeholder="Escribe aquí...">
                  </IonInput>
                </IonItem>

                {qrText && (
                  <div className="qr-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <QRCodeCanvas value={qrText} size={200} />
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          )}

          {scanResult && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Resultado del Escaneo</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{scanResult}</p>
              </IonCardContent>
            </IonCard>
          )}

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Error"}
            message={errorMessage}
            buttons={["OK"]}
          />
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;