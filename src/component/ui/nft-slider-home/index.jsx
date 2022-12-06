import React, { useEffect, useState } from 'react';
import styles from './nftSlider.module.scss';
import { getNFTDataApi } from '../../../../services/api/content-management/nft-management';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import CollectionCard from '../../common/collection-card';
const NftSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  const [getNFTData, setNFTData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNFTFinalData();
  }, []);

  const getNFTFinalData = async () => {
    const res = await getNFTDataApi();
    if (res.success) {
      setNFTData(res.data.rows);
      setIsLoading(false);
    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className={styles.nft_slider_home}>
          <Slider {...settings}>
            {getNFTData.map((nft) => {
              return (
                <CollectionCard
                  key={nft.id}
                  nftdata={nft.nft.image_thumbnail_url}
                />
              );
            })}
          </Slider>
          <Slider {...settings}>
            {getNFTData.map((nft) => {
              return (
                <CollectionCard
                  key={nft.id}
                  nftdata={nft.nft.image_thumbnail_url}
                />
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className={styles.spinner_wrap}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default NftSlider;
