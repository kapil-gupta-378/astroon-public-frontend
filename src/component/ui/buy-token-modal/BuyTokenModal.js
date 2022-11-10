import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './buyTokenModal.module.scss';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
const BuyTokenModal = ({
  modalShow,
  handleFunction,
  modalShowHandler,
  sliderValue,
  sliderOnChange,
  quantity,
}) => {
  return (
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
              <h2 className={styles.statics_data}>0.0</h2>
            </div>
            <div>
              <h6 className={styles.statics_heading}>Price</h6>
              <h2 className={styles.statics_data}>0 ETH</h2>
            </div>
            <div>
              <h6 className={styles.statics_heading}>Order Quantity</h6>
              <h2 className={styles.statics_data}>{quantity}</h2>
            </div>
          </div>
          <div className={styles.slider_wrap}>
            <Slider
              min={1}
              max={1000}
              step={1}
              value={sliderValue}
              onChange={sliderOnChange}
              activeDotStyle={{ borderColor: 'black' }}
              dotStyle={{ borderColor: 'black', color: 'black' }}
              trackStyle={{ backgroundColor: 'black', height: 10 }}
              railStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: 10 }}
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
  );
};

export default BuyTokenModal;
