import Image from 'next/image';
import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './zoomView.module.scss';

const ZoomView = ({ imageData, show, handleClose }) => {
  return (
    <Modal
      show={show}
      size="lg"
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={false}
    >
      <div onMouseLeave={handleClose}>
        <Modal.Body scrollable={false}>
          <div className={styles.zoom_view_wrap}>
            <div className={styles.image_wrap}>
              <Image src={imageData} alt="image" layout="responsive" />
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ZoomView;
