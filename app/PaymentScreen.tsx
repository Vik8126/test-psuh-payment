// PaymentScreen.js
import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch('http://192.168.29.161:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // means $10
      }),
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const initializePaymentSheet = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    console.log("clientSecret", clientSecret);
    

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Test InstaFood",
    });

    if (!error) {
      setPaymentSheetEnabled(true);
    } else {
      Alert.alert("Error initializing payment sheet", error.message);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Payment failed: ${error.message}`);
    } else {
      Alert.alert('Success', 'Your payment is confirmed!');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Initialize Payment" onPress={initializePaymentSheet} />
      <View style={{ marginTop: 20 }} />
      <Button
        title="Open Payment Sheet"
        onPress={openPaymentSheet}
        disabled={!paymentSheetEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
