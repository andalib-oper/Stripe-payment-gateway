import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {number} from 'card-validator';

const CustomCardInput = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const formatCreditCardNumber = number => {
    // Remove any existing spaces or hyphens from the number
    const cleanedNumber = number.replace(/\D/g, '');
    setCardNumber(cleanedNumber);
    // Insert a space after every four characters
    const formattedNumber = cleanedNumber.replace(/(.{4})/g, '$1 ');
    setCardNumber(formattedNumber);

    return formattedNumber;
  };

  const validateCardNumber = () => {
    // Perform card number validation logic here
    // Return true if the card number is valid, false otherwise
    // You can use a library like 'card-validator' for validation
    const validation = number(cardNumber);
    console.log('validation', validation);

    if (validation.isPotentiallyValid && validation.card) {
      Alert.alert('Card is valid!', `Card type: ${validation.card.type}`);
    } else {
      Alert.alert('Card is invalid!', validation.isPotentiallyValid);
    }
  };

  const validateExpiryDate = () => {
    // Perform expiry date validation logic here
    // Return true if the expiry date is valid, false otherwise
  };

  const validateCVV = () => {
    // Perform CVV validation logic here
    // Return true if the CVV is valid, false otherwise
  };

  const handlePayment = () => {
    if (validateCardNumber() && validateExpiryDate() && validateCVV()) {
      // Perform payment logic here
      console.log('Payment successful');
    } else {
      console.log('Invalid card details');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        autoComplete={cardNumber.length >= 1616 ? 'off' : 'cc-number'}
        onChangeText={text => {
          setCardNumber(text), formatCreditCardNumber(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={text => setExpiryDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={text => setCVV(text)}
      />
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CustomCardInput;

