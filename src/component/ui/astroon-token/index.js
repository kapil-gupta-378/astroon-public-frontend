import Image from 'next/image';
import React from 'react';
import styles from './astroonToken.module.scss';
import tokenImage from '../../../../public/assets/images/Varlık 1.png';
const AstroonToken = () => {
  return (
    <div className={`container ${styles.astroon_token_wrap}`}>
      <h3 className={styles.astroon_token_heading}>ASTROON Token</h3>
      <div className={styles.content_wrap}>
        <div className={styles.left_wrap}>
          <Image src={tokenImage} layout="responsive" alt="animationimage" />
        </div>

        <div className={styles.right_wrap}>
          <p>
            {
              'Th!s adventure !s not only for ASTRO and ROON, but for all of us! $AST !s a ut!l!ty token for the commun!ty that helps our astronauts get !nto space. Our ut!l!ty token !s des!gned to have a l!m!ted supply of 25,000,000 un!ts. You can take your place !n the ASTROON ecosystem w!th $AST.'
            }
          </p>
          <div>
            <h3 className={styles.point_heading}>Buy For</h3>

            <ol>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroonToken;
