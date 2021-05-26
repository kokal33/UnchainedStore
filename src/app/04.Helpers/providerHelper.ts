import { EnabledProviders } from "../07.Services/provider.service";

export function prepareSignDataV3(chainId: number) {

  return JSON.stringify(
    {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" }
        ],
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" }
        ],
        Unchained: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" }
        ]
      },
      primaryType: "Unchained",
      domain: { name: "Unchained Music", version: "1", chainId: chainId, verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC" },
      message: {
        from: { name: "Unchained Music", wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826" },
        to: { name: "Guest", wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" },
        contents: "Hello, Guest! Please sign this message in order to login "
      }
    })
}

export function prepareSignBinance() {
  return "Hello, Guest! Please sign this message in order to login"
}

export function prepareSignMetamask() {
  return "Hello, Guest! Please sign this message in order to login"
}

// Currently this supports only MetaMask or BinanceChain
export function getWalletProviders() {
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
