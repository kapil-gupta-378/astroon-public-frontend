import moment from 'moment';
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../button';
import GlobalLoading from '../global-loading';
import TextInput from '../text-input';
import styles from './editSaleDetails.module.scss';
const EditSaleDetailsModal = ({
  handleShow,
  modalClosehandler,
  value,
  setNewSaleDataHandler,
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
        centered
        className={'edit_sale_details_modal'}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
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
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    tokenPrice: e.target.value,
                  }))
                }
              />
              <TextInput
                handleValue={value.cap}
                titleBackground={'#AF3277'}
                title={'Cap'}
                handleType={'number'}
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    cap: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className={styles.input_wrap}>
              <TextInput
                handleValue={moment(value.startDate).format('YYYY-MM-DDTHH:mm')}
                titleBackground={'#AF3277'}
                title={'Start Date'}
                handleType="datetime-local"
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    startDate: e.target.value,
                  }))
                }
              />
              <TextInput
                handleValue={value.endDate}
                titleBackground={'#AF3277'}
                title={'End Date'}
                handleType="number"
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    endDate: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className={styles.input_wrap}>
              <TextInput
                handleValue={value.cliftingTime}
                titleBackground={'#AF3277'}
                title={'Clifting Time'}
                handleType={'number'}
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    cliftingTime: Number(e.target.value),
                  }))
                }
              />
              <TextInput
                handleValue={value.vestingTime}
                titleBackground={'#AF3277'}
                title={'Vesting Time'}
                handleType={'number'}
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    vestingTime: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className={styles.input_wrap}>
              <TextInput
                handleValue={value.buyLimit}
                titleBackground={'#AF3277'}
                title={'Buy Limit Per User'}
                handleOnChange={(e) =>
                  setNewSaleDataHandler((prevValue) => ({
                    ...prevValue,
                    buyLimit: Number(e.target.value),
                  }))
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>

      <GlobalLoading />
    </>
  );
};

EditSaleDetailsModal.propTypes = {};

export default EditSaleDetailsModal;
