import React from 'react';
import Button from '../../common/Button';
import style from './Whitepaper.module.scss';

function Whitepaper() {
  return (
    <div className={style.whitepaper_wrp}>
      <div className={`${style.whitepaper_content} container-fluid`}>
        <h1>Whitepaper</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          tristique consectetur placerat tortor.
        </p>
        <Button data-content="whitepaper" kind="download">
          Download
        </Button>
      </div>
    </div>
  );
}

export default Whitepaper;
