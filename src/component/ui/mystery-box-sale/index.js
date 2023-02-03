import moment from 'moment';
import React from 'react';
import Button from '../../common/button';
import styles from './mysteryBoxSale.module.scss';

const MysteryBoxSale = ({
  data,
  saleStartHandler,
  editSaleDetailsHander,
  admin,
  isSaleOn,
  uploadCsvHandler,
  buyTokenHandler,
  saleRoundOn,
  revealHandler,
  isRevealed,
  saleContractData,
  csvInputRef,
}) => {
  const openCsvFileInput = () => {
    csvInputRef.current.click();
  };
  return (
    <div
      className={`${styles.sale_detail_card_wrap} ${
        isSaleOn && saleRoundOn ? styles.border_red : ''
      } `}
    >
      <h3 className={styles.sale_heading}>{'Mystery box sale'}</h3>
      <div className={styles.row_border}>
        <p className={styles.heading}>NFT Price:</p>
        <p className={styles.value}>{data.cost}AST</p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>Mint cost:</p>
        <p className={styles.value}>{data.mintCost}</p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>Max supply:</p>
        <p className={styles.value}>{data.maxSupply}</p>
      </div>
      {admin && (
        <div className={styles.row_border}>
          <p className={styles.heading}>NFT Sold:</p>
          <p className={styles.value}>
            {data.maxSupply - saleContractData.remainingSupply}
          </p>
        </div>
      )}
      <div className={styles.row_border}>
        <p className={styles.heading}>Start Time:</p>
        <p className={styles.value}>
          {moment(data.startTime).format('DD/MM/YYYY h:mma')}
        </p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>End Time:</p>
        <p className={styles.value}>
          {moment(data.endTime).format('DD/MM/YYYY h:mma')}
        </p>
      </div>
      <div className={styles.footer_wrap}>
        {admin ? (
          <>
            <Button disabled={isSaleOn} onClick={saleStartHandler}>{`${
              isSaleOn ? 'Sale is on' : 'Start'
            } `}</Button>
            <Button disabled={isSaleOn} onClick={editSaleDetailsHander}>
              Edit
            </Button>
          </>
        ) : (
          <Button
            disabled={
              isSaleOn === true ? (saleRoundOn === true ? false : true) : true
            }
            onClick={buyTokenHandler}
          >
            {'Buy $AST'}
          </Button>
        )}
        {admin && <Button onClick={openCsvFileInput}>Upload Data</Button>}
        {admin && (
          <Button onClick={revealHandler}>
            {isRevealed ? 'NFT Revealed' : 'Reveal NFT'}
          </Button>
        )}
      </div>
      <input
        className={styles.mysteryBoxCsvFile}
        type={'file'}
        onChange={uploadCsvHandler}
        ref={csvInputRef}
      />
    </div>
  );
};

export default MysteryBoxSale;
