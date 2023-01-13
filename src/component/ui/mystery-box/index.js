import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './mysteryBox.module.scss';
import mesteryBoxImage from '../../../../public/assets/images/mystery-box-image.png';
import comingSoonImage from '../../../../public/assets/images/coming_soon.svg';
import Button from '../../common/button';
import FormSelect from '../../../component/common/form-select/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNftPreSaleData } from '../../../redux/nft-sale/nftSaleAction';
import {
  convertEtherToUSD,
  convertEtherToWei,
} from '../../../utils/currencyMethods';
import {
  getEligibilityNftPreSale,
  removeZero,
} from '../../../utils/calculation';
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
  const [selecterOption, setSelecterOption] = useState();

  const [usdPrice, setUsdPrice] = useState(0);
  const [mysteryBoxEligibility, setMysteryBoxEligibility] = useState('');
  const [isSaleOn, setIsSaleOn] = useState(false);

  const { isUserConnected, walletAddress } = useSelector(
    (state) => state.walletReducer,
  );

  const { nftSaleData, nftSaleLoading } = useSelector(
    (state) => state.nftSaleReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    isSaleOnCheck();
    dispatch(fetchNftPreSaleData());
    calculateUserEligibility();
  }, []);

  useEffect(() => {
    fetchUSDRate();
  }, [nftSaleData]);

  const isSaleOnCheck = async () => {
    const result = await isNftPreSaleIsActive(0);
    setIsSaleOn(result);
  };

  const calculateUserEligibility = async () => {
    dispatch(setGlobalLoading(true));

    const walletBalance = await getWalletAstTokenBalance(walletAddress);

    const lastMysteryBoxPurChase = await getNFTPurchaseDataApi(walletAddress);
    let eligibilityResult = getEligibilityNftPreSale(walletBalance);
    // calculating current buy nft eligibity for user by  max buy number minus last buy number
    eligibilityResult =
      eligibilityResult - lastMysteryBoxPurChase.count < 0
        ? 0
        : eligibilityResult - lastMysteryBoxPurChase.count;

    let arr = [];

    // calculating option value for user quantity selector this will calculate max current limit
    for (let i = 0; i < eligibilityResult; i++) {
      arr.push({ value: i + 1, label: `${i + 1}` });
    }
    setSelecterOption(arr);

    setMysteryBoxEligibility(eligibilityResult);
    dispatch(setGlobalLoading(false));
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
      let buyValue = removeZero(
        selectedQuantity.value * (+nftSaleData.cost + +nftSaleData.mintCost),
      );
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
          price: Number(nftSaleData.cost),
          saleType: 'nftPre',
          tokenId: Number(buyResult.events.Transfer.returnValues.tokenId),
        };

        // posting data to backend if contract methods return status true
        const postResponse = await portNFTPurchaseData(postData);
        if (postResponse.success) {
          toast.success('Mystery box buy successfully');
          isSaleOnCheck();
          dispatch(fetchNftPreSaleData());
          calculateUserEligibility();
          dispatch(setGlobalLoading(false));
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const fetchUSDRate = async () => {
    if (nftSaleData.cost) {
      const price = await convertEtherToUSD(nftSaleData.cost);
      setUsdPrice(price);
    }
  };

  return (
    <div className={styles.main_wrap}>
      {!nftSaleLoading ? (
        <div className={styles.mysteryBox_wrap}>
          <h3 className={styles.heading}>NFT Pre-Sale</h3>
          <div className={styles.image_wrap}>
            <Image
              src={mesteryBoxImage}
              layout={'responsive'}
              alt={'mystery-box'}
            />
          </div>
          {isSaleOn ? (
            <>
              <div className={styles.pricing}>
                <h4>{`${nftSaleData.cost ? nftSaleData.cost : 0} ETH`}</h4>
                <h5>{`$${usdPrice}`}</h5>
              </div>

              <div className={styles.select_wrap}>
                <FormSelect
                  selectedOption={selectedQuantity}
                  label={'Quantity'}
                  options={selecterOption}
                  titleBackground={'rgb(11 11 50)'}
                  handleChange={(value) => setSelectedQuantity(value)}
                />
              </div>
              <Button
                disabled={!isSaleOn || mysteryBoxEligibility <= 0}
                onClick={buyMysteryBox}
              >
                Buy Now
              </Button>
              <h3 className={styles.eligibility_heading}>
                {mysteryBoxEligibility > 0
                  ? `You are eligible for ${mysteryBoxEligibility} mystery box`
                  : isUserConnected
                  ? 'You have exceeded your buying limit.'
                  : 'Connect Your Wallet'}
              </h3>
            </>
          ) : (
            <>
              <div className={styles.coming_soon_wrap}>
                <Image
                  src={comingSoonImage}
                  alt="coming soon"
                  layout="responsive"
                />
              </div>
            </>
          )}

          {<GlobalLoading />}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MysteryBox;
