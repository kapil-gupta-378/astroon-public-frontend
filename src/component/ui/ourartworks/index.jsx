import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './ourartworks.module.scss';
import cardBackIcon from '../../../../public/assets/images/forword_icon.svg';
import backwordEnable from '../../../../public/assets/images/backwordEnable.svg';
import Button from '../../common/button';
import Slider from 'react-slick';
import OpenseNFTCard from '../../common/opensea-nft-card';
import { getNFTDataApi } from '../../../../services/api/content-management/nft-management';
import { toast } from 'react-toastify';

const OurArtworks = () => {
  const [slider] = useState();
  const [isIndex, setIsIndex] = useState({
    prev: 0,
    next: 0,
    index: 0,
  });
  const [getNFTData, setNFTData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const redirectToNFT = () => {
    router.push('/nft');
  };
  const beforeChange = (prev, next) => {
    setIsIndex((value) => ({ ...value, prev: prev, next: next }));
  };
  const afterChange = (index) => {
    setIsIndex((value) => ({ ...value, index: index }));
  };
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    beforeChange: beforeChange,
    afterChange: afterChange,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const next = () => {
    slider.slickNext();
  };

  const previous = () => {
    slider.slickPrev();
  };

  return (
    <div className={`container ${styles.nft_card_wrap}`}>
      <h3 className={styles.nft_card_heading}>Our Artworks</h3>
      <div className={styles.nft_cards_wrap}>
        <Slider ref={(c) => (slider = c)} {...settings}>
          {getNFTData?.map((data, idx) => (
            <OpenseNFTCard key={idx} nftData={data} loading={isLoading} />
          ))}
        </Slider>
      </div>

      <div className={styles.nft_card_navigation_btn}>
        <button
          className={isIndex.index <= 0 ? styles.back_btn : styles.forword_btn}
          onClick={previous}
        >
          <Image
            src={backwordEnable}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
        <Button kind="text" onClick={redirectToNFT}>
          View More
        </Button>
        <button
          className={isIndex.index >= 13 ? styles.back_btn : styles.forword_btn}
          onClick={next}
        >
          <Image
            src={cardBackIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
      </div>
    </div>
  );
};

export default OurArtworks;
