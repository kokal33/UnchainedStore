import Web3 from 'web3';
import Biconomy from '@biconomy/mexa';

export function getWeb3() {
  const apiKey = '8UJW18alH.6d6126e2-2fcb-4689-8354-194057a047aa';
  const biconomy = new Biconomy(window.ethereum,{apiKey});
  return new Web3(biconomy);
  }

export function getBiconomy() {
  const apiKey = '8UJW18alH.6d6126e2-2fcb-4689-8354-194057a047aa';
  return new Biconomy(window.ethereum,{apiKey});
};


// OLD VERSION OF WEB3
// export const getWeb3 = async () => {
//   let web3: Web3;

//   // modern dApp browsers
//   if (window.ethereum) {
//     const ethereum = window.ethereum as any;
//     web3 = new Web3(ethereum);
//   }
//   }
