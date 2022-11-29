import { convertWeiToEther } from './currencyMethods';
import { getContractInstance, getWeb3Provider } from './web3ProviderMethods';

export const getWalletAstTokenBalance = async (wallet_address) => {
  const AstTokenContract = await getContractInstance(true);
  const response = await AstTokenContract.methods
    .balanceOf(wallet_address)
    .call();
  const balanceInEth = convertWeiToEther(response);
  return balanceInEth;
};

export const connectWallet = async (envNetworkId, envNetworkIdInHex) => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    const { web3 } = await getWeb3Provider();
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const networkId = await web3.eth.net.getId();
    if (envNetworkId !== networkId) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: envNetworkIdInHex }],
      });
    }
    return { walletAddress: accounts[0], netwrokID: networkId };
  } else {
    window.location.href =
      process.env.NEXT_PUBLIC_METAMASK_DOWNLOAD_LINK_FOR_MOBILE;
    throw new Error('Wallet app not found');
  }
};
