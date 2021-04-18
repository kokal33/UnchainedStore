import { prepareSignBinance, prepareSignDataV3, prepareSignMetamask } from "../helpers/providerHelper";

export {getWalletProviders,connectWallet};

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface EthereumProvider {
  isMetaMask?: boolean;
  enable(): any;
  request(requestArguments: RequestArguments):any;
  chainId: string;
}
// We use this because both providers have same protocol of execution, for now we dont need separate class
// interface BinanceProvider {
//   isBinance?: boolean;
//   enable(): any;
//   request(requestArguments: RequestArguments):any;
//   chainId: string;
// }

declare global {
  interface Window {
    ethereum: EthereumProvider;
    BinanceChain: EthereumProvider;
  }
}
export interface EnabledProviders{
  metaMaskEnabled: boolean;
  binanceEnabled: boolean;
}

// Currently this supports only MetaMask or BinanceChain
function getWalletProviders() {
  let metamask = false;
  let binance = false;
  if (window.ethereum && window.ethereum.isMetaMask){ metamask = true; }
  if (window.BinanceChain){ binance = true; }
  const enabledProviders: EnabledProviders = {
    metaMaskEnabled: metamask,
    binanceEnabled: binance
  }
  return enabledProviders;
}


async function connectWallet(wallet: string) {
  try{
    // Set provider from user input
    let provider = undefined;
      if (wallet ==='binance'){
        provider = window.BinanceChain;
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const signedMessage = await walletSignBinance(provider,accounts[0]);
        return {accounts,signedMessage};
      }
      if (wallet ==='metamask'){
        provider = window.ethereum;
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const signedMessage = await walletSignMetamask(provider,accounts[0]);
        return {accounts,signedMessage};
      }
  }
  catch (err){
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log('Please connect to MetaMask.');
    } else {
      console.error(err);
    }
  };
  return null;
}

async function walletSignMetamask(provider:any, account:any){
  const chainId = parseInt(provider.chainId, 16);
      const signData = prepareSignMetamask();
      const signRequest: RequestArguments = {
        method: "personal_sign",
        params: [account, signData]
      }
      const signedMessage = await provider.request(signRequest);
      console.log("SIGNED: ", signedMessage);
      return signedMessage;
}
async function walletSignBinance(provider:any, account:any){
  const signData = prepareSignBinance();
  const signRequest: RequestArguments = {
    method: "eth_sign",
    params: [account, signData]
  }
  const signedMessage = await provider.request(signRequest);
  console.log("SIGNED: ", signedMessage);
  return signedMessage;
}


