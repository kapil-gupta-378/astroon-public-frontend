import Web3 from 'web3';

const AST_ILO_Token_Contract_ADDRESS =
  process.env.NEXT_PUBLIC_ASTROON_ILO_PROXY_CONTRACT_ADDRESS;
import AST_ILO_Token_Contract_ABI_MAINNET from '../../smart-contracts/abis-mainnet/astron_ILO_abi.json';
import AST_ILO_Token_Contract_ABI_TESTNET from '../../smart-contracts/abis-testnet/astron_ILO_abi.json';

const AST_Token_Core_Contract_Address =
  process.env.NEXT_PUBLIC_AST_TOKEN_CORE_CONTRACT_ADDRESS;
import AST_Token_Core_Contract_ABI_MAINNET from '../../smart-contracts/abis-mainnet/astTokenCoreABI.json';
process.env.NEXT_PUBLIC_AST_TOKEN_CORE_CONTRACT_ADDRESS;
import AST_Token_Core_Contract_ABI_TESTNET from '../../smart-contracts/abis-testnet/astTokenCoreABI.json';

const AST_NFT_PRESALE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS;
// ABI
import AST_NFT_PRESALE_CONTRACT_ABI_MAINNET from '../../smart-contracts/abis-mainnet/astroon_nft_preSale_abi.json';
import AST_NFT_PRESALE_CONTRACT_ABI_TESTNET from '../../smart-contracts/abis-testnet/astroon_nft_preSale_abi.json';

const AST_NFT_PRESALE_REWARD_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_AST_NFT_PRESALE_REWARD_PROXY_CONTRACT_ADDRESS;
import AST_NFT_PRESALE_REWARD_CONTRACT_ABI_MAINNET from '../../smart-contracts/abis-mainnet/astroon_NFT_reward.json';
import AST_NFT_PRESALE_REWARD_CONTRACT_ABI_TESTNET from '../../smart-contracts/abis-mainnet/astroon_NFT_reward.json';

const NETWORK_TYPE = process.env.NEXT_PUBLIC_NETWORK_TYPE;

export const getWeb3Provider = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        resolve({ web3 });
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      try {
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

export const getContractInstance = async (contractName) => {
  const { web3 } = await getWeb3Provider();
  let abi;
  let contractAddress;

  switch (contractName) {
    case 'ILO CONTRACT':
      abi =
        NETWORK_TYPE === 'mainnet'
          ? AST_ILO_Token_Contract_ABI_MAINNET
          : AST_ILO_Token_Contract_ABI_TESTNET;
      contractAddress = AST_ILO_Token_Contract_ADDRESS;
      break;
    case 'NFT PRESALE CONTRACT':
      abi =
        NETWORK_TYPE === 'mainnet'
          ? AST_NFT_PRESALE_CONTRACT_ABI_MAINNET
          : AST_NFT_PRESALE_CONTRACT_ABI_TESTNET;
      contractAddress = AST_NFT_PRESALE_CONTRACT_ADDRESS;
      break;
    case 'NFT REWARD CONTRACT':
      abi =
        NETWORK_TYPE === 'mainnet'
          ? AST_NFT_PRESALE_REWARD_CONTRACT_ABI_MAINNET
          : AST_NFT_PRESALE_REWARD_CONTRACT_ABI_TESTNET;
      contractAddress = AST_NFT_PRESALE_REWARD_CONTRACT_ADDRESS;
      break;
    default:
      abi =
        NETWORK_TYPE === 'mainnet'
          ? AST_Token_Core_Contract_ABI_MAINNET
          : AST_Token_Core_Contract_ABI_TESTNET;
      contractAddress = AST_Token_Core_Contract_Address;
  }
  const AstTokenContract = new web3.eth.Contract(abi, contractAddress);
  return AstTokenContract;
};
