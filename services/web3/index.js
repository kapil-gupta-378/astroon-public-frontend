import Web3 from 'web3';
export const getWeb3Provider = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        resolve({ web3 });
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      try {
        await window.web3.request({ method: 'eth_requestAccounts' });
        const web3 = window.web3;
        resolve({ web3 });
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        const provider = new Web3.providers.HttpProvider(
          process.env.NEXT_PUBLIC_INFURA_PROVIDER_URL,
        );
        const web3 = new Web3(provider);
        resolve({ web3 });
      } catch (error) {
        reject(error);
      }
    }
  });
};
