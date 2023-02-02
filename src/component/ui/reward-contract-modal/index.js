import React from 'react';
import DialogBox from '../../common/dialoag-box';
import TextInput from '../../common/text-input';

const RewardContractModal = ({ onChange, value, ...props }) => {
  return (
    <DialogBox {...props}>
      <div style={{ margin: ' 45px auto' }}>
        <TextInput
          handleType={'text'}
          handleName={'reward'}
          handleValue={value}
          handleOnChange={onChange}
          placeHolder={'Enter Address here'}
        />
      </div>
    </DialogBox>
  );
};

export default RewardContractModal;
