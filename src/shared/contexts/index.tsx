import { createContext, useContext, useState, ReactNode } from 'react';

const MixerDetailsContext = createContext({});

export interface MixerTxnDetails {
    reciever_address: string;
    delay: number;
}

export interface MixerDetailsConsumer {
    MixerDetails: MixerTxnDetails;
    setMixerDetails: (details: MixerTxnDetails) => void;
}

export const useMixerDetails: ()=>MixerDetailsConsumer = () => {
  return useContext(MixerDetailsContext) as any;
};

export const MixerDetailsProvider = ({ children }: {children: ReactNode}) => {
  const [MixerDetails, setMixerDetails] = useState({
    reciever_address: '',
    delay: -1
  });

  return (
    <MixerDetailsContext.Provider value={{ MixerDetails, setMixerDetails } as {MixerDetails: MixerTxnDetails, setMixerDetails: (details: MixerTxnDetails) => void}}>
      {children}
    </MixerDetailsContext.Provider>
  );
};
