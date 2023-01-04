import { getContractInstance } from './web3ProviderMethods';

export const getNftPreSaleData = async () => {
  const AstTokenContract = await getContractInstance('NFT PRESALE CONTRACT');
  const saleData = await AstTokenContract.methods.SaleInfoMap(0).call();
  return saleData;
};

export const isNftPreSaleIsActive = async (value) => {
  const AstTokenContract = await getContractInstance('NFT PRESALE CONTRACT');

  const result = await AstTokenContract.methods.isActive(value).call();
  return result;
};

export const buyPrivateSale = async (
  nftNumber,
  selectedQuantity,
  userAddress,
) => {
  const AstTokenContract = await getContractInstance('NFT PRESALE CONTRACT');
  const result = await AstTokenContract.methods
    .buyPresale(selectedQuantity.toString())
    .send({ from: userAddress, value: nftNumber });
  return result;
};

export const buyPublicSale = async () => {
  const AstTokenContract = await getContractInstance('NFT PRESALE CONTRACT');

  const result = await AstTokenContract.methods.buyPublicSale().call();
  return result;
};
