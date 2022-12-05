import React, { useEffect } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Button from '../../component/common/button';
import styles from './whiteListUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWhiteListUserDataAction } from '../../redux/white-list-user/whiteListAction';
import { setWhiteListUserData } from '../../redux/white-list-user/whiteListSlice';
import WhiteListUserTable from '../../component/ui/white-list-user-table';
import { postWhiteListAddressApi } from '../../../services/api/markle';
import {
  createNewDataForWhiteListTable,
  parseCSVFile,
} from '../../utils/whiteListUser';

const WhiteListUser = () => {
  const { whiteListUserData } = useSelector(
    (state) => state.whiteListUserReducer,
  );

  const dispatch = useDispatch();

  const csvFileInputRef = useRef();

  useEffect(() => {
    dispatch(fetchWhiteListUserDataAction());
  }, []);

  const openCsvFileInput = () => {
    csvFileInputRef.current.click();
  };

  // funtion for delete address from array
  const deleteAddressFromWhiteListArray = (address) => {
    const filterArray = whiteListUserData.filter(
      (item) => item.walletAddress !== address,
    );
    dispatch(setWhiteListUserData(filterArray));
  };

  // funtion for reset table data with old user
  const resetTableData = () => {
    dispatch(fetchWhiteListUserDataAction());
  };

  // for create new whitelist user
  const createWhiteListUser = async () => {
    try {
      let newArray = [];

      for (let i = 0; i < whiteListUserData.length; i++) {
        newArray.push(whiteListUserData[i].walletAddress);
      }

      const data = {
        whiteListAddresses: newArray,
      };

      try {
        const response = await postWhiteListAddressApi(data);
        if (response.success) {
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
    } catch (error) {
      return error;
    }
  };

  // for handling csv file by UI
  const csvFileInputOnchange = async (e) => {
    try {
      // user global funtion for parsing csv file
      parseCSVFile(e, afterCsvFileparse);
    } catch (error) {
      toast.error(error);
    }
  };

  // creating new data with old user data and checking invalid address
  const afterCsvFileparse = (csvFileData) => {
    //  function for checking invalid address
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
    </main>
  );
};

export default WhiteListUser;
