import moment from 'moment';
import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { postSaleOnStatusApi } from '../api/astroon-token';
import { getContractInstance } from './web3ProviderMethods';

// private sale and seed will start by this function by changing sale data and merkle root
export const startPrivateSale = async (
  privateUserMerkleRoot,
  saleData,
  adminWalletAddress,
) => {
  const AstTokenContract = await getContractInstance();

  // setting merkle root for sale
  const merkleResponse = await setMerkleRoot(
    privateUserMerkleRoot.merkleRoot,
    adminWalletAddress,
  );

  // setting sale pricing data and other info for sale
  const setSaleDataResponse = await setSaleData(saleData, adminWalletAddress);

  // start (toggling) sale
  const startPrivateSaleResponse = await AstTokenContract.methods
    .togglePresale()
    .send({ from: adminWalletAddress });

  // updating sale status in backend

  const data = {
    isPublic: false,
    isPrivate: saleData.saleType === 'Private Sale' ? true : false,
    isSeed: saleData.saleType === 'Seed Sale' ? true : false,
    saleRound: Number(setSaleDataResponse),
  };
  const updateResponse = postSaleOnStatusApi(data);
  return [
    merkleResponse,
    setSaleDataResponse,
    startPrivateSaleResponse,
    updateResponse,
  ];
};

export const startPublicSale = async (saleData, adminWalletAddress) => {
  const AstTokenContract = await getContractInstance();
  const setSaleDataResponse = await setSaleData(saleData, adminWalletAddress);
  const startPrivateSaleResponse = await AstTokenContract.methods
    .togglePublicSale()
    .send({ from: adminWalletAddress });

  const data = {
    isPublic: true,
    isPrivate: false,
    isSeed: false,
    saleRound: Number(
      setSaleDataResponse.events.SaleCreated.returnValues.saleId,
    ),
  };
  // updating sale status in backend
  const updateResponse = postSaleOnStatusApi(data);
  return [startPrivateSaleResponse, setSaleDataResponse, updateResponse];
};

export const setMerkleRoot = async (merkleRoot, adminWalletAddress) => {
  const AstTokenContract = await getContractInstance();
  const merkleResponse = await AstTokenContract.methods
    .setMerkleRoot(merkleRoot)
    .send({ from: adminWalletAddress });
  if (!merkleResponse.status) throw new Error(merkleResponse.error);
  return merkleResponse;
};

export const setSaleData = async (saleData, adminWalletAddress) => {
  const AstTokenContract = await getContractInstance();
  const tokenRateInWai = convertEtherToWei(saleData.tokenPrice);
  const capInWei = convertEtherToWei(saleData.cap);
  const startDate = moment(saleData.startDate).format('X');
  const endDays = Number(saleData.endDate);
  const thresHold = convertEtherToWei(saleData.maxLimit);
  const cliftingTime = Number(saleData.cliftingTime);
  const vestingTime = Number(saleData.vestingTime);
  const initialTokenValue = Math.round(
    Number(saleData.cap) / Number(saleData.tokenPrice),
  );
  const minBuy = Number(saleData.minBuy);

  await AstTokenContract.methods
    .set_initialTokens(initialTokenValue)
    .send({ from: adminWalletAddress });

  const setSaleDataResponse = await AstTokenContract.methods
    .startTokenSale(
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
  const AstTokenContract = await getContractInstance();
  const saleDetailsResponse = await AstTokenContract.methods
    .userTokenMap(saleRound, address)
    .call();
  return saleDetailsResponse;
};
export const getSaleDetails = async (saleRound) => {
  const AstTokenContract = await getContractInstance();
  const saleDetailsResponse = await AstTokenContract.methods
    .salesDetailMap(saleRound)
    .call();
  return saleDetailsResponse;
};

export const stopSale = async (saleType, adminWalletAddress) => {
  const AstTokenContract = await getContractInstance();
  const data = {
    isPublic: saleType === 'Public Sale' ? false : undefined,
    isPrivate: saleType === 'Private Sale' ? false : undefined,
    isSeed: saleType === 'Seed Sale' ? false : undefined,
  };
  let stopSaleResponse;
  if (saleType === 'Private Sale' || saleType === 'Seed Sale') {
    stopSaleResponse = await AstTokenContract.methods
      .togglePresale()
      .send({ from: adminWalletAddress });
    if (!stopSaleResponse.status) throw new Error(stopSaleResponse.error);
    await postSaleOnStatusApi(data);
    return stopSaleResponse;
  }
  if (saleType === 'Public Sale') {
    stopSaleResponse = await AstTokenContract.methods
      .togglePublicSale()
      .send({ from: adminWalletAddress });
    if (!stopSaleResponse.status) throw new Error(stopSaleResponse.error);
    await postSaleOnStatusApi(data);
    return stopSaleResponse;
  }

  throw new Error('Please Select Sale Type');
};
