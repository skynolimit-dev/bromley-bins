import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from '@ionic/react';
import _ from 'lodash';
import moment from "moment";

interface ContainerProps {
    updateBinDetailsFromClipboard: Function;
}

const LocalhostTestInput: React.FC<ContainerProps> = ({ updateBinDetailsFromClipboard }) => {

    function updateBinDetails(binDetailsUrl: any) {
        // console.log('Updating bin details...');
        if (binDetailsUrl && binDetailsUrl.length > 0) {
            // console.log('Bin details URL:', binDetailsUrl);
            updateBinDetailsFromClipboard(binDetailsUrl);
        }
    }

    // If we are on the localhost, display a button to paste the bin ID into the clipboard
    if (window.location.hostname === 'localhost') {
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Localhost testing</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonInput onIonInput={(e) => updateBinDetails(e.target.value)} id='testInput' placeholder='Paste WasteWorks URL in here' />
                </IonCardContent>
            </IonCard>
        );
    }
}

export default LocalhostTestInput;