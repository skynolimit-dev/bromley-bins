import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import BinDataRefreshProgressIndicator from '../components/BinDataRefreshProgressIndicator';
import BinDetails from '../components/BinDetails';
import BinUpdateSummary from '../components/BinUpdateSummary';
import Welcome from '../components/Welcome';
import './TabHome.css';
import { getBinId, getBinData, getBinDataRefreshInProgress, getBinInterests, getLastUpdatedDate, setBinId, setBinData, setBinDataRefreshInProgress, setLastUpdatedDate } from '../lib/store'; 

axios.defaults.timeout = 60000;

let binRefreshTimeout: any;

const TabHome: React.FC = () => {

  const binId = getBinId();
  const binData = getBinData();
  const binDataRefreshInProgress = getBinDataRefreshInProgress();
  const binInterests = getBinInterests();
  const lastUpdatedDate = getLastUpdatedDate();

  const store = new Storage();

  

  // Gets the BIN ID from the store
  async function init() {
    // console.log('Home: init()');
    let forceRefresh = false;
    await store.create();
    // await store.set('binId', 3642936); // TODO: Remove this - for testing only
    const savedBinId = await store.get('binId'); // TODO: Reinstate this
    if (savedBinId && savedBinId !== binId) {
      // console.log('Setting bin ID to saved ID in order to force refresh:', savedBinId);
      setBinId(savedBinId);
      forceRefresh = true;
    }
    
    if (binId && binId >= 0)
      refreshBinData(forceRefresh);
  }

  // Refresh the bin data from the server when necessary
  async function refreshBinData(forceRefresh = false) {

    // TODO: Move to config
    const fetchInterval = 60 * 60 * 1000;

    // If we don't have any bin data, try using the cached data
    // if (!binData) {
    //   await store.create();
    //   const cachedBinData = await store.get('binData');
    //   setBinData(cachedBinData);
    // }

    // Only fetch from the server if one of the following is true...
    // 1. The previous bin ID is different to the current bin ID
    // 2. The data is older than 1 hour
    // 3. The last fetch was more than 1 second ago (to avoid multiple requests)
    if ((forceRefresh || lastUpdatedDate + fetchInterval < new Date().getTime())) {
      const url = `https://waste-collection.fly.dev/api/v1/bin/${binId}`;
      console.info('Fetching bin data from:', url);
      setBinDataRefreshInProgress(true);
      const response = await axios.get(url);
      setBinDataRefreshInProgress(false);

      if (response.status === 200 || response.status === 304) {
        setBinData(response.data);
        await store.set('binData', response.data);
        setLastUpdatedDate(new Date().getTime());
      }
      else {
        console.warn('Error fetching bin data:', response.status);
      }
    }

    // Refresh every 10 seconds
    if (binRefreshTimeout)
      clearTimeout(binRefreshTimeout);
    binRefreshTimeout = setTimeout(refreshBinData, 10 * 1000);

  }

  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      refreshBinData(true);
      event.detail.complete();
    }, 2000);
  }

  useEffect(() => {
    init();
    // console.log('TabHome.tsx: useEffect()', binId);
}, [binId, binData, binInterests, binDataRefreshInProgress, lastUpdatedDate]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bromley Bins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <BinDataRefreshProgressIndicator binDataRefreshInProgress={binDataRefreshInProgress} />
        <Welcome binId={binId} />
        <BinDetails />
        <BinUpdateSummary binId={binId} lastUpdatedDate={lastUpdatedDate} />
      </IonContent>
    </IonPage>
  );
};

export default TabHome;
