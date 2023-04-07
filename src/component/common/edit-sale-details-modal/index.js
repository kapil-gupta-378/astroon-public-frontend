import moment from 'moment';
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { removeZero } from '../../../utils/calculation';
import Button from '../button';
import GlobalLoading from '../global-loading';
import TextInput from '../text-input';
import styles from './editSaleDetails.module.scss';
const EditSaleDetailsModal = ({
  handleShow,
  modalClosehandler,
  value,
  setNewSaleDataHandler,
  rightButtonHandler,
}) => {
  useEffect(() => {
    return () => {
      setNewSaleDataHandler({
        saleType: '',
        buyLimit: '',
        cap: '',
        cliftingTime: '',
        endDate: '',
        startDate: '',
        tokenPrice: '',
        vestingTime: '',
        noOfToken: '',
        minBuy: '',
        maxLimit: '',
      });
    };
  }, []);
  return (
    <>
      <Modal
        show={handleShow}
        onHide={modalClosehandler}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        className={'edit_sale_details_modal'}
      >
        <Modal.Header closeVariant={'white'} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Sale Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.form_wrap}>
            <div className={styles.input_wrap}>
              <TextInput
                handleValue={value.tokenPrice}
                titleBackground={'#AF3277'}
                title={'Token Price'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      tokenPrice: e.target.value,
                      cap: removeZero(value.noOfToken * e.target.value),
                    }));
                }}
                isRequired={true}
              />
              <TextInput
                handleValue={value.noOfToken}
                titleBackground={'#AF3277'}
                title={'Number oF Token'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      noOfToken: e.target.value,
                      cap: removeZero(value.tokenPrice * e.target.value),
                    }));
                }}
                min={1}
                isRequired={true}
              />
            </div>
            <TextInput
              readOnly={true}
              handleValue={removeZero(value.tokenPrice * value.noOfToken)}
              titleBackground={'#AF3277'}
              title={'Cap In ETH'}
              handleType={'number'}
            />
            <div className={styles.input_wrap}>
              <TextInput
                handleValue={
                  value.startDate
                    ? moment(value.startDate).format('YYYY-MM-DDTHH:mm')
                    : ''
                }
                titleBackground={'#AF3277'}
                title={'Start Date'}
                handleType="datetime-local"
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    startDate: e.target.value,
                  }))
                }
                isRequired={true}
              />
              <TextInput
                handleValue={value.endDate}
                titleBackground={'#AF3277'}
                title={'End In (Days)'}
                handleType="number"
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      endDate: e.target.value,
                    }));
                }}
                min={1}
                isRequired={true}
              />
            </div>
            <div className={styles.input_wrap}>
              <TextInput
                handleValue={value.cliftingTime}
                titleBackground={'#AF3277'}
                title={'Clifting Time'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      cliftingTime: e.target.value,
                    }));
                }}
                min={1}
                isRequired={true}
              />
              <TextInput
                handleValue={value.vestingTime}
                titleBackground={'#AF3277'}
                title={'Vesting Time'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      vestingTime: e.target.value,
                    }));
                }}
                min={4}
                isRequired={true}
              />
            </div>
            <div className={styles.input_wrap}>
              <TextInput
                handleValue={value.minBuy}
                titleBackground={'#AF3277'}
                title={'Minimum Buy Limit Per User'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      minBuy: e.target.value,
                    }));
                }}
                min={1}
                isRequired={true}
              />
              <TextInput
                handleValue={value.maxLimit}
                titleBackground={'#AF3277'}
                title={'Maximum Buy Limit Per User'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      maxLimit: e.target.value,
                    }));
                }}
                min={1}
                isRequired={true}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={rightButtonHandler} kind={'white_btn'}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <GlobalLoading />
    </>
  );
};

EditSaleDetailsModal.propTypes = {};

export default EditSaleDetailsModal;
