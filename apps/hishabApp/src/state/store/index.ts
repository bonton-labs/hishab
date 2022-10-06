import create from 'zustand';
import {useAuthStore} from './authStore';
import {useSMSStore} from './smsStore';

export const useStore = create(() => ({
  auth: useAuthStore,
  sms: useSMSStore,
}));
