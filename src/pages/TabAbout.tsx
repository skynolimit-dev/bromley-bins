
import { App } from '@capacitor/app';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import './TabAbout.css';

const TabAbout: React.FC = () => {

  const [versionInfo, setVersionInfo] = useState('');

  async function populateVersionInfo() {
    const appInfo = await App.getInfo();
    if (appInfo && appInfo.version) {
      setVersionInfo(appInfo.version);
    }
  }

  useEffect(() => {
    populateVersionInfo();
  }, [versionInfo]);


  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Bromley Bins
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <img src='/assets/images/recycle.png' alt='Rubbish bin' />
            <p className='ion-text-center'>Version: {versionInfo}</p>
            <p className='ion-text-center'>By Mike Wagstaff, <a href='https://skynolimit.dev/' target="_blank">Sky No Limit</a></p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Widget
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>A <a href='https://itunes.apple.com/us/app/scriptable/id1405459188?mt=12'>Scriptable</a> based home screen widget is available.</p>
            <IonButton className='ion-padding-top ion-padding-bottom' expand='block' href='https://github.com/mwagstaff/scriptable/tree/main/bromley-bins' target='_blank'>Download &amp; setup instructions</IonButton>
            <img className='widget-image' src='https://raw.githubusercontent.com/mwagstaff/scriptable/main/bromley-bins/screenshot.jpg' alt='Widget screenshot' />
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Acknowledgements & Notes
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ul>
              <li>This app is not affiliated or connected with Bromley Council, nor its contracted waste management services</li>
              <li>Bromley Council is not responsible for the accuracy of the data</li>
              <li>The data is provided for informational purposes only</li>
            </ul>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
}

export default TabAbout;
