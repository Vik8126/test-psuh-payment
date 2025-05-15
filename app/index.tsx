import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import registerForPushNotificationsAsync from './notifactionService';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';
import ApiTestScreen from './ApiTestScreen';

export default function Index() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        console.log('Push Token:', token);
      } else {
        console.log('Failed to get push token'); 
      }
    });
  }, []);

  return (
    <StripeProvider
      publishableKey="pk_live_51QpLPGFmw7s8Wy8f7Ns0Ay8kzChXD7Ohsm2FJCofRYoWA2xtxO0hOgdhnCLP9GwXFjsJcJYFjc9RwJmuIx7gInuK00eCgRcwSS"
    >
      <PaymentScreen />
    </StripeProvider>
    // <View>
    // <ApiTestScreen/>
    // </View>
  );
}