import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../component/common/button';
import styles from './whiteListSeedUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWhiteListSeedUserDataAction } from '../../redux/white-list-seed-user/whiteListSeedAction';
import { setWhiteListSeedUserData } from '../../redux/white-list-seed-user/whiteListSeedSlice';
import WhiteListSeedUserTable from '../../component/ui/white-list-seed-user-table';
import { getContractInstance } from '../../../services/web3/web3ProviderMethods';
import Web3 from 'web3';
import { postSeedWhiteListAddressApi } from '../../../services/api/markle';
import { csvFileHandler } from '../../utils/whiteListUser';

const WhiteListSeedUser = () => {
  // This state will store the parsed data
  const [, setRawCsvFileData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [, setError] = useState('');

  // It will store the file uploaded by the user
  const [, setCsvFileParseData] = useState([]);
  // Allowed extensions for input file
  const allowedExtensions = ['csv'];

  const { whiteListUserData } = useSelector(
    (state) => state.whiteListSeedUserReducer,
  );

  const { walletAddress } = useSelector((state) => state.walletReducer);

  const dispatch = useDispatch();

  const csvFileInputRef = useRef();

  useEffect(() => {
    dispatch(fetchWhiteListSeedUserDataAction());
  }, []);

  const setNewDataForTable = (csvFileData, oldWhiteListAddress) => {
    const newAddressArray = [];
    for (let i = 0; i < csvFileData.length; i++) {
      const isValidAddrress = Web3.utils.isAddress(csvFileData[i]);
      if (isValidAddrress) {
        newAddressArray.push({ walletAddress: csvFileData[i], isValid: true });
      } else {
        newAddressArray.push({ walletAddress: csvFileData[i], isValid: false });
      }
    }

    const oldNewMergeAddressArray = newAddressArray.concat(oldWhiteListAddress);
    dispatch(setWhiteListSeedUserData(oldNewMergeAddressArray));
  };

  const openCsvFileInput = () => {
    csvFileInputRef.current.click();
  };

  const deleteAddressFromWhiteListArray = (address) => {
    const filterArray = whiteListUserData.filter(
      (item) => item.walletAddress !== address,
    );
    dispatch(setWhiteListSeedUserData(filterArray));
  };

  const resetTableData = () => {
    dispatch(fetchWhiteListSeedUserDataAction());
  };

  const createWhiteListSeedUser = async () => {
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
        const response = await postSeedWhiteListAddressApi(data);
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
  return (
    <main className={styles.white_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
          <Button onClick={resetTableData}>Reset</Button>
          <div className={styles.add_btn_wrap}>
            <Button onClick={openCsvFileInput}>Add Seed User</Button>
            <input
              onChange={(e) =>
                csvFileHandler(
                  e,
                  setError,
                  setRawCsvFileData,
                  setCsvFileParseData,
                  setNewDataForTable,
                  allowedExtensions,
                  whiteListUserData,
                )
              }
              type="file"
              ref={csvFileInputRef}
              className={styles.csv_File_Input}
            />
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <WhiteListSeedUserTable
          data={whiteListUserData}
          handleDeleteItem={deleteAddressFromWhiteListArray}
        />
      </section>
      <div className={styles.submit_btn_wrap}>
        <Button onClick={createWhiteListSeedUser}>Submit</Button>
      </div>
      <ToastContainer />
    </main>
  );
};

export default WhiteListSeedUser;
