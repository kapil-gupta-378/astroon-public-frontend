import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateTokenSaleDataApi } from '../../../services/api/astroon-token';
import {
  getPrivateUserMerkleRootApi,
  getSeedUserMerkleRootApi,
} from '../../../services/api/markle';
import {
  startPrivateSale,
  startPublicSale,
  stopSale,
} from '../../../services/web3/saleMethod';
import EditSaleDetailsModal from '../../component/common/edit-sale-details-modal';
import SaleDetailCard from '../../component/common/sale-detail-card';
import { setGlobalLoading } from '../../redux/global-loading/globalLoadingSlice';
import { fetchTokenDataAction } from '../../redux/token/tokenAction';
import styles from './saleControls.module.scss';

const SaleControls = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newSaleData, setNewSaleData] = useState({
    saleType: '',
    buyLimit: '',
    cap: '',
    cliftingTime: '',
    endDate: '',
    startDate: '',
    tokenPrice: '',
    vestingTime: '',
    noOfToken: '',
    minBuy: '',
    maxLimit: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTokenDataAction());
  }, []);

  const { isConnected, walletAddress } = useSelector(
    (state) => state.adminReducer,
  );
  const {
    tokenData,
    seedSale,
    privateSale,
    publicSale,
    saleOnData,
    saleRoundOn,
  } = useSelector((state) => state.tokenReducer);

  async function saleStartHandler(saleType) {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');

      let startSaleResponse;
      dispatch(setGlobalLoading(true));

      if (saleType === 'private') {
        const privateUserMerkleRoot = await getPrivateUserMerkleRootApi();

        startSaleResponse = await startPrivateSale(
          privateUserMerkleRoot,
          privateSale,
          walletAddress,
        );
        dispatch(fetchTokenDataAction());
        dispatch(setGlobalLoading(false));
        toast.success('Sale Started');
        return startPrivateSale;
      }

      if (saleType === 'seed') {
        const seedUserMerkleRoot = await getSeedUserMerkleRootApi();

        startSaleResponse = await startPrivateSale(
          seedUserMerkleRoot,
          seedSale,
          walletAddress,
        );
        dispatch(fetchTokenDataAction());
        dispatch(setGlobalLoading(false));
        toast.success('Sale Started');
        return startPrivateSale;
      }

      startSaleResponse = await startPublicSale(publicSale, walletAddress);
      toast.success('Sale Started');

      dispatch(fetchTokenDataAction());
      dispatch(setGlobalLoading(false));
      return startSaleResponse;
    } catch (error) {
      dispatch(setGlobalLoading(false));
      console.error(error);
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  }

  function editSaleDetailsHander(saleType, data) {
    setNewSaleData(data);
    setNewSaleData((prevValue) => ({
      ...prevValue,
      saleType:
        saleType === 'public'
          ? 'Public Sale'
          : saleType === 'seed'
          ? 'Seed Sale'
          : 'Private Sale',
    }));
    setShowEditModal(true);
  }

  function hideSaleEditModalHandler() {
    setNewSaleData({
      saleType: '',
      buyLimit: '',
      cap: '',
      cliftingTime: '',
      endDate: '',
      startDate: '',
      tokenPrice: '',
      vestingTime: '',
      noOfToken: '',
      minBuy: '',
      maxLimit: '',
    });
    setShowEditModal(false);
  }

  async function updateSaleData() {
    const data = {
      saleType: newSaleData.saleType,
      buyLimit: Number(newSaleData.buyLimit),
      cap: Number(newSaleData.cap),
      cliftingTime: Number(newSaleData.cliftingTime),
      endDate: Number(newSaleData.endDate),
      startDate: newSaleData.startDate.toString(),
      tokenPrice: newSaleData.tokenPrice,
      vestingTime: Number(newSaleData.vestingTime),
      noOfToken: Number(newSaleData.noOfToken),
      minBuy: Number(newSaleData.minBuy),
      maxLimit: Number(newSaleData.maxLimit),
    };

    try {
      if (
        !newSaleData.saleType ||
        !newSaleData.buyLimit ||
        !newSaleData.cap ||
        !newSaleData.cliftingTime ||
        !newSaleData.endDate ||
        !newSaleData.tokenPrice ||
        !newSaleData.vestingTime ||
        !newSaleData.noOfToken ||
        !newSaleData.minBuy ||
        !newSaleData.maxLimit
      )
        throw new Error('Please Fill All Field');

      const updateResponse = await updateTokenSaleDataApi(
        newSaleData.saleType,
        data,
      );
      if (updateResponse.success) toast.success('Data Updated');
      dispatch(fetchTokenDataAction());
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  }

  async function stopSaleHander(saleType) {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');

      dispatch(setGlobalLoading(true));

      const stopSaleResponse = await stopSale(saleType, walletAddress);
      if (stopSaleResponse.status) {
        toast.success(`${saleType} Stoped`);
      }

      dispatch(fetchTokenDataAction());
      dispatch(setGlobalLoading(false));
    } catch (error) {
      dispatch(setGlobalLoading(false));
      console.error(error);
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  }

  return (
    <main className={styles.sale_page_wrap}>
      <div className={styles.sale_Card_wrap}>
        {seedSale && (
          <SaleDetailCard
            isSaleOn={tokenData.isPrivateSale && saleOnData.isSeed}
            onClickStopSale={stopSaleHander}
            data={seedSale}
            saleStartHandler={() => saleStartHandler('seed')}
            editSaleDetailsHander={() =>
              editSaleDetailsHander('seed', seedSale)
            }
            key={1}
            admin={true}
            saleRoundOn={saleRoundOn}
          />
        )}
        {privateSale && (
          <SaleDetailCard
            isSaleOn={tokenData.isPrivateSale && saleOnData.isPrivate}
            onClickStopSale={stopSaleHander}
            data={privateSale}
            saleStartHandler={() => saleStartHandler('private')}
            editSaleDetailsHander={() =>
              editSaleDetailsHander('private', privateSale)
            }
            key={2}
            admin={true}
            saleRoundOn={saleRoundOn}
          />
        )}
        {publicSale && (
          <SaleDetailCard
            isSaleOn={tokenData.isPublicSale}
            onClickStopSale={stopSaleHander}
            data={publicSale}
            key={3}
            saleStartHandler={() => saleStartHandler('public')}
            editSaleDetailsHander={() =>
              editSaleDetailsHander('public', publicSale)
            }
            admin={true}
            saleRoundOn={saleRoundOn}
          />
        )}
      </div>
      <EditSaleDetailsModal
        value={newSaleData}
        handleShow={showEditModal}
        setNewSaleDataHandler={setNewSaleData}
        modalClosehandler={hideSaleEditModalHandler}
        rightButtonHandler={() => updateSaleData()}
        loading={false}
      />
    </main>
  );
};

export default SaleControls;
