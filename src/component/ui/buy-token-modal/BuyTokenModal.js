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
import { convertWeiToEther } from '../../../utils/currencyMethods';
const BuyTokenModal = ({
  modalShow,
  initialToken,
  handleFunction,
  modalShowHandler,
  sliderValue,
  sliderOnChange,
  selectedQuantity,
  tokenData,
  lastBuy = 0,
  ethUsdPrice = 0,
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
                  {+initialToken - +convertWeiToEther(tokenData?.tokenSold)} AST
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
                          parseFloat(
                            convertWeiToEther(tokenData?.rate) *
                              selectedQuantity,
                          ) * Math.pow(10, 10),
                        ) / Math.pow(10, 10)}
                      </strong>
                    </Tooltip>
                  }
                >
                  <h2 className={styles.statics_data}>
                    {`${(convertWeiToEther(tokenData?.rate) * selectedQuantity)
                      .toString()
                      .substring(0, 6)} ETH`}
                  </h2>
                </OverlayTrigger>
                {/* USD price  */}
                <OverlayTrigger
                  placement={'auto'}
                  overlay={
                    <Tooltip>
                      <strong>
                        {Math.round(
                          parseFloat(
                            convertWeiToEther(tokenData?.rate) *
                              selectedQuantity *
                              ethUsdPrice,
                          ) * Math.pow(10, 10),
                        ) / Math.pow(10, 10)}
                      </strong>
                    </Tooltip>
                  }
                >
                  <h2 className={styles.statics_data_USD}>
                    {`${(
                      convertWeiToEther(tokenData?.rate) *
                      selectedQuantity *
                      ethUsdPrice
                    )
                      .toString()
                      .substring(0, 6)} USD`}
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
                  <h2 className={styles.statics_data}>
                    {selectedQuantity} AST
                  </h2>
                  <div className={styles.arrow_wrap}>
                    <Image
                      onClick={() =>
                        sliderOnChange((value) => {
                          if (
                            +value + 1 <=
                            Number(convertWeiToEther(tokenData?.thresHold))
                          ) {
                            return +value + 1;
                          } else {
                            return +value;
                          }
                        })
                      }
                      src={upArrowIcon}
                      width={15}
                      height={15}
                      alt={'down'}
                    />
                    <Image
                      onClick={() => {
                        sliderOnChange((value) => {
                          if (
                            sliderValue >= 1 &&
                            sliderValue - 1 >
                              convertWeiToEther(tokenData.minBound)
                          ) {
                            return +value - 1;
                          } else {
                            return +convertWeiToEther(tokenData.minBound);
                          }
                        });
                      }}
                      src={
                        sliderValue >= 1 &&
                        sliderValue - 1 >= convertWeiToEther(tokenData.minBound)
                          ? darkDownArrowIcon
                          : downArrowIcon
                      }
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
                disabled={
                  Number(convertWeiToEther(tokenData?.thresHold)) === lastBuy
                }
                min={Number(
                  lastBuy ? 1 : +convertWeiToEther(tokenData?.minBound),
                )}
                max={Number(convertWeiToEther(tokenData?.thresHold)) - lastBuy}
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
                handleStyle={{
                  height: 20,
                  width: 20,
                  marginLeft: '-8px',
                  marginTop: '-5px',
                  borderColor: 'black',
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
