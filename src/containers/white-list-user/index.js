import React, { useEffect } from 'react';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../component/common/button';
import styles from './whiteListUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWhiteListUserDataAction } from '../../redux/white-list-user/whiteListAction';
import { setWhiteListUserData } from '../../redux/white-list-user/whiteListSlice';
import WhiteListUserTable from '../../component/ui/white-list-user-table';
import { getContractInstance } from '../../../services/web3/web3ProviderMethods';
import { postWhiteListAddressApi } from '../../../services/api/markle';
import {
  createNewDataForWhiteListTable,
  parseCSVFile,
} from '../../utils/whiteListUser';

const WhiteListUser = () => {
  const { whiteListUserData } = useSelector(
    (state) => state.whiteListUserReducer,
  );

  const { walletAddress } = useSelector((state) => state.walletReducer);
  const dispatch = useDispatch();

  const csvFileInputRef = useRef();

  useEffect(() => {
    dispatch(fetchWhiteListUserDataAction());
  }, []);

  const openCsvFileInput = () => {
    csvFileInputRef.current.click();
  };

  const deleteAddressFromWhiteListArray = (address) => {
    const filterArray = whiteListUserData.filter(
      (item) => item.walletAddress !== address,
    );
    dispatch(setWhiteListUserData(filterArray));
  };

  const resetTableData = () => {
    dispatch(fetchWhiteListUserDataAction());
  };

  const createWhiteListUser = async () => {
    try {
      const web3 = await getContractInstance();
      let newArray = [];

      for (let i = 0; i < whiteListUserData.length; i++) {
        newArray.push(whiteListUserData[i].walletAddress);
      }

      const data = {
        whiteListAddresses: newArray,
      };

      try {
        const response = await postWhiteListAddressApi(data);
        if (response) {
          try {
            const contraactResponse = await web3.methods
              .setMerkleRoot(response)
              .send({ from: walletAddress });
            if (contraactResponse.status) {
              toast.success('WhiteList User Created Successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } catch (error) {
            return error;
          }
        }
      } catch (error) {
        return error;
      }
    } catch (error) {
      return error;
    }
  };

  const csvFileInputOnchange = async (e) => {
    try {
      parseCSVFile(e, afterCsvFileparse);
    } catch (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const afterCsvFileparse = (csvFileData) => {
    const newAddressArrayForWhiteListTable = createNewDataForWhiteListTable(
      csvFileData,
      whiteListUserData,
    );
    dispatch(setWhiteListUserData(newAddressArrayForWhiteListTable));
  };

  return (
    <main className={styles.white_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
          <Button onClick={resetTableData}>Reset</Button>
          <div className={styles.add_btn_wrap}>
            <Button onClick={openCsvFileInput}>Add Private User</Button>
            <input
              onChange={csvFileInputOnchange}
              type="file"
              ref={csvFileInputRef}
              className={styles.csv_File_Input}
            />
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <WhiteListUserTable
          data={whiteListUserData}
          handleDeleteItem={deleteAddressFromWhiteListArray}
        />
      </section>
      <div className={styles.submit_btn_wrap}>
        <Button onClick={createWhiteListUser}>Submit</Button>
      </div>
      <ToastContainer />
    </main>
  );
};

export default WhiteListUser;
