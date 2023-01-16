import moment from 'moment';
import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { getContractInstance } from './web3ProviderMethods';

export const getNftPreSaleData = async () => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );
  const saleData = await AstMysteryBoxContract.methods.SaleDetailMap(1).call();
  return saleData;
};

export const isNftPreSaleIsActive = async () => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );

  const result = await AstMysteryBoxContract.methods.isActive().call();
  return result;
};

export const buyPrivateSale = async (
  nftNumber,
  selectedQuantity,
  userAddress,
) => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );
  const result = await AstMysteryBoxContract.methods
    .buyPresale(selectedQuantity.toString())
    .send({ from: userAddress, value: nftNumber });
  return result;
};

export const buyPublicSale = async () => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );

  const result = await AstMysteryBoxContract.methods.buyPublicSale().call();
  return result;
};

export const startSale = async (data, address) => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );
  const cost = convertEtherToWei(data.cost);
  const mintCost = convertEtherToWei(data.mintCost);
  const maxSupply = data.maxSupply;
  const startTime = moment(data.startTime.replace('.000Z', ''))
    .local()
    .format('X');
  const endTime = moment(data.endTime.replace('.000Z', '')).local().format('X');
  const response = await AstMysteryBoxContract.methods
    .startPreSale(cost, mintCost, maxSupply, startTime, endTime)
    .send({
      from: address,
    });

  return response;
};

// funtion for reveal mystery box data of nft after sale end
export const revealMysteryBoxData = async (address) => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );

  const response = AstMysteryBoxContract.methods
    .reveal()
    .send({ from: address });

  return response;
};

export const setBaseUri = async (uri, address) => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );

  const response = AstMysteryBoxContract.methods
    .setBaseURI(uri)
    .send({ from: address });

  return response;
};

export const isNftReaveled = async () => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );

  const response = AstMysteryBoxContract.methods.revealed().call();

  return response;
};

export const setCategoryToContract = async (category, id, address) => {
  const AstMysteryBoxContract = await getContractInstance(
    'NFT PRESALE CONTRACT',
  );

  const response = AstMysteryBoxContract.methods
    .updateCategory(category, id)
    .send({ from: address });
  return response;
};
