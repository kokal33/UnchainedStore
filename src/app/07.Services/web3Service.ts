import Web3 from 'web3';

export const getWeb3 = async () => {
  let web3: Web3;

  // modern dApp browsers
  if (window.ethereum) {
    const ethereum = window.ethereum as any;
    web3 = new Web3(ethereum);
  }
  }
