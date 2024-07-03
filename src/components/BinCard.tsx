import { IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonList, IonItem, IonNote } from '@ionic/react';
import _ from 'lodash';
import moment from "moment";
import './BinCard.css';

interface ContainerProps {
    bin: any;
    nextCollection: boolean;
}

function showCollectionInProgress(collectionInProgress: boolean) {
    if (collectionInProgress) {
        return (
            <div className='ion-text-center'>
                <IonNote className='ion-text-center'>Collection in progress</IonNote>
            </div>
        )
    }
}

const BinCard: React.FC<ContainerProps> = ({ bin, nextCollection }) => {

    if (bin && bin.isInterested) {
        if (nextCollection) {
            return (
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle className='ion-text-center'>{bin.category}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div>
                            <IonImg src={`/assets/images/bins/${bin.category}.png`} className='bin-card-image' />
                        </div>
                        {showCollectionInProgress(bin.collectionInProgress)}
                    </IonCardContent>

                </IonCard>
            );
        }
        else {
            return (
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle className='ion-text-center'>{bin.category}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className='ion-text-center'>
                        <IonNote>{moment(bin.nextCollectionUtc).format('dddd, MMMM Do')} ({moment(bin.nextCollectionUtc).toNow(true)})</IonNote>
                    </IonCardContent>
                </IonCard>
            );
        }
    }
}

export default BinCard;