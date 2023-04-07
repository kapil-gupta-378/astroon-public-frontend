import moment from 'moment';
import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { postSaleOnStatusApi } from '../api/astroon-token';
import { getContractInstance } from './web3ProviderMethods';

// private sale and seed will start by this function by changing sale data and merkle root
export const startPrivateSale = async (
  privateUserMerkleRoot,
  saleData,
  saleType,
  saleId,
  adminWalletAddress,
) => {
  // setting merkle root for sale
  const merkleResponse = await setMerkleRoot(
    saleData.saleType,
    privateUserMerkleRoot.merkleRoot,
    adminWalletAddress,
  );

  // setting sale pricing data and other info for sale
  const setSaleDataResponse = await setSaleData(
    saleType,
    saleId,
    saleData,
    adminWalletAddress,
  );

  // // start (toggling) sale
  // const startPrivateSaleResponse = await AstTokenContract.methods
  //   .togglePresale()
  //   .send({ from: adminWalletAddress });

  // updating sale status in backend

  const data = {};

  if (saleData.saleType === 'Private Sale') {
    data.isPrivate = true;
    data.privateId = Number(setSaleDataResponse);
  }
  if (saleData.saleType === 'Seed Sale') {
    data.isSeed = true;
    data.seedId = Number(setSaleDataResponse);
  }
  const updateResponse = postSaleOnStatusApi(data);
  return [merkleResponse, setSaleDataResponse, updateResponse];
};

export const startPublicSale = async (
  saleType,
  saleId,
  saleData,
  adminWalletAddress,
) => {
  const setSaleDataResponse = await setSaleData(
    saleType,
    saleId,
    saleData,
    adminWalletAddress,
  );

  // const startPrivateSaleResponse = await AstTokenContract.methods
  //   .togglePublicSale()
  //   .send({ from: adminWalletAddress });

  const data = {
    isPublic: true,
    publicId: Number(setSaleDataResponse),
  };

  // updating sale status in backend
  const updateResponse = postSaleOnStatusApi(data);
  return [setSaleDataResponse, updateResponse];
};

export const setMerkleRoot = async (type, merkleRoot, adminWalletAddress) => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  let merkleResponse;
  if (type === 'Private Sale') {
    merkleResponse = await AstTokenContract.methods
      .setPrivateSaleMerkleRoot(merkleRoot)
      .send({ from: adminWalletAddress });
  }

  if (type === 'Seed Sale') {
    merkleResponse = await AstTokenContract.methods
      .setSeedMerkleRoot(merkleRoot)
      .send({ from: adminWalletAddress });
  }

  if (!merkleResponse.status) throw new Error(merkleResponse.error);
  return merkleResponse;
};

export const setSaleData = async (
  saleType,
  saleId,
  saleData,
  adminWalletAddress,
) => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  const tokenRateInWai = convertEtherToWei(saleData.tokenPrice);
  const capInWei = convertEtherToWei(saleData.cap);

  const startDate = moment(saleData.startDate.replace('.000Z', ''))
    .local()
    .format('X');

  const endDays = Number(saleData.endDate);
  const thresHold = convertEtherToWei(saleData.maxLimit);
  const cliftingTime = Number(saleData.cliftingTime);
  const vestingTime = Number(saleData.vestingTime);

  const minBuy = convertEtherToWei(saleData.minBuy);

  const setSaleDataResponse = await AstTokenContract.methods
    .startTokenSale(
      saleType,
      saleId,
      tokenRateInWai,
      capInWei,
      startDate,
      endDays,
      thresHold,
      cliftingTime,
      vestingTime,
      minBuy,
    )
    .send({ from: adminWalletAddress });

  if (!setSaleDataResponse.status) throw new Error(setSaleDataResponse.error);

  return setSaleDataResponse.events.SaleCreated.returnValues.saleId;
};

export const getUserBuyDetails = async (address, saleRound) => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  const saleDetailsResponse = await AstTokenContract.methods
    .userTokenMap(saleRound, address)
    .call();
  return saleDetailsResponse;
};
export const getSaleDetails = async (saleRound) => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  const saleDetailsResponse = await AstTokenContract.methods
    .salesDetailMap(saleRound)
    .call();
  return saleDetailsResponse;
};

export const stopSale = async (saleId, saleType, adminWalletAddress) => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  const data = {};
  if (saleType === 'Public Sale') data.isPublic = false;
  if (saleType === 'Private Sale') data.isPrivate = false;
  if (saleType === 'Seed Sale') data.isSeed = false;

  let stopSaleResponse = await AstTokenContract.methods
    .updateSaleIdStatus(saleId)
    .send({ from: adminWalletAddress });

  if (!stopSaleResponse.status) throw new Error(stopSaleResponse.error);
  await postSaleOnStatusApi(data);
  return stopSaleResponse;
};

export const checkSaleRoundIsOn = async (saleRound) => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  const isAnySaleOn = await AstTokenContract.methods.isActive(saleRound).call();
  return isAnySaleOn;
};
