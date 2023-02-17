import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import { updateTokenSaleDataApi } from '../../../services/api/astroon-token';
import {
  getPrivateUserMerkleRootApi,
  getSeedUserMerkleRootApi,
} from '../../../services/api/markle';
import {
  getNFTCategoryData,
  getNFTSaleDataApi,
  postCronTimeApi,
  postNftPreSaleCsvApi,
  refreshNftDataApi,
  updateNFTSaleDataApi,
} from '../../../services/api/nftPreSale';
import {
  isNftPreSaleIsActive,
  revealMysteryBoxData,
  setBaseUri,
  setCategoryToContract,
  setRewardContractAddressToPreSale,
  startSale,
} from '../../../services/web3/nftPreSale';
import {
  setNFTPreCon_To_RewardCon,
  setRewardMonthData,
} from '../../../services/web3/nftReward';
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
import { convertEtherToWei } from '../../utils/currencyMethods';
import { emptyObject } from '../../utils/objectMethods';
import styles from './saleControls.module.scss';
const AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS;
const AST_NFT_PRESALE_REWARD_PROXY_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_AST_NFT_PRESALE_REWARD_PROXY_CONTRACT_ADDRESS;
const SaleControls = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isNftSaleOnState, setIsNftSaleOnState] = useState(false);
  const [showEditMysteryBoxModal, setShowEditMysteryBoxModal] = useState(false);
  const csvInputRef = useRef();
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
  const { nftSaleData, isNftSaleRevealed, saleContractData } = useSelector(
    (state) => state.nftSaleReducer,
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
      startDate: undefined,
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

      if (!newSaleData.startDate) throw new Error('Please Select Start Time.');

      if (newSaleData.maxLimit < newSaleData.minBuy)
        throw new Error('Max buy limit can not less than Minimum buy limit');

      if (newSaleData.tokenPrice <= 0)
        throw new Error('Token price can not be 0 or less than 0 ');

      if (newSaleData.minBuy <= 0)
        throw new Error('Minimum buy limit can not be 0 or less than 0 ');

      if (newSaleData.maxLimit <= 0)
        throw new Error('Max buy limit can not be 0 or less than 0 ');

      if (
        newSaleData.noOfToken < newSaleData.maxLimit ||
        newSaleData.noOfToken < newSaleData.minBuy
      )
        throw new Error(
          'Minimum and Maximum buy limit can not bigger than token number',
        );

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
    const isSaleOn = await isNftPreSaleIsActive();
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

  // function for starting mystery box sale buy contract (presale contract method - startSale())
  const handleStartMysterBoxSale = async () => {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');
      dispatch(setGlobalLoading(true));

      //  fetching data from server for latest data
      const data = await getNFTSaleDataApi();

      const saleStartResponse = await startSale(data.data, walletAddress);
      if (saleStartResponse.status) {
        checkIsNftSaleOn();
        toast.success('Sale Started');
        dispatch(setGlobalLoading(false));
      }
    } catch (error) {
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const handleRevealMysteryBox = async () => {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');

      if (!AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS)
        throw new Error('Please enter NFT Presale contract address in env');

      if (!Web3.utils.isAddress(AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS))
        throw new Error(
          'Please enter valid NFT Presale contract address in env',
        );

      if (!AST_NFT_PRESALE_REWARD_PROXY_CONTRACT_ADDRESS)
        throw new Error('Please enter reward contract address');

      if (!Web3.utils.isAddress(AST_NFT_PRESALE_REWARD_PROXY_CONTRACT_ADDRESS))
        throw new Error('Please enter valid reward contract address');

      dispatch(setGlobalLoading(true));

      // creating month reward data from current month
      const monthInNumber = moment().month();
      const rewardMap = [
        0, 100, 200, 200, 300, 500, 700, 700, 1500, 1500, 1500, 2500,
      ];
      const rotateArray = function (arry, position) {
        for (let i = 0; i < position; i++) {
          arry.unshift(arry.pop());
        }

        return arry;
      };

      const currentRewardMap = rotateArray(rewardMap, monthInNumber);
      const currentRewardMapInWei = currentRewardMap.map((value) =>
        convertEtherToWei(value),
      );

      // setting nft preSale reward array by current month number
      await setRewardMonthData(currentRewardMapInWei, walletAddress);

      // setting presale contract to nft reward contract
      await setNFTPreCon_To_RewardCon(
        AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS,
        walletAddress,
      );
      // setting reward contract to nft presale contract
      let contractResponse = await setRewardContractAddressToPreSale(
        AST_NFT_PRESALE_REWARD_PROXY_CONTRACT_ADDRESS,
        walletAddress,
      );

      const categoryData = await getNFTCategoryData();

      if (categoryData.data.categoriesId && categoryData.data.tokenIds) {
        // setting data for upcoming reward on pre sale nft by sending
        // token id and category
        contractResponse = await setCategoryToContract(
          categoryData.data.categoriesId,
          categoryData.data.tokenIds,
          walletAddress,
        );
      }

      // revealing mystery box if reward category was set successfuly
      if (contractResponse.status)
        var response = await revealMysteryBoxData(walletAddress);

      if (response.status) {
        postCronTimeApi();
        refreshNftDataApi();
        toast.success('Mystery box reveal successfully');
      }
      dispatch(setGlobalLoading(false));
    } catch (error) {
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  // function for handle csv uploaded by input csv
  // uploading csv file to server and then uploading uri to contract
  const uploadCsvHandler = async (e) => {
    try {
      if (!isConnected) throw new Error('Please Connect Your Wallet');
      dispatch(setGlobalLoading(true));
      if (e.target.files[0]) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const response = await postNftPreSaleCsvApi(formData);

        if (response.success) {
          // contract Invocation
          const uriResponse = await setBaseUri(response.data, walletAddress);
          if (uriResponse.status) toast.success('Data uploaded');
        }
        dispatch(setGlobalLoading(false));
      }
    } catch (error) {
      csvInputRef.current.value = null;
      dispatch(setGlobalLoading(false));
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
            availableToken={tokenData.tokensAvailable}
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
            availableToken={tokenData.tokensAvailable}
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
            availableToken={tokenData.tokensAvailable}
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
          isRevealed={isNftSaleRevealed}
          saleContractData={saleContractData}
          csvInputRef={csvInputRef}
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
