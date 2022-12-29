import Image from 'next/image';
import React from 'react';
import styles from './mysteryBox.module.scss';
import mesteryBoxImage from '../../../../public/assets/images/mystery-box-image.png';
import Button from '../../common/button';
import FormSelect from '../../../component/common/form-select/';
const MysteryBox = () => {
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
          {'0.207 ETH'} <span>{'$281.21'}</span>
        </h4>
      </div>
      <div className={styles.select_wrap}>
        <FormSelect label={'Quantity'} titleBackground={'rgb(11 11 50)'} />
      </div>
      <Button>Buy Now</Button>
    </div>
  );
};

export default MysteryBox;
