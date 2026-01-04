import { Platform, ToastAndroid } from 'react-native';

export const showToast = (message, duration = ToastAndroid.SHORT) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, duration);
  }
};