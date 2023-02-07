import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import avatar from '../../../public/assets/images/profile-avatar.svg';
import ethIconWhite from '../../../public/assets/images/ethereum-icon-white.svg';
import NFTCard from '../../component/common/nft-card';
import { useRouter } from 'next/router';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { fetchUserDataAction } from '../../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCoverImage,
  updateProfileImage,
  updateUserData,
} from '../../redux/user/userSlice';
import {
  updataUserProfileImageApi,
  updateUserDataApi,
} from '../../../services/api/user';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import BuyTokenModal from '../../component/ui/buy-token-modal/BuyTokenModal';
import { fetchTokenDataAction } from '../../redux/token/tokenAction';
import { setGlobalLoading } from '../../redux/global-loading/globalLoadingSlice';
import { buyToken, claimToken } from '../../../services/web3/tokenMothods';
import { getWalletAstTokenBalance } from '../../../services/web3/walletMothods';
import { setBalance } from '../../redux/persist/wallet/walletSlice';
import ClaimTokenDialog from '../../component/common/claim-token-dialog';
import {
  postTokenBuyTransaction,
  postTokenClaimTransaction,
} from '../../../services/api/astroon-token';
import TokenBuyHistory from '../../component/ui/tokenBuyHistory';
import moment from 'moment';
import { fetchWalletBalance } from '../../redux/persist/wallet/walletAction';
import MysteryBoxBuyHistory from '../../component/ui/mystery-box-buy-history';
import { fetchNftPreSaleData } from '../../redux/nft-sale/nftSaleAction';
import NFTRewardModal from '../../component/ui/nft-reward-modal';
import { claimReward } from '../../../services/web3/nftReward';
import { postNFTRewardClaimApi } from '../../../services/api/nftPreSale';
import { convertWeiToEther } from '../../utils/currencyMethods';
const Profile = () => {
  const {
    userData,
    claimingToken,
    tokenBuyHistory,
    nftBuyHistory,
    nftRewardData,
    userDataLoading,
    nftRewardCount,
    claimedReward,
  } = useSelector((state) => state.userReducer);

  const { isNftSaleRevealed } = useSelector((state) => state.nftSaleReducer);
  const [uploadProfileImage, setUploadProfileImage] = useState(false);
  const [uploadCoverImage, setUploadCoverImage] = useState(false);
  const [showBuyTokenModal, setShowBuyTokenModal] = useState(false);
  const [showClaimTokenModal, setShowCliamTokenModal] = useState(false);
  const [currentSaleLastBuy, setCurrentSaleLastBuy] = useState(0);

  const [historyModal, setHistoryModal] = useState(false);
  const [nftHistoryModal, setNftHistoryModal] = useState(false);
  const [nftRewardModal, setNftRewardModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const { isUserConnected, walletAddress } = useSelector(
    (state) => state.walletReducer,
  );
  const { tokenData, saleOnData, saleRoundOn } = useSelector(
    (state) => state.tokenReducer,
  );
  const { globalLoading } = useSelector((state) => state.globalLoadingReducer);

  const route = useRouter();
  const dispatch = useDispatch();
  const { address } = route.query;
  const imageInputImageRef = useRef();
  const coverImageInputImageRef = useRef();
  useEffect(() => {
    fetchTokenData();
    fetchUserData();
    dispatch(fetchNftPreSaleData());
  }, []);

  useEffect(() => {
    if (!isUserConnected) {
      toast.error('Please connect your wallet');
      route.push('/');
    }
  }, [isUserConnected]);

  useEffect(() => {
    // finding data of last buy for user in AST token last sale and setting it into state (setCurrentSaleLastBuy)
    if (tokenData?.saleData?.saleRound && claimingToken) {
      const obj = claimingToken.find((item) => {
        return item.saleRound == tokenData?.saleData?.saleRound;
      });

      if (obj === undefined) {
        setCurrentSaleLastBuy(0);
      } else {
        setCurrentSaleLastBuy(obj.totalBuyToken);
      }
    }
  }, [tokenData, claimingToken]);

  const fetchTokenData = async () => {
    dispatch(fetchTokenDataAction());
  };

  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  const fetchUserData = () => {
    dispatch(fetchUserDataAction(walletAddress));
  };

  const updateState = (e) => {
    dispatch(updateUserData({ name: e.target.name, value: e.target.value }));
  };

  const buyTokenHandler = async () => {
    try {
      if (!isUserConnected) {
        // throw Error when user not connected to website
        throw new Error('Please connect your wallet');
      }

      // throw Error when user buying amount less than limit
      if (
        sliderValue < Number(tokenData?.rate?.minBound) &&
        currentSaleLastBuy < Number(tokenData?.rate?.minBound)
      )
        throw new Error(
          `You can not buy token less than ${tokenData?.rate?.minBound}`,
        );

      if (!tokenData.isPrivateSale && !tokenData.isPublicSale) {
        // throw Error when sale is not on
        throw new Error('Sale is not live');
      }

      let tokenTransaction;
      // checking which sale is on
      if (tokenData.isPrivateSale) {
        // throw Error when user is not white list user

        if (saleOnData.isPrivate && !userData.whiteListedUser)
          throw new Error('Currently token are availble for private user');
        if (saleOnData.isSeed && !userData.seedUser)
          throw new Error('Currently token are availble for seed user');
      }
      // invoking token buy funtion if no error
      dispatch(setGlobalLoading(true));
      tokenTransaction = await buyToken(
        sliderValue,
        tokenData.rate.rate,
        walletAddress,
        tokenData,
      );
      const currentDate = moment().format('');

      if (tokenTransaction.status) {
        const data = {
          walletAddress: walletAddress,
          saleRound: tokenData.saleData.saleRound,
          buyToken: sliderValue,
          saleType: tokenData.saleData.isSeed
            ? 'Seed sale'
            : tokenData.saleData.isPrivate
            ? 'Private sale'
            : 'Public sale',
          purchaseDate: currentDate,
        };
        await postTokenBuyTransaction(data);
        toast.success('Token Transfered Successfully');
        setShowBuyTokenModal(false);
        fetchTokenData();
        fetchUserData();
        const walletBalance = await getWalletAstTokenBalance(walletAddress);
        dispatch(setBalance(walletBalance));
        dispatch(setGlobalLoading(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(fetchTokenDataAction());
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  async function updataProfile(e) {
    try {
      e.preventDefault();
      dispatch(setGlobalLoading(true));

      let profileImageUploadResponse;
      let coverImageUploadResponse;

      if (uploadProfileImage) {
        let body = new FormData();
        body.append('file', userData.profileImage);
        profileImageUploadResponse = await updataUserProfileImageApi(body);
      }
      if (uploadCoverImage) {
        let body = new FormData();
        body.append('file', userData.coverImage);
        coverImageUploadResponse = await updataUserProfileImageApi(body);
      }
      const paramsObject = {
        displayName: userData.displayName,
        customUrl: userData.customUrl,
        email: userData.email,
        bio: userData.bio,
        coverImage: coverImageUploadResponse?.fileName,
        profileImage: profileImageUploadResponse?.fileName,
      };
      const response = await updateUserDataApi(paramsObject);
      if (response.success) {
        toast.success(response.message);
        route.push(`/user-profile/${address}`);
        dispatch(setGlobalLoading(false));
      }
    } catch (error) {
      dispatch(setGlobalLoading(false));

      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
          ? error?.message
          : error?.toString().slice(7),
      );
    }
  }

  const updateProfileImageState = (e) => {
    if (e.target.files[0]) {
      setUploadProfileImage(true);
      dispatch(updateProfileImage(e.target.files[0]));
    }
  };

  const updateCoverImageState = (e) => {
    try {
      var _URL = window.URL || window.webkitURL;
      if (e.target.files[0]) {
        const ev = e.currentTarget.files;
        if (ev) {
          if (ev.length === 0) {
            return;
          }

          var img = document.createElement('img');

          img.onload = function () {
            try {
              if (img.width >= 820 && img.height >= 240) {
                setUploadCoverImage(true);
                dispatch(updateCoverImage(e.target.files[0]));
              } else {
                throw new Error('Image width and height should be 820X20');
              }
            } catch (error) {
              toast.error(
                error.message ? error.message : error.toString().slice(7),
              );
            }
          };

          img.src = URL.createObjectURL(e.target.files[0]);
        }
      }
    } catch (error) {
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const openDisplayImageInput = () => {
    imageInputImageRef.current.click();
  };

  const openCoverImageInput = () => {
    coverImageInputImageRef.current.click();
  };

  const claimTokenHandler = async (remainingClaim, saleRound) => {
    try {
      // throw Error when user not connected to website
      if (!isUserConnected) throw new Error('Please connect your wallet');
      dispatch(setGlobalLoading(true));
      const claimResponse = await claimToken(walletAddress, saleRound);
      if (claimResponse.status) {
        toast.success('Token claim successfully');
        const currentTime = moment().toString();
        const paramsData = {
          walletAddress: walletAddress,
          saleRound: saleRound,
          claimedToken: remainingClaim,
          claimedDate: currentTime,
        };
        await postTokenClaimTransaction(paramsData);
        fetchTokenData();
        fetchUserData();
        dispatch(fetchWalletBalance(walletAddress));
        dispatch(setGlobalLoading(false));
      }
    } catch (error) {
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const handleNFTRewardClaim = async () => {
    try {
      dispatch(setGlobalLoading(true));
      const res = await claimReward(walletAddress);
      if (res.status) {
        const data = {
          walletAddress: walletAddress,
          claimedReward: convertWeiToEther(nftRewardCount),
          claimedDate: moment().toString(),
        };
        await postNFTRewardClaimApi(data);
        toast.success('Reward claim successfully');
      }
      dispatch(setGlobalLoading(false));
    } catch (error) {
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  return (
    <>
      {isUserConnected ? (
        <main className={`container ${styles.profile_wrap}`}>
          <section>
            <div className={styles.user_profile_image_wrap}>
              <div
                className={`${styles.user_cover_image} ${
                  !userData.coverImage && styles.cover_background
                }`}
              >
                <div
                  onClick={openDisplayImageInput}
                  className={styles.profile_image}
                >
                  <Image
                    loader={ImageLoader}
                    src={
                      userData.profileImage
                        ? typeof userData.profileImage === 'string'
                          ? userData.profileImage
                          : URL.createObjectURL(userData.profileImage)
                        : avatar
                    }
                    alt="avatar"
                    width={80}
                    height={80}
                  />

                  <input
                    ref={imageInputImageRef}
                    className={styles.displayname_input}
                    type="file"
                    accept="image/*"
                    name="profileImage"
                    onChange={updateProfileImageState}
                  />
                </div>
                {userData.coverImage && (
                  <Image
                    loader={ImageLoader}
                    src={
                      userData.coverImage
                        ? typeof userData.coverImage === 'string'
                          ? userData.coverImage
                          : URL.createObjectURL(userData.coverImage)
                        : avatar
                    }
                    layout="fill"
                    alt="coverimage"
                    data-testid="cover_image"
                  />
                )}
                <button
                  onClick={() =>
                    route.pathname === '/user-profile/[address]'
                      ? route.push(`/edit-user-profile/${address}`)
                      : openCoverImageInput()
                  }
                  className={styles.Update_image_btn}
                >
                  {route.pathname === '/user-profile/[address]'
                    ? 'Update Profile'
                    : 'Update Cover Image'}

                  <input
                    ref={coverImageInputImageRef}
                    className={styles.coverName_input}
                    type="file"
                    accept="image/*"
                    name="coverImage"
                    onChange={updateCoverImageState}
                  />
                </button>
              </div>
              <div className={styles.btn_wrap}>
                <OverlayTrigger
                  placement={'auto'}
                  overlay={
                    <Tooltip>
                      <strong>{address}</strong>
                    </Tooltip>
                  }
                >
                  <div className={styles.wallet_address}>
                    <Image
                      src={ethIconWhite}
                      width={13}
                      height={13}
                      alt="eth"
                    />
                    {`${address ? `${address.slice(0, 9)}...` : ''}`}
                  </div>
                </OverlayTrigger>
                {route.pathname === '/user-profile/[address]' && (
                  <>
                    {(saleOnData.isPrivate ||
                      saleOnData.isSeed ||
                      saleOnData.isPublic) &&
                      saleRoundOn && (
                        <div
                          onClick={() => route.push('/ast')}
                          className={styles.wallet_address}
                        >
                          Buy Token
                        </div>
                      )}
                    <div
                      onClick={() => setShowCliamTokenModal(true)}
                      className={styles.wallet_address}
                    >
                      Claim Token
                    </div>
                    <div
                      onClick={() => setHistoryModal(true)}
                      className={styles.wallet_address}
                    >
                      Token History
                    </div>
                    {nftBuyHistory.length !== 0 && (
                      <div
                        onClick={() => setNftHistoryModal(true)}
                        className={styles.wallet_address}
                      >
                        NFT History
                      </div>
                    )}
                    {userData.assets.length !== 0 && (
                      <div
                        onClick={() => setNftRewardModal(true)}
                        className={styles.wallet_address}
                      >
                        NFT Reward
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
          {route.pathname === '/user-profile/[address]' && (
            <section className={styles.user_nft_wrapper}>
              <h3 className={styles.section_headeing}>My NFT’s</h3>
              {userData.assets.length !== 0 ? (
                <div className={styles.nft_list}>
                  {userData.assets &&
                    userData.assets.map((nftData, idx) => (
                      <NFTCard nftData={nftData} key={idx} />
                    ))}
                </div>
              ) : (
                <div className={styles.data_not_found}>
                  <h3>Data not found</h3>
                </div>
              )}
            </section>
          )}
          {route.pathname === '/edit-user-profile/[address]' && (
            <form onSubmit={updataProfile}>
              <section className={styles.user_edit_profile_form_wrap}>
                <TextInput
                  handleName={'displayName'}
                  title={'Display Name'}
                  placeHolder="Enter your display name"
                  inputHeight={'63px'}
                  handleValue={userData.displayName}
                  handleOnChange={(e) => updateState(e)}
                  titleBackground={'#3C1D74'}
                  isRequired={true}
                />
                {/* <TextInput
                  handleName={'customUrl'}
                  title={'Custom URL'}
                  placeHolder="astroon.abc/enter your custom url"
                  inputHeight={'63px'}
                  handleValue={userData.customUrl}
                  handleOnChange={(e) => updateState(e)}
                  titleBackground={'#3C1D74'}
                /> */}
                <TextInput
                  handleName={'email'}
                  handleType={'email'}
                  titleBackground={'#3C1D74'}
                  title={'Email Address'}
                  placeHolder="Enter your email address"
                  inputHeight={'63px'}
                  handleValue={userData.email}
                  handleOnChange={(e) => updateState(e)}
                  isRequired={true}
                />
                <TextInput
                  title={'Bio'}
                  handleName={'bio'}
                  placeHolder="Write a brief description about yourself"
                  inputHeight={'120px'}
                  textarea={true}
                  titleBackground={'#3C1D74'}
                  handleValue={userData.bio}
                  handleOnChange={(e) => updateState(e)}
                  isRequired={true}
                />
                <div className={styles.submit_btn}>
                  <Button disabled={globalLoading} type="submit">
                    Submit
                  </Button>
                </div>
              </section>
            </form>
          )}
          <BuyTokenModal
            tokenData={tokenData}
            sliderOnChange={setSliderValue}
            sliderValue={sliderValue}
            modalShowHandler={setShowBuyTokenModal}
            modalShow={showBuyTokenModal}
            selectedQuantity={sliderValue}
            handleFunction={buyTokenHandler}
            lastBuy={currentSaleLastBuy}
          />
          <ClaimTokenDialog
            data={claimingToken}
            handleShow={showClaimTokenModal}
            leftButtonHandler={() => setShowCliamTokenModal(false)}
            claimHandler={claimTokenHandler}
            claimingNumber={claimingToken}
            loading={userDataLoading}
          />
          <TokenBuyHistory
            data={tokenBuyHistory}
            handleShow={historyModal}
            leftButtonHandler={() => setHistoryModal(false)}
            claimingNumber={claimingToken}
            lastBuy={currentSaleLastBuy}
            loading={userDataLoading}
          />
          <MysteryBoxBuyHistory
            data={nftBuyHistory}
            handleShow={nftHistoryModal}
            leftButtonHandler={() => setNftHistoryModal(false)}
            reveal={isNftSaleRevealed}
            loading={userDataLoading}
          />
          <NFTRewardModal
            handleShow={nftRewardModal}
            leftButtonHandler={() => setNftRewardModal(false)}
            data={nftRewardData.data}
            loading={userDataLoading}
            claimDisabled={Number(nftRewardCount) === 0 ? true : false}
            claimHandler={handleNFTRewardClaim}
            remainingCliam={nftRewardCount}
            totalReward={nftRewardData.total}
            claimedReward={claimedReward}
          />
        </main>
      ) : (
        <div style={{ height: '100vh' }}></div>
      )}
    </>
  );
};

export default Profile;
