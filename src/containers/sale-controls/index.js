import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateTokenSaleDataApi } from '../../../services/api/astroon-token';
import {
  getPrivateUserMerkleRootApi,
  getSeedUserMerkleRootApi,
} from '../../../services/api/markle';
import {
  getNFTSaleDataApi,
  postNftPreSaleCsvApi,
  updateNFTSaleDataApi,
} from '../../../services/api/nftPreSale';
import {
  isNftPreSaleIsActive,
  revealMysteryBoxData,
  startSale,
} from '../../../services/web3/nftPreSale';
import {
  startPrivateSale,
  startPublicSale,
  stopSale,
} from '../../../services/web3/saleMethod';
import EditSaleDetailsModal from '../../component/common/edit-sale-details-modal';
import SaleDetailCard from '../../component/common/sale-detail-card';
import MysteryBoxSale from '../../component/ui/mystery-box-sale';
import EditMysteryBoxSaleDataModal from '../../component/ui/mystery-box-sale-data-modal';
import { setGlobalLoading } from '../../redux/global-loading/globalLoadingSlice';
import { fetchNftPreSaleData } from '../../redux/nft-sale/nftSaleAction';
import { fetchTokenDataAction } from '../../redux/token/tokenAction';
import { emptyObject } from '../../utils/objectMethods';
import styles from './saleControls.module.scss';

const SaleControls = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isNftSaleOnState, setIsNftSaleOnState] = useState(false);
  const [showEditMysteryBoxModal, setShowEditMysteryBoxModal] = useState(false);
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
  const [newMysteryBoxSaleData, setNewMysteryBoxSaleData] = useState({
    cost: '',
    mintCost: '',
    maxSupply: '',
    startTime: '',
    endTime: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    checkIsNftSaleOn();
    dispatch(fetchTokenDataAction());
    dispatch(fetchNftPreSaleData());
  }, []);

  const { isConnected, walletAddress } = useSelector(
    (state) => state.adminReducer,
  );
  const { nftSaleData } = useSelector((state) => state.nftSaleReducer);
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
    setNewSaleData((prevState) => emptyObject(prevState));
    setShowEditModal(false);
  }

  function editMysteryBoxSale(data) {
    setNewMysteryBoxSaleData(data);
    setShowEditMysteryBoxModal(true);
  }

  function hideMyterySaleEditModalHandler() {
    // setNewMysteryBoxSaleData((prevState) => emptyObject(prevState));
    setShowEditMysteryBoxModal(false);
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

  const updateNftSaleData = async (data) => {
    try {
      if (
        !newMysteryBoxSaleData.saleType ||
        !newMysteryBoxSaleData.mintCost ||
        !newMysteryBoxSaleData.maxSupply ||
        !newMysteryBoxSaleData.startTime ||
        !newMysteryBoxSaleData.endTime
      )
        throw new Error('Please Fill All Field');

      const updateResponse = await updateNFTSaleDataApi(data);

      if (updateResponse.success) {
        toast.success('Data Updated');
        setShowEditMysteryBoxModal(false);
        checkIsNftSaleOn();
        dispatch(fetchTokenDataAction());
        dispatch(fetchNftPreSaleData());
      }
    } catch (error) {
      setShowEditMysteryBoxModal(false);
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const checkIsNftSaleOn = async () => {
    const isSaleOn = await isNftPreSaleIsActive(0);
    setIsNftSaleOnState(isSaleOn);
  };

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

  // function for starting mystery box sale buy conntact (presale contraact method - startSale())

  const handleStartMysterBoxSale = async () => {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');

      //  fetching data from server for latest data
      const data = await getNFTSaleDataApi();

      const saleStartResponse = await startSale(data.data, walletAddress);
      if (saleStartResponse.status) {
        checkIsNftSaleOn();
        toast.success('Sale Started');
      }
    } catch (error) {
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const handleRevealMysteryBox = async () => {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');
      const response = await revealMysteryBoxData(walletAddress);
      if (response.status) throw new Error('Mystery box reveal successfully');
    } catch (error) {
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  // funtion for handle csv uploaded by input csv
  const uploadCsvHandler = async (e) => {
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      const response = await postNftPreSaleCsvApi(formData);
      if (response.success) toast.success('Data uploaded');
    } catch (error) {
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

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

        <MysteryBoxSale
          admin={true}
          data={nftSaleData}
          saleStartHandler={handleStartMysterBoxSale}
          editSaleDetailsHander={() => editMysteryBoxSale(nftSaleData)}
          saleRoundOn={isNftSaleOnState}
          isSaleOn={isNftSaleOnState}
          revealHandler={handleRevealMysteryBox}
          uploadCsvHandler={uploadCsvHandler}
        />
      </div>
      <EditSaleDetailsModal
        value={newSaleData}
        handleShow={showEditModal}
        setNewSaleDataHandler={setNewSaleData}
        modalClosehandler={hideSaleEditModalHandler}
        rightButtonHandler={() => updateSaleData()}
        loading={false}
      />
      <EditMysteryBoxSaleDataModal
        value={newMysteryBoxSaleData}
        handleShow={showEditMysteryBoxModal}
        setNewSaleDataHandler={setNewMysteryBoxSaleData}
        modalClosehandler={hideMyterySaleEditModalHandler}
        rightButtonHandler={() => updateNftSaleData(newMysteryBoxSaleData)}
        loading={false}
      />
    </main>
  );
};

export default SaleControls;
