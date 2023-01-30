import Image from 'next/image';
import React from 'react';
import styles from './astroonToken.module.scss';
import tokenImage from '../../../../public/assets/images/Varlık 1.png';
import planet_image1 from '../../../../public/assets/images/planets/Group 94.svg';
import planet_image2 from '../../../../public/assets/images/planets/Group 92.svg';

const AstroonToken = () => {
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
    </div>
  );
};

export default AstroonToken;
