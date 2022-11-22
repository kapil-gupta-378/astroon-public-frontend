import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';

const VideoPopup = ({ show, handleClose, showURL }) => {
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
          <ReactPlayer
            width="100%"
            height="100%"
            url={showURL}
            controls={true}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoPopup;
