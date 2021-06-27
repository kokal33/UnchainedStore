import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  prepareSignBinance,
  prepareSignMetamask,
} from '../04.Helpers/providerHelper';

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface EthereumProvider {
  on(arg0: string, arg1: (accounts: any) => any): any;
  isMetaMask?: boolean;
  enable(): any;
  request(requestArguments: RequestArguments): any;
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
export interface EnabledProviders {
  metaMaskEnabled: boolean;
  binanceEnabled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private messageService: MessageService) {}

  async connectWallet(wallet: string) {
    try {
      // Set provider from user input
      let provider = undefined;
      if (wallet === 'binance') {
        provider = window.BinanceChain;
        const chainId = parseInt(provider.chainId, 16);
        if (this.isMaticChain(chainId)) return undefined;
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        });
        const signature = await this.walletSignBinance(provider, accounts[0]);
        const publicAddress = accounts[0];
        return { publicAddress, signature };
      }
      if (wallet === 'metamask') {
        provider = window.ethereum;
        const chainId = parseInt(provider.chainId, 16);
        if (!this.isMaticChain(chainId)) return undefined;
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        });
        const signature = await this.walletSignMetamask(provider, accounts[0]);
        const publicAddress = accounts[0];
        return { publicAddress, signature };
      } else {
        return undefined;
      }
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    }
    return null;
  }

  async walletSignMetamask(provider: any, account: any) {
    const signData = prepareSignMetamask();
    const signRequest: RequestArguments = {
      method: 'personal_sign',
      params: [account, signData],
    };
    const signedMessage = await provider.request(signRequest);
    console.log('SIGNED: ', signedMessage);
    return signedMessage;
  }
  async walletSignBinance(provider: any, account: any) {
    const signData = prepareSignBinance();
    const signRequest: RequestArguments = {
      method: 'eth_sign',
      params: [account, signData],
    };
    const signedMessage = await provider.request(signRequest);
    console.log('SIGNED: ', signedMessage);
    return signedMessage;
  }

  private isMaticChain(chainId: number): boolean {
    if (chainId !== 80001) {  //TESTNET
//    if (chainId !== 137) {  //MAINNET
      this.messageService.add({
        key: 'global',
        severity: 'error',
        summary: 'Wrong chain',
        detail: 'Please connect to the Matic Chain',
        life: 5000,
      });
      return false;
    }
    return true;
  }
}
