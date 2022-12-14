import create from 'zustand';

interface SMSStore {
  sms: smsList[];
  setSMS: (sms: smsList[]) => void;
}

interface smsList {
  id: string;
  body: string;
  date: string;
  read: number;
  address: string;
  date_sent: string;
  service_center: string;
}

export const useSMSStore = create<SMSStore>(set => ({
  sms: [],
  setSMS: (smsObject: smsList[]) => {
    set({sms: smsObject});
  },
}));
