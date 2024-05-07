import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";

const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: 42161,
      token: "ARB-ETH",
      label: "Arbitrum One",
      rpcUrl: "https://rpc.ankr.com/arbitrum",
    },
    {
      id: "0xa4ba",
      token: "ARB",
      label: "Arbitrum Nova",
      rpcUrl: "https://nova.arbitrum.io/rpc",
    },
    {
      id: "0x2105",
      token: "ETH",
      label: "Base",
      rpcUrl: "https://mainnet.base.org",
    },
    {
      id: "0xa4ec",
      token: "ETH",
      label: "Celo",
      rpcUrl: "https://1rpc.io/celo",
    },
    {
      id: 666666666,
      token: "DEGEN",
      label: "Degen",
      rpcUrl: "https://rpc.degen.tips",
    },
  ],
});

const wallets = await onboard.connectWallet();

console.log(wallets);

if (wallets[0]) {
  // create an ethers provider with the last connected wallet provider
  // if using ethers v6 this is:
  // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  const ethersProvider = new ethers.providers.Web3Provider(
    wallets[0].provider,
    "any"
  );

  const signer = ethersProvider.getSigner();

  // send a transaction with the ethers provider
  const txn = await signer.sendTransaction({
    to: "0x",
    value: 100000000000000,
  });

  const receipt = await txn.wait();
  console.log(receipt);
}

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      Wallet Example
    </main>
  );
}
