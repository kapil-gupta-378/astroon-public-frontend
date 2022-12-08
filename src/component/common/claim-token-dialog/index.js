import React from 'react';
import DialogBox from '../dialoag-box';
import GlobalLoading from '../global-loading';

const ClaimTokenDialog = ({
  handleShow,
  leftButtonHandler,
  rightButtonHandler,
  loading,
}) => {
  return (
    <DialogBox
      handleShow={handleShow}
      mainHading="Claim Token"
      leftButtonName={'Cancel'}
      rightButtonName={'Claim'}
      leftButtonHandler={leftButtonHandler}
      rightButtonHandler={rightButtonHandler}
    >
      <p style={{ margin: '40px 0px', fontSize: '17px' }}>
        4 Token availble for claim
      </p>
      {loading && <GlobalLoading />}
    </DialogBox>
  );
};

export default ClaimTokenDialog;
