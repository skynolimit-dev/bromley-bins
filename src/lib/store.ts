import { create } from 'zustand';
import { Storage } from '@ionic/storage';

export const useStore = create((set) => ({
    dataRestoredFromStorage: false,
    setDataRestoredFromStorage: (restored: boolean) => set({ dataRestoredFromStorage: restored }),
    binId: undefined,
    setBinId: (id: any) => set({ binId: id }),
    binData: undefined,
    setBinData: (data: any) => set({ binData: data }),
    nextBins: undefined,
    setNextBins: (nextBins: any) => set({ nextBins: nextBins }),
    nextCollectionDate: undefined,
    setNextCollectionDate: (nextCollectionDate: any) => set({ nextCollectionDate: nextCollectionDate }),
    futureBins: undefined,
    setFutureBins: (futureBins: any) => set({ futureBins: futureBins }),
    binDataRefreshInProgress: false,
    setBinDataRefreshInProgress: (inProgress: boolean) => set({ binDataRefreshInProgress: inProgress }),
    lastUpdatedDate: new Date().getTime() - (60 * 60 * 1001),
    setLastUpdatedDate: (date: any) => set({ lastUpdatedDate: date }),
    binInterests: undefined,
    setBinInterests: (interests: any) => set({ binInterests: interests }),
    notificationsEnabled: false,
    setNotificationsEnabled: (enabled: boolean) => set({ notificationsEnabled: enabled }),
    notificationTime: undefined,
    setNotificationTime: (time: string) => set({ notificationTime: time }),
}))

export function getBinId() { return useStore((state: any) => state.binId); }
export function getBinData() { return useStore((state: any) => state.binData); }
export function getNextBins() { return useStore((state: any) => state.nextBins); }
export function getNextCollectionDate() { return useStore((state: any) => state.nextCollectionDate); }
export function getFutureBins() { return useStore((state: any) => state.futureBins); }
export function getBinDataRefreshInProgress() { return useStore((state: any) => state.binDataRefreshInProgress); }
export function getLastUpdatedDate() { return useStore((state: any) => state.lastUpdatedDate); }
export function getBinInterests() { return useStore((state: any) => state.binInterests); }
export function getNotificationsEnabled() { return useStore((state: any) => state.notificationsEnabled); }
export function getNotificationTime() { return useStore((state: any) => state.notificationTime); }

export function setBinId(binId: any) { useStore.setState({ binId: binId }); }
export function setBinData(binData: any) { useStore.setState({ binData: binData }); }
export function setNextBins(nextBins: any) { useStore.setState({ nextBins: nextBins }); }
export function setNextCollectionDate(nextCollectionDate: any) { useStore.setState({ nextCollectionDate: nextCollectionDate }); }
export function setFutureBins(futureBins: any) { useStore.setState({ futureBins: futureBins }); }
export function setBinDataRefreshInProgress(inProgress: boolean) { useStore.setState({ binDataRefreshInProgress: inProgress }); }
export function setLastUpdatedDate(date: any) { useStore.setState({ lastUpdatedDate: date }); }
export function setBinInterests(interests: any) { useStore.setState({ binInterests: interests }); }
export function setNotificationsEnabled(enabled: boolean) { useStore.setState({ notificationsEnabled: enabled }); }
export function setNotificationTime(time: string) { useStore.setState({ notificationTime: time }); }

// Restore saved data on first load
export async function initStore() {
    console.info('Initialising store...');
    if (!useStore((state: any) => state.dataRestoredFromStorage)) { 
        console.info('Restoring saved data...');
        useStore.setState({ dataRestoredFromStorage: true });
        // Restore saved data
        const store = new Storage();
        await store.create();
        setBinId(await store.get('binId'));
        setBinData(await store.get('binData'));
        setBinInterests(await store.get('binInterests') || {});
        setNotificationsEnabled(await store.get('notificationsEnabled') || false);
        setNotificationTime(await store.get('notificationTime'));
    }
}

