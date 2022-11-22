import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';
import Image from 'next/image';

const GalleryPopup = ({ show, handleClose, showURL, fileType }) => {
  return (
    <>
      <Modal
        className="video_popup"
        show={show}
        onHide={handleClose}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fileType == 'video' ? (
            <ReactPlayer
              width="100%"
              height="100%"
              url={showURL}
              controls={true}
            />
          ) : (
            <Image
              src={showURL}
              width="200px"
              height="200px"
              layout="fixed"
              alt="img"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GalleryPopup;
