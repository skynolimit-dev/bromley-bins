import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar, IonDatetime } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';

import './SetupForm.css';

interface ContainerProps {
  binId: number | undefined;
  updateInfo: Function;
}

function inputBinId(binId: number | undefined, setBinIdEntered: Function) {
  return (
    <IonInput
      id='inputBinId'
      value={binId}
      type="number"
      fill="solid"
      label="Tap here to enter your Bin ID"
      labelPlacement="floating"
      onIonInput={e => setBinIdEntered(e.detail.value)}
    ></IonInput>
  );
}

function showHelperText(setIsHelperModalOpen: Function) {
  return (
    <p className="helperText"><a onClick={() => setIsHelperModalOpen(true)}>How do I find my bin ID?</a></p>
  );
}

function showHelperModal(isHelperModalOpen: boolean, setIsHelperModalOpen: Function) {
  return (
    <IonModal isOpen={isHelperModalOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>How to find your bin ID</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsHelperModalOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>How to find your Bin ID</h1>
        <IonList>
          <IonItem>
            <IonLabel>1. Go to the <a href='https://recyclingservices.bromley.gov.uk/waste' target='_blank' rel='noreferrer'>Bromley Council Recycling Services</a> website.</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>2. Enter your postcode, and select your address.</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>3. Wait for the <strong>Your bin days</strong> page to load.</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>4. Grab the website resulting address (it should look something like <a href='https://recyclingservices.bromley.gov.uk/waste/3642920' target='_blank'>https://recyclingservices.bromley.gov.uk/waste/3642920</a>). Your bin ID is the number at the end (e.g. <strong>3642920</strong>).</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>5. Enter the number in the app, and you're all set.</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  )
}

function reminderYesNoHelperText() {
  return (
    <IonLabel>Would you like to receive a reminder notification?</IonLabel>
  );
}

function reminderYesNoButtons(binIdEntered: number | undefined, setNotificationsEnabled: Function) {
  return (
    <IonButtons>
      <IonButton disabled={!binIdEntered} expand='block' onClick={() => setNotificationsEnabled(true)}>Yes please</IonButton>
      <IonButton disabled={!binIdEntered} expand='block' onClick={() => setNotificationsEnabled(false)}>No thanks</IonButton>
    </IonButtons>
  );
}

function showTimePickerHelperText(notificationsEnabled: boolean) {
  if (notificationsEnabled) {
    return (
      <IonLabel>Choose when you would like a reminder notification. It will come out the day before your bins are due to be collected.</IonLabel>
    );
  }
}

function showTimePicker(notificationsEnabled: boolean, binIdEntered: number | undefined, notificationTimeEntered: string | undefined, setNotificationTimeEntered: Function) {
  if (notificationsEnabled && binIdEntered && binIdEntered > 0) {
    return (
      <IonDatetime
        presentation='time'
        value={notificationTimeEntered}
        onIonChange={e => setNotificationTimeEntered(e.detail.value!)}
      >
        <span slot="title">Pick a time...</span>
      </IonDatetime>
    );
  }
}

function submitButton(binIdEntered: number | undefined, notificationsEnabled: boolean, notificationTimeEntered: string | undefined, updateInfo: Function) {
  return (
    <IonButton
      disabled={!(binIdEntered && binIdEntered > 0 && ((notificationsEnabled && notificationTimeEntered && notificationTimeEntered.length > 0)) || !notificationsEnabled)}
      expand='block'
      size='large'
      onClick={() => updateInfo(binIdEntered, notificationsEnabled, notificationTimeEntered?.split('T')[1])}
    >Save my details</IonButton>
  );
}



const SetupForm: React.FC<ContainerProps> = ({ binId, updateInfo }) => {

  const [binIdEntered, setBinIdEntered] = useState<number | undefined>(binId);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [notificationTimeEntered, setNotificationTimeEntered] = useState<string | undefined>(undefined);
  const [isHelperModalOpen, setIsHelperModalOpen] = useState(false);

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    // console.log('SetupForm.tsx: useEffect()');
  }, [binIdEntered, notificationTimeEntered]);

  return (
    <IonContent>
      <IonList inset={true} lines='none'>
        <h2>Bin ID</h2>
        <IonItem>
          {inputBinId(binIdEntered, setBinIdEntered)}
        </IonItem>
        <IonItem>
          {showHelperText(setIsHelperModalOpen)}
        </IonItem>
        <IonItem>
          {showHelperModal(isHelperModalOpen, setIsHelperModalOpen)}
        </IonItem>
        <h2>Reminder notification</h2>
        <IonItem>
          {reminderYesNoHelperText()}
        </IonItem>
        <IonItem>
          {reminderYesNoButtons(binIdEntered, setNotificationsEnabled)}
        </IonItem>
        <IonItem>
          {showTimePickerHelperText(notificationsEnabled)}
        </IonItem>
        <IonItem>
          {showTimePicker(notificationsEnabled, binIdEntered, notificationTimeEntered, setNotificationTimeEntered)}
        </IonItem>
        <IonItem className='ion-margin-top'>
          {submitButton(binIdEntered, notificationsEnabled, notificationTimeEntered, updateInfo)}
        </IonItem>
      </IonList>
    </IonContent>
  );
}
export default SetupForm;