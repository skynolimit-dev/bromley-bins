import { IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonList, IonItem, IonNote, IonIcon, IonButton } from '@ionic/react';
import { shareOutline, copyOutline, checkmarkCircle, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Clipboard } from '@capacitor/clipboard';
import { Storage } from '@ionic/storage';
import _ from 'lodash';
import { getBinId, setBinId } from '../../lib/store';
import LocalhostTestInput from './LocalhostTestInput';

const BinIdDetails: React.FC = () => {

    const binUrlPrefix = 'https://recyclingservices.bromley.gov.uk/waste/';
    // const [activeBinId, setActiveBinId] = useState<any>(binId);
    const binId = getBinId();
    const [activeBinUrl, setActiveBinUrl] = useState<string | undefined>(binId ? `${binUrlPrefix}${binId}` : undefined);
    const store = new Storage();

    function init() {
        // console.log('BinIdDetails init', binId);
        if (binId) {
            // setActiveBinId(binId);
            setActiveBinUrl(`${binUrlPrefix}${binId}`);
        }
    }

    // When the user switches back to the app, check for a copied bin ID
    document.addEventListener("resume", () => {
        // console.log('--- TabMyDetails: refocus ---');
        checkClipboardContents();
    }, false);

    // Checks to see if a Bromley "Your bin days" website address has been copied to the clipboard and if so,
    // extracts the Bin ID from the address
    async function checkClipboardContents() {
        // console.log('Checking for copied bin ID...');
        const { type, value } = await Clipboard.read();
        // console.log('Got clipboard text:', type, value);
        if (type === 'text/plain' && value.includes(binUrlPrefix)) {
            updateBinDetailsFromClipboard(value);
        }
    }

    function updateBinDetailsFromClipboard(clipboardText: string) {
        const binIdFromUrl = getBinIdFromUrl(clipboardText);
        updateBinId(binIdFromUrl);
        setActiveBinUrl(`${binUrlPrefix}${binIdFromUrl}`);
    }

    async function updateBinId(binIdFromUrl: any) {
        // console.log('Updating bin ID...');
        await store.create();
        await store.set('binId', binIdFromUrl);
        setBinId(binIdFromUrl);
        // console.log('Updated bin ID:', activeBinId);
        // console.log('Bin URL:', activeBinUrl);
    }

    // Gets the Bin ID from the clipboard text
    function getBinIdFromUrl(url: string) {
        try {
            return parseInt(url.split('/waste/')[1], 10);
        } catch (error) {
            console.warn('Error getting Bin ID from URL:', error, url);
        }
    }

    async function removeBinDetails() {
        // console.log('Deleting bin ID...');
        await store.create();
        await store.set('binId', undefined);
        const savedBinId = await store.get('binId');
        setBinId(undefined);
        setActiveBinUrl(undefined);
    }

    useEffect(() => {
        // console.log('BinDetails: useEffect', binId, activeBinUrl);
        init();
    }, [binId, activeBinUrl]);

    // if (false) {    // TODO: Remove!
    if (binId && binId >= 0 && activeBinUrl && activeBinUrl.length > 0) {
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Bin details</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonLabel>Your bin details are saved</IonLabel>
                            <IonNote slot="end">
                                <IonIcon className='ion-padding-left' icon={checkmarkCircle} color='success' size='large' />
                            </IonNote>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Your bin ID is: <a href={activeBinUrl} target='_blank'>{binId}</a></IonLabel>
                        </IonItem>
                    </IonList>
                    <IonButton className='ion-margin-top' onClick={removeBinDetails} color='danger' expand='block'>Clear my bin details and start again</IonButton>
                </IonCardContent>
            </IonCard>
        );
    }
    else {
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Your bin collection days</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p className='ion-padding-bottom'>The app needs to know the website address of your bin collection days.</p>
                    <IonList lines='full'>
                        <IonItem>
                            <IonNote slot="start">1</IonNote>
                            <IonLabel>Open the <a href={binUrlPrefix} target='_blank'>Bromley Bins website</a></IonLabel> 
                        </IonItem>
                        <IonItem>
                            <IonNote slot="start">2</IonNote>
                            <IonLabel>Enter your postcode, select your address, and wait for the "Your bin days" page to appear</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonNote slot="start">3</IonNote>
                            <IonLabel>Get the web page address by tapping the "Share" icon</IonLabel>
                            <IonIcon icon={shareOutline} slot="end" />
                        </IonItem>
                        <IonItem>
                            <IonNote slot="start">4</IonNote>
                            <IonLabel>Copy it to the clipboard by tapping the "Copy" option</IonLabel>
                            <IonIcon icon={copyOutline} slot="end" />
                        </IonItem>
                        <IonItem>
                            <IonNote slot="start">5</IonNote>
                            <IonLabel>Return to the app and tap the <strong>Allow Paste</strong> button to let it save the copied webpage address.</IonLabel>
                        </IonItem>
                    </IonList>
                    {/* Enable this when testing locally in a browser */}
                    {/* <LocalhostTestInput updateBinDetailsFromClipboard={updateBinDetailsFromClipboard} /> */}
                </IonCardContent>
            </IonCard>
        );
    }
}
export default BinIdDetails;
