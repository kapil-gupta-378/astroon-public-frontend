import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from './coming-soon-modal.module.scss';
const ComingSoonModal = ({ ...props }) => {
  const [changeImage, setChangeImage] = useState(false);
  useEffect(() => {
    const soonInterval = setInterval(() => {
      setChangeImage((value) => !value);
    }, 1000);
    return () => {
      clearInterval(soonInterval);
    };
  }, []);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="coming_soon_modal"
    >
      <Modal.Body>
        <div
          className={`${styles.coming_soon} ${
            changeImage && styles.astroon_soon
          }`}
        ></div>
      </Modal.Body>
    </Modal>
  );
};

export default ComingSoonModal;
