import React from 'react';
import Button from '../../common/button';
import style from './whitepaper.module.scss';

function Whitepaper() {
  return (
    <div className={style.whitepaper_wrp}>
      <div className={`${style.whitepaper_content} container-fluid`}>
        <h1>Whitepaper</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          tristique consectetur placerat tortor.
        </p>
        <Button data-content="viewall" kind="text">
          Download
        </Button>
      </div>
    </div>
  );
}

export default Whitepaper;
