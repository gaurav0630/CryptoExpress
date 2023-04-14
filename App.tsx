import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import Web3 from 'web3';

const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/CpNncfIhoQ4-ZN5i6Whi1zUMwCfb9X2j');

export default function App() {
  const [trnx, setTrnx] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [status, setStatus] = useState('');

  const sendTransaction = async () => {
    const gasPrice = '20000000000'; // Set gas price directly
    const tx = {
      from: '0x554015cBe7584E021C7fb2f649ad26846469822b',
      to: toAddress,
      value: web3.utils.toWei(trnx, 'ether'),
      gasPrice: gasPrice,
    };
    web3.eth.sendTransaction(tx, (error, hash) => {
      if (error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus(`Transaction sent: ${hash}`);
        web3.eth.getTransactionReceipt(hash, (error, receipt) => {
          if (error) {
            setStatus(`Error: ${error.message}`);
          } else {
            setStatus(`Transaction status: ${receipt.status}`);
          }
        });
      }
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Transaction value"
        value={trnx}
        onChangeText={setTrnx}
      />
      <TextInput
        placeholder="To address"
        value={toAddress}
        onChangeText={setToAddress}
      />
      <Button title="Submit" onPress={sendTransaction} />
      <Text>{status}</Text>
    </View>
  );
}
