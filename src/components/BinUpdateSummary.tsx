import { IonChip } from "@ionic/react";
import { useEffect, useState } from "react";
import moment from "moment";
import './BinUpdateSummary.css';

interface ContainerProps {
    binId: any;
    lastUpdatedDate: any;
}

const BinUpdateSummary: React.FC<ContainerProps> = ({ binId, lastUpdatedDate }) => {

    const binIdLink = `https://recyclingservices.bromley.gov.uk/waste/${binId}`;

    useEffect(() => {
        // console.log('BinUpdateSummary: useEffect()');
        // console.log('Last updated date update:', lastUpdatedDate, moment(lastUpdatedDate).toISOString()); 
    }, [binId, lastUpdatedDate]);

    if (binId && lastUpdatedDate) {
        return (
            <div className='ion-text-center bin-update-summary ion-margin-top'>
                <IonChip disabled={true}>
                    Last updated at {moment(lastUpdatedDate).format('HH:mm')}
                </IonChip>
            </div>
        );
    }
}

export default BinUpdateSummary;