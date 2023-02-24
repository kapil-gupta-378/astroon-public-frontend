import moment from 'moment';
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../common/button';
import GlobalLoading from '../../common/global-loading';
import TextInput from '../../common/text-input';
import styles from './mysterySaleEdit.module.scss';
const EditMysteryBoxSaleDataModal = ({
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
                handleValue={value.cost}
                titleBackground={'#AF3277'}
                title={'NFT Price (AST)'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      cost: e.target.value,
                    }));
                }}
                min={1}
              />
              <TextInput
                handleValue={value.mintCost}
                titleBackground={'#AF3277'}
                title={'Mint cost (ETH)'}
                handleType={'number'}
                handleOnChange={(e) => {
                  if (e.target.value >= 0)
                    setNewSaleDataHandler((prevValue) => ({
                      ...prevValue,
                      mintCost: e.target.value,
                    }));
                }}
              />
            </div>
            <TextInput
              handleValue={value.maxSupply}
              titleBackground={'#AF3277'}
              title={'Max supply'}
              handleType={'number'}
              handleOnChange={(e) => {
                if (e.target.value >= 0)
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    maxSupply: e.target.value,
                  }));
              }}
            />
            <div className={styles.input_wrap}>
              <TextInput
                min={moment().format('YYYY-MM-DDTHH:mm')}
                handleValue={
                  value.startTime
                    ? moment(value.startTime).format('YYYY-MM-DDTHH:mm')
                    : ''
                }
                titleBackground={'#AF3277'}
                title={'Start time'}
                handleType="datetime-local"
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    startTime: e.target.value,
                  }))
                }
              />
              <TextInput
                handleValue={
                  value.endTime
                    ? moment(value.endTime).format('YYYY-MM-DDTHH:mm')
                    : ''
                }
                titleBackground={'#AF3277'}
                title={'End time'}
                handleType="datetime-local"
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    endTime: e.target.value,
                  }))
                }
                min={
                  value.startTime
                    ? value.startTime
                    : moment().format('YYYY-MM-DDTHH:mm')
                }
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

EditMysteryBoxSaleDataModal.propTypes = {};

export default EditMysteryBoxSaleDataModal;
