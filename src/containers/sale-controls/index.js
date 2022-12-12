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
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTokenDataAction());
  }, []);

  const { isConnected, walletAddress } = useSelector(
    (state) => state.adminReducer,
  );
  const { seedSale, privateSale, publicSale } = useSelector(
    (state) => state.tokenReducer,
  );

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
        return startPrivateSale;
      }

      if (saleType === 'seed') {
        const seedUserMerkleRoot = await getSeedUserMerkleRootApi();

        startSaleResponse = await startPrivateSale(
          seedUserMerkleRoot,
          seedSale,
          walletAddress,
        );
        return startPrivateSale;
      }

      startSaleResponse = await startPublicSale(publicSale, walletAddress);

      toast.success('Sale Started');

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
    });
    setShowEditModal(false);
  }

  async function updateSaleData() {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');
      const updateResponse = await updateTokenSaleDataApi(
        newSaleData.saleType,
        newSaleData,
      );
      if (updateResponse.success) toast.success('Data Updated');
      dispatch(fetchTokenDataAction());
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  }

  return (
    <main className={styles.sale_page_wrap}>
      <div className={styles.sale_Card_wrap}>
        {seedSale && (
          <SaleDetailCard
            data={seedSale}
            saleStartHandler={() => saleStartHandler('seed')}
            editSaleDetailsHander={() =>
              editSaleDetailsHander('seed', seedSale)
            }
            key={1}
            admin={true}
          />
        )}
        {privateSale && (
          <SaleDetailCard
            data={privateSale}
            saleStartHandler={() => saleStartHandler('private')}
            editSaleDetailsHander={() =>
              editSaleDetailsHander('private', privateSale)
            }
            key={2}
            admin={true}
          />
        )}
        {publicSale && (
          <SaleDetailCard
            data={publicSale}
            key={3}
            saleStartHandler={() => saleStartHandler('public')}
            editSaleDetailsHander={() =>
              editSaleDetailsHander('public', publicSale)
            }
            admin={true}
          />
        )}
      </div>
      <EditSaleDetailsModal
        value={newSaleData}
        handleShow={showEditModal}
        setNewSaleDataHandler={setNewSaleData}
        leftButtonHandler={hideSaleEditModalHandler}
        rightButtonHandler={() => updateSaleData()}
        loading={false}
      />
    </main>
  );
};

export default SaleControls;
