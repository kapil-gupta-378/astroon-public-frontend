import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './mysteryBox.module.scss';
import mesteryBoxImage from '../../../../public/assets/images/mystery-box-image.png';
import Button from '../../common/button';
import FormSelect from '../../../component/common/form-select/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNftPreSaleData } from '../../../redux/nft-sale/nftSaleAction';
import {
  convertEtherToUSD,
  convertEtherToWei,
  convertWeiToEther,
} from '../../../utils/currencyMethods';
import { getEligibilityNftPreSale } from '../../../utils/calculation';
import { getWalletAstTokenBalance } from '../../../../services/web3/walletMothods';
import {
  buyPrivateSale,
  isNftPreSaleIsActive,
} from '../../../../services/web3/nftPreSale';
import { toast } from 'react-toastify';
import {
  getNFTPurchaseDataApi,
  portNFTPurchaseData,
} from '../../../../services/api/nftPreSale';
import { setGlobalLoading } from '../../../redux/global-loading/globalLoadingSlice';
import GlobalLoading from '../../common/global-loading';
const MysteryBox = () => {
  const [selectedQuantity, setSelectedQuantity] = useState({
    value: 1,
    label: '1',
  });

  const [usdPrice, setUsdPrice] = useState(0);
  const [isSaleOn, setIsSaleOn] = useState(false);

  const { isUserConnected, walletAddress } = useSelector(
    (state) => state.walletReducer,
  );

  const { nftSaleData } = useSelector((state) => state.nftSaleReducer);

  const quantitySelectOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    isSaleOnCheck();
    dispatch(fetchNftPreSaleData());
  }, []);

  useEffect(() => {
    fetchUSDRate();
  }, [nftSaleData]);

  const isSaleOnCheck = async () => {
    const result = await isNftPreSaleIsActive(0);
    setIsSaleOn(result);
  };

  const buyMysteryBox = async () => {
    try {
      dispatch(setGlobalLoading(true));

      if (!isUserConnected) throw new Error('Please Connect Your Wallet');

      const walletBalance = await getWalletAstTokenBalance(walletAddress);
      const lastMysteryBoxPurChase = await getNFTPurchaseDataApi(walletAddress);

      // throw erroe when user has less than 100 ast token
      if (walletBalance < 100)
        throw new Error('You are not eligible for buy. Please buy token first');

      // getting eligibility for user to buy mystery box
      let eligibilityResult = getEligibilityNftPreSale(walletBalance);
      // throw error when user has allready buy 4 mystery box
      if (lastMysteryBoxPurChase === 4)
        throw new Error('You can not buy more than 4 mystery box');

      // throw error when user has bouth purchased all eligible mystery box
      if (lastMysteryBoxPurChase >= eligibilityResult)
        throw new Error(
          `You can not buy more than ${eligibilityResult} mystery box`,
        );

      // throw error if user select more eligibility quantity
      if (selectedQuantity.value > eligibilityResult - lastMysteryBoxPurChase)
        throw new Error(
          `You can not buy more than ${
            eligibilityResult - lastMysteryBoxPurChase
          }`,
        );

      // calculating inputs for buy methods
      let buyValue =
        selectedQuantity.value *
        convertWeiToEther(+nftSaleData.cost + +nftSaleData.mintCost);

      buyValue = convertEtherToWei(buyValue);

      //  invoking contract method for private buy of nft pre sale
      const buyResult = await buyPrivateSale(
        buyValue,
        selectedQuantity.value,
        walletAddress,
      );

      if (buyResult.status) {
        const postData = {
          walletAddress: walletAddress,
          quantity: selectedQuantity.value,
        };
        // posting data to backend if contract methods return status true
        const postResponse = await portNFTPurchaseData(postData);
        if (postResponse.success) toast.success('Mystery box buy successfully');
        dispatch(setGlobalLoading(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const fetchUSDRate = async () => {
    if (nftSaleData.cost) {
      const price = await convertEtherToUSD(
        convertWeiToEther(nftSaleData.cost),
      );
      setUsdPrice(price);
    }
  };

  return (
    <div className={styles.mysteryBox_wrap}>
      <h3 className={styles.heading}>NFT Pre-Sale</h3>
      <div className={styles.image_wrap}>
        <Image
          src={mesteryBoxImage}
          layout={'responsive'}
          alt={'mystery-box'}
        />
      </div>
      <div className={styles.pricing}>
        <h4>
          {convertWeiToEther(nftSaleData.cost ? nftSaleData.cost : 0)}
          <span>{usdPrice}</span>
        </h4>
      </div>
      <div className={styles.select_wrap}>
        <FormSelect
          selectedOption={selectedQuantity}
          label={'Quantity'}
          options={quantitySelectOptions}
          titleBackground={'rgb(11 11 50)'}
          handleChange={(value) => setSelectedQuantity(value)}
        />
      </div>
      <Button disabled={!isSaleOn} onClick={buyMysteryBox}>
        Buy Now
      </Button>
      {<GlobalLoading />}
    </div>
  );
};

export default MysteryBox;
