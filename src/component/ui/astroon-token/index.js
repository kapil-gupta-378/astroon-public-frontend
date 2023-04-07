import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './astroonToken.module.scss';
import tokenImage from '../../../../public/assets/images/Varlık 1.png';
import planet_image1 from '../../../../public/assets/images/planets/Group 94.svg';
import planet_image2 from '../../../../public/assets/images/planets/Group 92.svg';
import SaleDetailCard from '../../common/sale-detail-card';
import { useDispatch, useSelector } from 'react-redux';
import BuyTokenModal from '../buy-token-modal/BuyTokenModal';
import { fetchTokenDataAction } from '../../../redux/token/tokenAction';
import { setGlobalLoading } from '../../../redux/global-loading/globalLoadingSlice';
import { buyToken } from '../../../../services/web3/tokenMothods';
import moment from 'moment';
import { postTokenBuyTransaction } from '../../../../services/api/astroon-token';
import { toast } from 'react-toastify';
import { fetchUserDataAction } from '../../../redux/user/userAction';
import { getWalletAstTokenBalance } from '../../../../services/web3/walletMothods';
import { setBalance } from '../../../redux/persist/wallet/walletSlice';
import { convertWeiToEther } from '../../../utils/currencyMethods';

const AstroonToken = () => {
  const [showBuyTokenModal, setShowBuyTokenModal] = useState(false);
  const [currentSaleLastBuy, setCurrentSaleLastBuy] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [selectedSaleData, setSelectedSaleData] = useState({});
  const [selectedSaleName, setSelectedSaleName] = useState('');
  const { walletAddress, isUserConnected } = useSelector(
    (state) => state.walletReducer,
  );
  const dispatch = useDispatch();
  const { userData, claimingToken } = useSelector((state) => state.userReducer);

  const {
    tokenData,
    seedSale,
    privateSale,
    publicSale,
    saleOnData,
    saleRoundOn,
  } = useSelector((state) => state.tokenReducer);
  const { ethUsdPrice } = useSelector((state) => state.currencyReducer);

  useEffect(() => {
    fetchTokenDataHandler();
  }, []);

  const fetchTokenDataHandler = async () => {
    dispatch(fetchTokenDataAction());
  };

  const buyTokenHandler = async () => {
    const saleId = saleOnData[`${selectedSaleName}Id`];
    try {
      // throw Error when user not connected to website
      if (!isUserConnected) throw new Error('Please connect your wallet');

      if (
        sliderValue < Number(tokenData?.rate?.minBound) &&
        currentSaleLastBuy < Number(tokenData?.rate?.minBound)
      )
        throw new Error(
          `You can not buy less than ${tokenData?.rate?.minBound} token`,
        );

      // throw Error when sale is not on
      if (
        !saleRoundOn.isSeedSaleOn &&
        !saleRoundOn.isPrivateSaleOn &&
        !saleRoundOn.isPublicSaleOn
      )
        throw new Error('Sale is not live');

      // checking private sale is on
      if (tokenData.isPrivateSale) {
        // throw Error when user is not white list user
        if (saleOnData.isPrivate && !userData.whiteListedUser)
          throw new Error('Currently token are available for private user');
        if (saleOnData.isSeed && !userData.seedUser)
          throw new Error('Currently token are available for seed user');
      }

      let tokenTransaction;
      // invoking token buy function if no error
      dispatch(setGlobalLoading(true));
      tokenTransaction = await buyToken(
        selectedSaleName,
        sliderValue,
        convertWeiToEther(selectedSaleData.rate),
        walletAddress,
      );
      const currentDate = moment().format('');
      if (tokenTransaction.status) {
        const data = {
          walletAddress: walletAddress,
          saleRound: saleId,
          buyToken: sliderValue,
          saleType:
            selectedSaleName === 'seed'
              ? 'Seed sale'
              : selectedSaleName === 'private'
              ? 'Private sale'
              : 'Public sale',
          purchaseDate: currentDate,
        };
        await postTokenBuyTransaction(data);
        toast.success('Token Transferred Successfully');
        setShowBuyTokenModal(false);
        dispatch(fetchTokenDataAction());
        dispatch(fetchUserDataAction());
        setSliderValue(1);
        const walletBalance = await getWalletAstTokenBalance(walletAddress);
        dispatch(setBalance(walletBalance));
        dispatch(setGlobalLoading(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(fetchTokenDataAction());
      dispatch(setGlobalLoading(false));
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
          ? error?.message
          : error?.toString().slice(7),
      );
      // toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const closeModal = () => {
    setShowBuyTokenModal(false);
  };

  const openBuyTokenModal = (saleName) => {
    setSelectedSaleName(saleName);
    const allSale = {
      seed: saleRoundOn?.seedSaleDateInContract,
      private: saleRoundOn?.privateSaleDateInContract,
      public: saleRoundOn?.publicSaleDateInContract,
    };
    const selectedSale = allSale[saleName];
    setSelectedSaleData(selectedSale);

    const selectSaleTypeLocal =
      saleName === 'seed'
        ? 'Seed sale'
        : saleName === 'private'
        ? 'Private sale'
        : saleName === 'public'
        ? 'Public sale'
        : '';
    const obj = claimingToken.find((item) => {
      return item.saleType == selectSaleTypeLocal;
    });

    if (obj === undefined) {
      setCurrentSaleLastBuy(0);
    } else if (obj.saleRound === currentSaleId) {
      setCurrentSaleLastBuy(obj.totalBuyToken);
    }

    setSliderValue(
      obj?.totalBuyToken && obj.saleRound === currentSaleId
        ? 1
        : Number(convertWeiToEther(selectedSale?.minBound)),
    );

    const currentSaleId =
      saleName === 'seed'
        ? saleOnData.seedId
        : saleName === 'private'
        ? saleOnData.privateId
        : saleName === 'public'
        ? saleOnData.publicId
        : '';

    if (
      obj?.totalBuyToken >=
        Number(convertWeiToEther(selectedSale?.thresHold)) &&
      obj.saleRound === currentSaleId
    ) {
      toast.error('Your Buy Limit Exceeded');
      return;
    }
    setShowBuyTokenModal(true);
  };

  return (
    <div className={`container ${styles.astroon_token_wrap}`}>
      <h3 className={styles.astroon_token_heading}>ASTROON Token</h3>
      <div className={styles.planet_image1}>
        <Image src={planet_image1} alt="planet" layout="responsive" />
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.left_wrap}>
          <Image src={tokenImage} layout="responsive" alt="animationimage" />
        </div>

        <div className={styles.right_wrap}>
          <p>
            {
              'This adventure is not only for ASTRO and ROON, but for all of us! $AST is a utility token for the community that helps our astronauts get into space. Our utility token is designed to have a limited supply of 25,000,000 units. You can take your place in the ASTROON ecosystem with $AST. '
            }
          </p>
          <div>
            <h3 className={styles.point_heading}>Buy For</h3>

            <p>
              You can get $AST to be used within the ASTROON ecosystem to
              participate in pre-sales, to use in-game purchases and to join our
              community.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.planet_image2}>
        <Image src={planet_image2} alt="planet" layout="responsive" />
      </div>
      <div className={styles.Sale_card_wrap}>
        <div style={{ width: '350px' }}>
          <SaleDetailCard
            data={seedSale}
            key={1}
            isSaleOn={saleRoundOn.isSeedSaleOn}
            buyTokenHandler={() => openBuyTokenModal('seed')}
            saleRoundOn={saleRoundOn.isSeedSaleOn}
            ethUsdPrice={ethUsdPrice}
          />
        </div>
        <div style={{ width: '350px' }}>
          <SaleDetailCard
            data={privateSale}
            key={2}
            isSaleOn={saleRoundOn.isPrivateSaleOn}
            buyTokenHandler={() => openBuyTokenModal('private')}
            saleRoundOn={saleRoundOn.isPrivateSaleOn}
            ethUsdPrice={ethUsdPrice}
          />
        </div>
        <div style={{ width: '350px' }}>
          <SaleDetailCard
            data={publicSale}
            key={3}
            isSaleOn={saleRoundOn.isPublicSaleOn}
            buyTokenHandler={() => openBuyTokenModal('public')}
            saleRoundOn={saleRoundOn.isPublicSaleOn}
            ethUsdPrice={ethUsdPrice}
          />
        </div>
      </div>
      {Object.keys(selectedSaleData).length !== 0 && (
        <BuyTokenModal
          initialToken={
            selectedSaleName === 'seed'
              ? seedSale.noOfToken
              : selectedSaleName === 'private'
              ? privateSale.noOfToken
              : selectedSaleName === 'public'
              ? publicSale.noOfToken
              : 0
          }
          tokenData={selectedSaleData}
          sliderOnChange={setSliderValue}
          sliderValue={sliderValue}
          modalShowHandler={closeModal}
          modalShow={showBuyTokenModal}
          selectedQuantity={sliderValue}
          handleFunction={buyTokenHandler}
          lastBuy={currentSaleLastBuy}
          ethUsdPrice={ethUsdPrice}
        />
      )}
    </div>
  );
};

export default AstroonToken;
