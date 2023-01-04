import Web3 from 'web3';

const AST_ILO_Token_Contract_ADDRESS =
  process.env.NEXT_PUBLIC_ASTROON_ILO_PROXY_CONTRACT_ADDRESS;
import AST_ILO_Token_Contract_ABI from '../../smart-contracts/contract-abi/astron_ILO_abi.json';

const AST_Token_Core_Contract_Address =
  process.env.NEXT_PUBLIC_AST_TOKEN_CORE_CONTRACT_ADDRESS;
import AST_Token_Core_Contract_ABI from '../../smart-contracts/contract-abi/astTokenCoreABI.json';

const AST_NFT_PRESALE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS;
import AST_NFT_PRESALE_CONTRACT_ABI from '../../smart-contracts/contract-abi/astroon_nft_preSale_abi.json';

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
      abi = AST_ILO_Token_Contract_ABI;
      contractAddress = AST_ILO_Token_Contract_ADDRESS;
      break;
    case 'NFT PRESALE CONTRACT':
      abi = AST_NFT_PRESALE_CONTRACT_ABI;
      contractAddress = AST_NFT_PRESALE_CONTRACT_ADDRESS;
      break;
    default:
      abi = AST_Token_Core_Contract_ABI;
      contractAddress = AST_Token_Core_Contract_Address;
  }

  const AstTokenContract = new web3.eth.Contract(abi, contractAddress);
  return AstTokenContract;
};
