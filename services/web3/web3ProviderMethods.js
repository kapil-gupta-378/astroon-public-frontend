import Web3 from 'web3';
import ASTTokenContractABI from '../../smart-contracts/contract-abi/astTokenABI.json';
import ASTTokenCoreContractABI from '../../smart-contracts/contract-abi/astTokenCoreABI.json';
const ASTTokenContractAddress =
  process.env.NEXT_PUBLIC_AST_TOKEN_PROXY_CONTRACT_ADDRESS;
const ASTTokenCoreContractAddress =
  process.env.NEXT_PUBLIC_AST_TOKEN_CORE_CONTRACT_ADDRESS;
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

export const getContractInstance = async (tokenCoreContract = false) => {
  const { web3 } = await getWeb3Provider();
  const abi = tokenCoreContract ? ASTTokenCoreContractABI : ASTTokenContractABI;
  const contractAddress = tokenCoreContract
    ? ASTTokenCoreContractAddress
    : ASTTokenContractAddress;
  const AstTokenContract = new web3.eth.Contract(abi, contractAddress);
  return AstTokenContract;
};
