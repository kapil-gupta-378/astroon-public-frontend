import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../component/common/button';
import SearchBar from '../../component/common/SearchBar';
import styles from './whiteListUser.module.scss';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWhiteListUserDataAction } from '../../redux/white-list-user/whiteListAction';
import { setWhiteListUserData } from '../../redux/white-list-user/whiteListSlice';
import WhiteListUserTable from '../../component/ui/white-list-user-table';
import { getContractInstance } from '../../../services/web3/web3ProviderMethods';
import Web3 from 'web3';
import { postWhiteListAddressApi } from '../../../services/api/markle';
const WhiteListUser = () => {
  // This state will store the parsed data
  const [setRawCsvFileData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [setError] = useState('');

  // It will store the file uploaded by the user
  const [setCsvFileParseData] = useState([]);
  // Allowed extensions for input file
  const allowedExtensions = ['csv'];

  const { whiteListUserData } = useSelector(
    (state) => state.whiteListUserReducer,
  );

  const { walletAddress } = useSelector((state) => state.walletReducer);

  const dispatch = useDispatch();

  const csvFileInputRef = useRef();

  useEffect(() => {
    dispatch(fetchWhiteListUserDataAction());
  }, []);

  // This function will be called when
  // the file input changes
  const csvFileHandler = (e) => {
    setError('');
    let newCsvFileData = [];
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split('/')[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a csv file');
        return;
      }
      // If input type is correct set the state
      setRawCsvFileData(inputFile);
      // a file we show a error
      if (!inputFile) return setError('Enter a valid file');
      // Initialize a reader which allows user
      // to read any file or blob.
      const reader = new FileReader();
      // Event listener on reader when the file
      // loads, we parse it and set the data.
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        for (let i = 0; i < parsedData.length; i++) {
          const columns = Object.keys(parsedData[i]);
          newCsvFileData.push(...columns);
        }
        setCsvFileParseData(newCsvFileData);
        setNewDataForTable(newCsvFileData, whiteListUserData);
      };
      reader.readAsText(inputFile);
    }
  };

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

    const oldNewMergeAddressArray = oldWhiteListAddress.concat(newAddressArray);
    dispatch(setWhiteListUserData(oldNewMergeAddressArray));
  };

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

      const response = await postWhiteListAddressApi(data);
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
  };
  return (
    <main className={styles.white_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar
          // inputValue={searchKeyWord}
          // onChangeInputHandler={handleSearchFAQTitle}
          />
        </div>
        <div className={styles.top_bar_right}>
          <Button onClick={resetTableData}>Reset</Button>
          <div className={styles.add_btn_wrap}>
            <Button onClick={openCsvFileInput}>Add Private User</Button>
            <input
              onChange={csvFileHandler}
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
