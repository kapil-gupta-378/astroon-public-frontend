import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './zoomView.module.scss';

const ZoomView = ({ show, handleClose, children }) => {
  return (
    <Modal
      show={show}
      size="sm"
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={false}
      className="roadmap_popup"
    >
      <div>
        <Modal.Body scrollable={false}>
          <div className={styles.zoom_view_wrap}>
            <div className={styles.image_wrap}>{children}</div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ZoomView;
