import { IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';
import _ from 'lodash';

interface ContainerProps {
    binId: any;
}

const Welcome: React.FC<ContainerProps> = ({ binId }) => {
    if (!binId) {
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className='ion-text-center'>
                        Welcome!
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <img src='/assets/images/recycle.png' alt='Rubbish bin' />
                    <p className='ion-text-center ion-padding'>Let's get your bin collection days to get started...</p>
                    <IonButton expand='block' onClick={() => location.href = '/tabMyDetails'}>Start</IonButton>
                </IonCardContent>
            </IonCard>
        );
    }
}


export default Welcome;