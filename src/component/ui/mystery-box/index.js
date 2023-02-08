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
  // convertEtherToUSD,
  convertEtherToWei,
  convertWeiToEther,
} from '../../../utils/currencyMethods';
import {
  getEligibilityNftPreSale,
  removeZero,
} from '../../../utils/calculation';
import { getWalletAstTokenBalance } from '../../../../services/web3/walletMothods';
import {
  approveBuyFromASTContract,
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
import { setBalance } from '../../../redux/persist/wallet/walletSlice';
const AST_NFT_PRESALE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_AST_NFT_PRESALE_PROXY_CONTRACT_ADDRESS;
const MysteryBox = () => {
  const [selectedQuantity, setSelectedQuantity] = useState({
    value: 1,
    label: '1',
  });
  const [selecterOption, setSelecterOption] = useState();

  // const [usdPrice, setUsdPrice] = useState(0);
  const [mysteryBoxEligibility, setMysteryBoxEligibility] = useState('');
  const [isSaleOn, setIsSaleOn] = useState(false);

  const { isUserConnected, walletAddress, balance } = useSelector(
    (state) => state.walletReducer,
  );

  const { nftSaleData, nftSaleLoading, saleContractData } = useSelector(
    (state) => state.nftSaleReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    isSaleOnCheck();
    dispatch(fetchNftPreSaleData());
    if (saleContractData.cost) calculateUserEligibility();
  }, [saleContractData.cost]);

  useEffect(() => {
    // fetchUSDRate();
  }, [nftSaleData]);

  const isSaleOnCheck = async () => {
    const result = await isNftPreSaleIsActive(0);
    setIsSaleOn(result);
  };

  const calculateUserEligibility = async () => {
    dispatch(setGlobalLoading(true));

    const walletBalance = await getWalletAstTokenBalance(walletAddress);

    const lastMysteryBoxPurChase = await getNFTPurchaseDataApi(walletAddress);

    // calculating current buy nft eligibity for user
    let eligibilityResult = getEligibilityNftPreSale(
      walletBalance +
        Number(convertWeiToEther(saleContractData.cost)) *
          lastMysteryBoxPurChase.count,
      lastMysteryBoxPurChase.count,
    );

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

      // calculating inputs for buy methods
      let nftCostInWei = convertEtherToWei(
        removeZero(400 * selectedQuantity.value),
      );

      // approving nft buy from user by ast Token main contact meothod approve()
      await approveBuyFromASTContract(
        AST_NFT_PRESALE_CONTRACT_ADDRESS,
        nftCostInWei,
        walletAddress,
      );

      //  invoking contract(NFT PreSale) method for private buy of nft pre sale
      const mintCost = removeZero(
        saleContractData.mintCost * selectedQuantity.value,
      );
      const buyResult = await buyPrivateSale(
        mintCost,
        selectedQuantity.value,
        walletAddress,
      );

      // creating array of nft token id puchesed by user for creating transition history
      // emmiting value fron contract output
      let tokenIds = [];
      if (Array.isArray(buyResult.events.Transfer)) {
        tokenIds = buyResult.events.Transfer.map(
          (value) => value.returnValues.tokenId,
        );
      } else {
        tokenIds.push(Number(buyResult.events.Transfer.returnValues.tokenId));
      }

      if (buyResult.status) {
        const postData = {
          walletAddress: walletAddress,
          quantity: selectedQuantity.value,
          price: Number(nftSaleData.cost),
          saleType: 'nftPre',
          tokenId: tokenIds,
        };

        // posting data to backend if contract methods return status true
        const postResponse = await portNFTPurchaseData(postData);
        if (postResponse.success) {
          toast.success('Mystery box buy successfully');
          isSaleOnCheck();
          const walletBalance = await getWalletAstTokenBalance(walletAddress);
          dispatch(setBalance(walletBalance));
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

  // const fetchUSDRate = async () => {
  //   if (nftSaleData.cost) {
  //     const price = await convertEtherToUSD(nftSaleData.cost);
  //     setUsdPrice(price);
  //   }
  // };

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
                <h4>{`${400} AST PER NFT`}</h4>
                {/* <h5>{`$${usdPrice}`}</h5> */}
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
                disabled={
                  !isSaleOn || mysteryBoxEligibility <= 0 || balance < 1500
                }
                onClick={buyMysteryBox}
              >
                Buy Now
              </Button>
              <h3 className={styles.eligibility_heading}>
                {!isUserConnected
                  ? 'Connect Your Wallet'
                  : balance < 1500
                  ? 'You are not eligible for this sale.'
                  : mysteryBoxEligibility > 0
                  ? `You are eligible for ${mysteryBoxEligibility} mystery box`
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
