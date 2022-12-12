import React from 'react';
import PropTypes from 'prop-types';
import styles from './saleDetailCard.module.scss';
import moment from 'moment';
import Button from '../button';
const SaleDetailCard = ({
  data,
  saleStartHandler,
  editSaleDetailsHander,
  admin,
}) => {
  return (
    <div className={styles.sale_detail_card_wrap}>
      <h3 className={styles.sale_heading}>{data.saleType}</h3>
      <div className={styles.row_border}>
        <p className={styles.heading}>Token Price:</p>
        <p className={styles.value}>{data.tokenPrice}</p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>Start Time:</p>
        <p className={styles.value}>
          {moment(data.startDate).format(' Do MMMM YYYY')}
        </p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>End In:</p>
        <p className={styles.value}>{`${data.endDate} Days `}</p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>Cliff Time:</p>
        <p className={styles.value}>{data.cliftingTime} Days</p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>Vesting Time: </p>
        <p className={styles.value}>{data.vestingTime} Days</p>
      </div>

      <div className={styles.row_border}>
        <p className={styles.heading}>cap:</p>
        <p className={styles.value}>{data.cap}</p>
      </div>

      <div className={styles.row_border}>
        <p className={styles.heading}>Limit Per User:</p>
        <p className={styles.value}>{data.buyLimit}</p>
      </div>

      {admin && (
        <div className={styles.footer_wrap}>
          <Button onClick={saleStartHandler}>Start</Button>
          <Button onClick={editSaleDetailsHander}>Edit</Button>
        </div>
      )}
    </div>
  );
};

SaleDetailCard.propTypes = {
  data: PropTypes.object,
  saleStartHandler: PropTypes.func,
  editSaleDetailsHander: PropTypes.func,
};

export default SaleDetailCard;
