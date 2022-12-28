import React from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './buyTokenModal.module.scss';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Image from 'next/image';
import downArrowIcon from '../../../../public/assets/images/Arrow_down.svg';
import upArrowIcon from '../../../../public/assets/images/Arrow_Up.svg';
import darkDownArrowIcon from '../../../../public/assets/images/Arrow_down dark.svg';
import GlobalLoading from '../../common/global-loading';
const BuyTokenModal = ({
  modalShow,
  handleFunction,
  modalShowHandler,
  sliderValue,
  sliderOnChange,
  selectedQuantity,
  tokenData,
  lastBuy = 0,
}) => {
  return (
    <>
      <Modal
        size="lg"
        centered
        onHide={() => modalShowHandler(false)}
        show={modalShow}
        className="buy_token_modal_ast_page_bootstrap"
      >
        <Modal.Header closeVariant={'white'} closeButton>
          <Modal.Title>Buy $AST – Astroon Token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.inner_wrap}>
            <div className={styles.statics}>
              <div>
                <h6 className={styles.statics_heading}>Available for sale</h6>
                <h2 className={styles.statics_data}>
                  {tokenData.tokensAvailable}
                </h2>
              </div>
              <div>
                <h6 className={styles.statics_heading}>Price</h6>
                <OverlayTrigger
                  placement={'auto'}
                  overlay={
                    <Tooltip>
                      <strong>
                        {Math.round(
                          parseFloat(tokenData?.rate?.rate * selectedQuantity) *
                            Math.pow(10, 10),
                        ) / Math.pow(10, 10)}
                      </strong>
                    </Tooltip>
                  }
                >
                  <h2 className={styles.statics_data}>
                    {(tokenData?.rate?.rate * selectedQuantity)
                      .toString()
                      .substring(0, 6)}
                    ETH
                  </h2>
                </OverlayTrigger>
              </div>
              <div>
                <h6 className={styles.statics_heading}>Order Quantity</h6>
                {/* <OverlayTrigger
                placement={'auto'}
                overlay={
                  <Tooltip>
                    <strong>{selectedQuantity}</strong>
                  </Tooltip>
                }
              > */}
                <div className={styles.value_wrap}>
                  <h2 className={styles.statics_data}>{selectedQuantity}</h2>
                  <div className={styles.arrow_wrap}>
                    <Image
                      onClick={() => sliderOnChange((value) => value + 1)}
                      src={upArrowIcon}
                      width={15}
                      height={15}
                      alt={'down'}
                    />
                    <Image
                      onClick={() => {
                        if (sliderValue >= 1) {
                          sliderOnChange((value) => value - 1);
                        }
                      }}
                      src={sliderValue >= 1 ? darkDownArrowIcon : downArrowIcon}
                      width={15}
                      height={15}
                      alt={'down'}
                    />
                  </div>
                </div>

                {/* </OverlayTrigger> */}
              </div>
            </div>
            <div className={styles.slider_wrap}>
              <Slider
                min={Number(tokenData?.rate?.minBound)}
                max={Number(tokenData?.rate?.thresHold) - lastBuy}
                step={1}
                value={sliderValue}
                onChange={sliderOnChange}
                activeDotStyle={{ borderColor: 'black' }}
                dotStyle={{ borderColor: 'black', color: 'black' }}
                trackStyle={{ backgroundColor: 'black', height: 10 }}
                railStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  height: 10,
                }}
              />
            </div>
            <div className={styles.buy_btn_wrap}>
              <button className={styles.buy_btn} onClick={handleFunction}>
                Buy Now
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <GlobalLoading />
    </>
  );
};

export default BuyTokenModal;
