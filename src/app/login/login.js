import React from "react";

import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { decode as atob, encode as btoa } from 'base-64';

global.atob = atob;
global.btoa = btoa;
const Web3 = require('web3');
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/CpNncfIhoQ4-ZN5i6Whi1zUMwCfb9X2j');

const LoginScreen = () => {
  const [toAddress, setToAddress] = React.useState('');
  const [value, setAmount] = React.useState('');
  const handleSendEth = async () => {
    const accounts = await web3.eth.getAccounts();
    const tx = {
      from: accounts,
      to: toAddress,
      value: web3.utils.toWei(value, 'ether'),
      gasPrice: web3.utils.toWei('10', 'gwei'),
    };
    await web3.eth.sendTransaction(tx);
    setStatus('Transaction sent!');
  };
  return (
    <View style={styles.mainCotainer}>
      <Text style={styles.mainHeader}>Crypto Express</Text>
      <Text style={styles.description}>abc</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Input Amount</Text>
        <TextInput style={styles.inputStyle}
          onChange={(e) => { setAmount(e) }}
          autoCapitalize="none"
          autoCorrect={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>To Address</Text>
        <TextInput style={styles.inputStyle}
          autoCapitalize="none"
          onChange={(e) => { setToAddress(e) }}
          autoCorrect={false} />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => { handleSendEth() }}>
        <Text>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCotainer: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  mainHeader: {
    fontSize: 25,
    color: "#344055",
    fontWeight: "500",
  },
  description: {
    fontSize: 20,
    color: "#7d7d7d",
    paddingBottom: 20,
    lineHeight: 25,
    fontFamily: "regular",
  },
  inputContainer: {
    marginTop: 20,
  },
  labels: {
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    fontFamily: "regular",
  },
  inputStyle: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 1,
    fontFamily: "regular",
    fontSize: 18,
    color: "black",
  },
  multilineInput: {

  },
  buttonStyle: {
    backgroundColor: "#344055",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 180,
    alignItems: "center",
    justifyContent: "center",
  }
});
export default LoginScreen;