import { Device } from '@capacitor/device';

// Stores the device ID and info
export async function setDeviceInfo(store: any) {

    const [deviceInfo, deviceId] = await Promise.all([
        Device.getInfo(),
        Device.getId()
    ]);

    store.set('deviceId', deviceId);
    store.set('deviceInfo', deviceInfo);
}