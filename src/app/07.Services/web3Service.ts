import Web3 from 'web3';
export function getWeb3(): Web3 {

    const ethereum = window.ethereum as any;
    return new Web3(ethereum);
  }
