import React, { useEffect } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Button from '../../component/common/button';
import styles from './whiteListSeedUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWhiteListSeedUserDataAction } from '../../redux/white-list-seed-user/whiteListSeedAction';
import { setWhiteListSeedUserData } from '../../redux/white-list-seed-user/whiteListSeedSlice';
import { postSeedWhiteListAddressApi } from '../../../services/api/markle';
import {
  createNewDataForWhiteListTable,
  parseCSVFile,
} from '../../utils/whiteListUser';
import WhiteListUserTable from '../../component/ui/white-list-user-table';

const WhiteListSeedUser = () => {
  const { whiteListSeedUserData } = useSelector(
    (state) => state.whiteListSeedUserReducer,
  );

  const dispatch = useDispatch();

  const csvFileInputRef = useRef();

  useEffect(() => {
    dispatch(fetchWhiteListSeedUserDataAction());
  }, []);

  const openCsvFileInput = () => {
    csvFileInputRef.current.click();
  };

  const deleteAddressFromWhiteListArray = (address) => {
    const filterArray = whiteListSeedUserData.filter(
      (item) => item.walletAddress !== address,
    );
    dispatch(setWhiteListSeedUserData(filterArray));
  };

  const resetTableData = () => {
    dispatch(fetchWhiteListSeedUserDataAction());
  };

  const createWhiteListSeedUser = async () => {
    try {
      let newArray = [];

      for (let i = 0; i < whiteListSeedUserData.length; i++) {
        newArray.push(whiteListSeedUserData[i].walletAddress);
      }

      const data = {
        whiteListAddresses: newArray,
      };

      const response = await postSeedWhiteListAddressApi(data);
      if (response) {
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
  };

  const csvFileInputOnchange = async (e) => {
    try {
      parseCSVFile(e, afterCsvFileparse);
    } catch (error) {
      toast.error(error);
    }
  };

  const afterCsvFileparse = (csvFileData) => {
    const newAddressArrayForWhiteListTable = createNewDataForWhiteListTable(
      csvFileData,
      whiteListSeedUserData,
    );
    dispatch(setWhiteListSeedUserData(newAddressArrayForWhiteListTable));
  };

  return (
    <main className={styles.white_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
          <Button onClick={resetTableData}>Reset</Button>
          <div className={styles.add_btn_wrap}>
            <Button onClick={openCsvFileInput}>Add Seed User</Button>
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
          data={whiteListSeedUserData}
          handleDeleteItem={deleteAddressFromWhiteListArray}
        />
      </section>
      <div className={styles.submit_btn_wrap}>
        <Button onClick={createWhiteListSeedUser}>Submit</Button>
      </div>
    </main>
  );
};

export default WhiteListSeedUser;
