import React from 'react';
import PropTypes from 'prop-types';
import styles from './saleDetailCard.module.scss';
import moment from 'moment';
import Button from '../button';
import { removeZero } from '../../../utils/calculation';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const SaleDetailCard = ({
  data,
  saleStartHandler,
  editSaleDetailsHander,
  admin,
  isSaleOn,
  onClickStopSale,
  buyTokenHandler,
  saleRoundOn,
  tokenSold,
  ethUsdPrice = 0,
}) => {
  return (
    <div
      className={`${styles.sale_detail_card_wrap} ${
        isSaleOn && saleRoundOn ? styles.border_red : ''
      } `}
    >
      <h3 className={styles.sale_heading}>{data.saleType}</h3>
      <div className={styles.row_border}>
        <p className={styles.heading}>Token Price:</p>

        <div style={{ textAlign: 'right' }}>
          <OverlayTrigger
            placement={'auto'}
            overlay={
              <Tooltip>
                <strong>{data?.tokenPrice && Number(data?.tokenPrice)}</strong>
              </Tooltip>
            }
          >
            <p className={styles.value}>{`${
              data?.tokenPrice &&
              removeZero(Number(data?.tokenPrice).toFixed(7))
            } ETH`}</p>
          </OverlayTrigger>
          <OverlayTrigger
            placement={'auto'}
            overlay={
              <Tooltip>
                <strong>
                  {data?.tokenPrice &&
                    removeZero(Number(data?.tokenPrice * ethUsdPrice))}
                </strong>
              </Tooltip>
            }
          >
            <p className={styles.value}>{`${
              data?.tokenPrice &&
              removeZero(Number(data?.tokenPrice * ethUsdPrice).toFixed(7))
            } USD`}</p>
          </OverlayTrigger>
        </div>
      </div>

      <div className={styles.row_border}>
        <p className={styles.heading}>Number Of Token:</p>
        <p className={styles.value}>{`${data.noOfToken} AST`}</p>
      </div>
      {admin && (
        <div className={styles.row_border}>
          <p className={styles.heading}>Token Sold:</p>
          <p className={styles.value}>{tokenSold} AST</p>
        </div>
      )}
      <div className={styles.row_border}>
        <p className={styles.heading}>Start Time:</p>
        <p className={styles.value}>
          {moment(data.startDate).format('DD/MM/YYYY h:mma')}
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
        <p className={styles.heading}>Cap:</p>
        <div style={{ textAlign: 'right' }}>
          <p className={styles.value}>
            {data?.cap && removeZero(Number(data.cap).toFixed(7))} ETH
          </p>
          <p className={styles.value}>{`${
            data?.cap && removeZero(Number(data?.cap * ethUsdPrice).toFixed(7))
          } USD`}</p>
        </div>
      </div>

      <div className={styles.row_border}>
        <p className={styles.heading}>Maximum buy:</p>
        <p className={styles.value}>{data.maxLimit} AST</p>
      </div>
      <div className={styles.row_border}>
        <p className={styles.heading}>Minimum buy:</p>
        <p className={styles.value}>{data.minBuy} AST</p>
      </div>

      <div className={styles.footer_wrap}>
        {admin ? (
          <>
            <Button
              onClick={() =>
                isSaleOn ? onClickStopSale(data.saleType) : saleStartHandler()
              }
            >{`${isSaleOn ? 'Stop' : 'Start'} `}</Button>
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
      </div>
    </div>
  );
};

SaleDetailCard.propTypes = {
  data: PropTypes.object,
  saleStartHandler: PropTypes.func,
  editSaleDetailsHander: PropTypes.func,
};

export default SaleDetailCard;
