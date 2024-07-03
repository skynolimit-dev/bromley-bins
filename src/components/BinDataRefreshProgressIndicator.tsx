import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import './BinDataRefreshProgressIndicator.css'

interface ContainerProps {
  binDataRefreshInProgress: boolean;
}

const BinDataRefreshProgressIndicator: React.FC<ContainerProps> = ({ binDataRefreshInProgress }) => {

  useEffect(() => {
    // console.log('BinDataRefreshProgressIndicator: useEffect()');
  }, [binDataRefreshInProgress]);

  if (binDataRefreshInProgress) {
    return (
      <IonItem lines="none" className='ion-margin ion-padding'>
        <IonLabel>Fetching your latest bin data...</IonLabel>
        <IonSpinner slot='end'></IonSpinner>
      </IonItem>
    );
  }
}

export default BinDataRefreshProgressIndicator;