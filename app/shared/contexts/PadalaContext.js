import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {useAuthContext} from './AuthContext';
import axios from 'axios';

export const PadalaContext = createContext();

const PadalaProvider = ({children}) => {
  const {loggedUser} = useAuthContext();

  //   States
  const [padalas, setPadalas] = useState([]);
  // End States

  //   Functions
  const createPadalaOrder = data => {
    return new Promise((resolve, reject) => {
      let trackingNumber = Math.floor(Math.random() * 100000000);
      axios
        .post('http://192.168.1.11:8000/api/createPadala', {
          trackingNumber: trackingNumber,
          shipmentData: data.shipmentData,
          recipientData: data.recipientData,
          deliveryFee: data.deliveryFee,
          status: 'for-pickup',
          paymentMethod: 'COD',
          paymentStatus: 'unpaid',
          customerId: data.customerId,
        })
        .then(res => {
          resolve(res.data.padala);
        })
        .catch(err => {
          console.log(err);
          console.log(err.response);
          console.log('err is: ', err.response.data);
          reject(err);
        });
    });
  };

  const cancelPadala = data => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://192.168.1.11:8000/api/changePadalaStatus', {
          id: data.id,
          status: 'cancelled',
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log('err is: ', err.response.data);
          reject(err);
        });
    });
  };

  const fetchPadalas = async () => {
    try {
      let {data} = await axios.post(
        'http://192.168.1.11:8000/api/fetchCustomerPadalas',
        {
          customerId: loggedUser?.id,
        },
      );

      setPadalas(data.padalas);
    } catch (err) {
      console.log(err);
    }
  };

  //   End Functions

  // Effects

  useEffect(() => {
    if (loggedUser?.id) {
      fetchPadalas();
    }
  }, [loggedUser?.id]);

  // End Effects

  const payload = {
    createPadalaOrder,
    cancelPadala,
    padalas,
  };

  return (
    <PadalaContext.Provider value={useMemo(() => payload, [padalas])}>
      {children}
    </PadalaContext.Provider>
  );
};

export default React.memo(PadalaProvider);
export const usePadalaContext = () => useContext(PadalaContext);
