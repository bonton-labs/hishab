import create from 'zustand';
import {useAuthStore} from './authStore';
import {useSMSStore} from './smsStore';

interface Store {
  auth: ReturnType<typeof useAuthStore>;
  sms: ReturnType<typeof useSMSStore>;
}

export const useStore = create<Store>(() => ({
  auth: useAuthStore,
  sms: useSMSStore,
}));
