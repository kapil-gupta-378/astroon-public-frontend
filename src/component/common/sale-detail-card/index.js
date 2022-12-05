import React from 'react';
import PropTypes from 'prop-types';
import styles from './saleDetailCard.module.scss';
import moment from 'moment';
const SaleDetailCard = ({ data }) => {
  return (
    <div className={styles.sale_detail_card_wrap}>
      <h3 className={styles.sale_heading}>{data.saleType}</h3>
      <div className={styles.row_border}>
        <p className={styles.heading}>
          Token Price: <span className={styles.value}>{data.tokenPrice}</span>
        </p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>
          Start Time:{' '}
          <span className={styles.value}>
            {moment(data.startDate).format(' Do MMMM YYYY')}
          </span>
        </p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>
          End Time:{' '}
          <span className={styles.value}>
            {moment(data.endDate).format(' Do MMMM YYYY')}
          </span>
        </p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>
          Cliff Time:
          <span className={styles.value}>{data.cliftingTime} Day</span>
        </p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>
          Vesting Time: <span className={styles.value}>{data.vestingTime}</span>
        </p>
      </div>

      <div className={styles.row_border}>
        <p className={styles.heading}>
          Token Supply: <span className={styles.value}>{data.tokenSupply}</span>
        </p>
      </div>

      <div className={styles.row_border}>
        <p className={styles.heading}>
          Token Release:
          <span className={styles.value}>{data.relaseTokenValue}</span>
        </p>
      </div>
    </div>
  );
};

SaleDetailCard.propTypes = { data: PropTypes.object };

export default SaleDetailCard;
