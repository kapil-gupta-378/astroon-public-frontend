import Image from 'next/image';
import React from 'react';
import Button from '../../common/button';
import style from './whitepaper.module.scss';
import image_not_found_image from '../../../../public/assets/images/gallery_management.svg';

function Whitepaper() {
  return (
    <div className={style.whitepaper_wrp}>
      <div className={`${style.whitepaper_content} container-fluid`}>
        <h3>Whitepaper</h3>
        <div className={style.whitepaper_data}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tristique consectetur placerat tortor. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent tristique consectetur placerat
            tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Praesent tristique consectetur placerat tortor. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Praesent tristique
            consectetur placerat tortor.
          </p>
          <Image
            src={image_not_found_image}
            width={250}
            height={250}
            layout={'fixed'}
            alt="dummy_image"
          />
        </div>

        <Button data-content="Download" kind="download">
          Download
        </Button>
      </div>
    </div>
  );
}

export default Whitepaper;
