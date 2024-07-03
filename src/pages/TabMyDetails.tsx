import { Clipboard } from '@capacitor/clipboard';
import { IonButton, IonButtons, IonCard, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToggle, IonToolbar, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { Storage } from '@ionic/storage';
import { copyOutline, shareOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import BinIdDetails from '../components/MyDetails/BinIdDetails';
import './TabMyDetails.css';
import _ from 'lodash';
import { getBinId, getBinInterests, getNotificationsEnabled, getNotificationTime, setBinId, setBinInterests, setNotificationsEnabled, setNotificationTime } from '../lib/store';


const TabMyDetails: React.FC = () => {

  const store = new Storage();

  const binId = getBinId();
  const binInterests = getBinInterests();
  const notificationsEnabled = getNotificationsEnabled();
  const notificationTime = getNotificationTime();

  async function init() {
    console.log('MyDetails init...'); 
    // await store.create();
    // Restore saved data
    // setBinInterests(await store.get('binInterests') || {});
    // setNotificationsEnabled(await store.get('notificationsEnabled') || false);
    // setNotificationTime(await store.get('notificationTime'));
  }

  // Gets the Bin ID from the clipboard text
  function getBinIdFromUrl(url: string) {
    try {
      if (url.includes('recyclingservices.bromley.gov.uk/waste/')) {
        return parseInt(url.split('/waste/')[1], 10);
      }
    } catch (error) {
      console.warn('Error getting Bin ID from URL:', error, url);
    }
  }

  function showNotificationsEnabledToggle(binId: number | undefined, setNotificationsEnabled: Function) {
    return (
      <IonToggle disabled={!binId} onIonChange={(e) => updateNotificationsEnabled(e.detail.checked)}>
        <IonLabel>Send me reminder notifications</IonLabel>
      </IonToggle>
    );
  }

  async function updateNotificationsEnabled(notificationsEnabled: any) {
    setNotificationsEnabled(notificationsEnabled);
    // await store.create();
    store.set('notificationsEnabled', notificationsEnabled);
  }

  function showTimePickerHelperText(notificationsEnabled: boolean) {
    if (notificationsEnabled) {
      return (
        <IonLabel>
          <p className='ion-padding-bottom'>Pick what time you would like your reminder notifications.</p>
          <p>You'll get them the day before your bins are due to be collected.</p>
        </IonLabel>
      );
    }
  }

  function showTimePicker(notificationsEnabled: boolean, binId: number | undefined, notificationTime: string | undefined, setNotificationTime: Function) {
    if (notificationsEnabled && binId && binId > 0) {
      return (
        <IonDatetime
          presentation='time'
          value={notificationTime}
          onIonChange={e => updateNotificationTime(e.detail.value)}
        >
          <span slot="title">Pick a time...</span>
        </IonDatetime>
      );
    }
  }

  async function updateNotificationTime(notificationTime: any) {
    setNotificationTime(notificationTime);
    // await store.create();
    store.set('notificationTime', notificationTime);
  }

  // Bin toggle
  function showBinToggle(category: string) {
    const isInterested = _.get(binInterests, category, true);
    return (
      <IonToggle checked={isInterested} onIonChange={(e) => toggleBinInterest(category, e.detail.checked)}>{category}</IonToggle>
    )
  }

  // Toggle interest in a bin
  async function toggleBinInterest(category: string, isInterested: boolean) {
    const binInterestsCopy = _.cloneDeep(binInterests);
    _.set(binInterestsCopy, category, isInterested);
    setBinInterests(binInterestsCopy);
    await store.create();
    store.set('binInterests', binInterestsCopy);
  }

  useEffect(() => {
    // console.log('TabMyDetails.tsx: useEffect()', binId);
    init();
  }, [binId, notificationTime]);

  return (

    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>My Bin Details</IonTitle>
          </IonToolbar>
        </IonHeader>

        <BinIdDetails />

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Bins I'm interested in</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                {showBinToggle('Food Waste')}
              </IonItem>
              <IonItem>
                {showBinToggle('Mixed Recycling (Cans, Plastics & Glass)')}
              </IonItem>
              <IonItem>
                {showBinToggle('Paper & Cardboard')}
              </IonItem>
              <IonItem>
                {showBinToggle('Non-Recyclable Refuse')}
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* <h2>Reminder notification</h2>
          <IonItem>
            {showNotificationsEnabledToggle(binId, setNotificationsEnabled)}
          </IonItem>
          <IonItem>
            {showTimePickerHelperText(notificationsEnabled)}
          </IonItem>
          <IonItem>
            {showTimePicker(notificationsEnabled, binId, notificationTime, setNotificationTime)}
          </IonItem> */}

      </IonContent>
    </IonPage>
  );
}
export default TabMyDetails;