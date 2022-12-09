import React from 'react';
import DialogBox from '../dialoag-box';
import GlobalLoading from '../global-loading';

const ClaimTokenDialog = ({
  handleShow,
  leftButtonHandler,
  rightButtonHandler,
  claimingNumber,
}) => {
  return (
    <>
      <DialogBox
        handleShow={handleShow}
        mainHading="Claim Token"
        leftButtonName={'Cancel'}
        rightButtonName={'Claim'}
        leftButtonHandler={leftButtonHandler}
        rightButtonHandler={rightButtonHandler}
      >
        <p style={{ margin: '40px 0px', fontSize: '17px' }}>
          {claimingNumber} Token availble for claim
        </p>
      </DialogBox>
      {<GlobalLoading />}
    </>
  );
};

export default ClaimTokenDialog;
