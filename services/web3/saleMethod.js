import moment from 'moment';
import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { postTokenSaleRound } from '../api/astroon-token';
import { getContractInstance } from './web3ProviderMethods';

export const startPrivateSale = async (
  privateUserMerkleRoot,
  saleData,
  adminWalletAddress,
) => {
  const AstTokenContract = await getContractInstance();
  const merkleResponse = await setMerkleRoot(
    privateUserMerkleRoot.merkleRoot,
    adminWalletAddress,
  );
  const setSaleDataResponse = await setSaleData(saleData, adminWalletAddress);
  const startPrivateSaleResponse = await AstTokenContract.methods
    .togglePresale()
    .send({ from: adminWalletAddress });
  return [merkleResponse, setSaleDataResponse, startPrivateSaleResponse];
};

export const startPublicSale = async (saleData, adminWalletAddress) => {
  const AstTokenContract = await getContractInstance();
  const setSaleDataResponse = await setSaleData(saleData, adminWalletAddress);
  const startPrivateSaleResponse = await AstTokenContract.methods
    .togglePublicSale()
    .send({ from: adminWalletAddress });
  return [startPrivateSaleResponse, setSaleDataResponse];
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
  const startDate = moment(saleData.endDate).format('X');
  const endDays = Number(saleData.endDate);
  const thresHold = convertEtherToWei(saleData.buyLimit);
  const cliftingTime = Number(saleData.cliftingTime);
  const vestingTime = Number(saleData.vestingTime);

  const setSaleDataResponse = await AstTokenContract.methods
    .startTokenSale(
      tokenRateInWai,
      capInWei,
      startDate,
      endDays,
      thresHold,
      cliftingTime,
      vestingTime,
    )
    .send({ from: adminWalletAddress });

  if (!setSaleDataResponse.status) throw new Error(setSaleDataResponse.error);
  let data = {
    saleRound: Number(
      setSaleDataResponse.events.SaleCreated.returnValues.saleId,
    ),
  };
  await postTokenSaleRound(data);

  return setSaleDataResponse.events.SaleCreated.returnValues.saleId;
};

export const getUserBuyDetails = async (address, saleRound = 8) => {
  const AstTokenContract = await getContractInstance();
  const saleDetailsResponse = await AstTokenContract.methods
    .userTokenMap(saleRound, address)
    .call();
  return saleDetailsResponse;
};
export const getSaleDetails = async (saleRound = 8) => {
  const AstTokenContract = await getContractInstance();
  const saleDetailsResponse = await AstTokenContract.methods
    .salesDetailMap(saleRound)
    .call();
  return saleDetailsResponse;
};
