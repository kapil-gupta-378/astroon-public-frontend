import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Button from '../../component/common/button';
import styles from './whiteListSeedUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWhiteListSeedUserDataAction } from '../../redux/white-list-seed-user/whiteListSeedAction';
import { setWhiteListSeedUserData } from '../../redux/white-list-seed-user/whiteListSeedSlice';
import {
  getSeedUserMerkleRootApi,
  postSeedWhiteListAddressApi,
} from '../../../services/api/markle';
import {
  createNewDataForWhiteListTable,
  parseCSVFile,
} from '../../utils/whiteListUser';
import WhiteListUserTable from '../../component/ui/white-list-user-table';
import { setGlobalLoading } from '../../redux/global-loading/globalLoadingSlice';
import { setMerkleRoot } from '../../../services/web3/saleMethod';
import GlobalLoading from '../../component/common/global-loading';
import DialogBox from '../../component/common/dialoag-box';

const WhiteListSeedUser = () => {
  const [showMerkleUpdateModal, setShowMerkleUpdateModal] = useState(false);
  const { isConnected, walletAddress } = useSelector(
    (state) => state.adminReducer,
  );
  const { whiteListSeedUserData } = useSelector(
    (state) => state.whiteListSeedUserReducer,
  );

  const { tokenData, saleOnData } = useSelector((state) => state.tokenReducer);
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
      if (!isConnected) throw new Error('Please connect your wallet');

      let newArray = [];

      for (let i = 0; i < whiteListSeedUserData.length; i++) {
        newArray.push(whiteListSeedUserData[i].walletAddress);
      }

      const data = {
        whiteListAddresses: newArray,
      };

      const response = await postSeedWhiteListAddressApi(data);

      if (response) {
        dispatch(setGlobalLoading(false));
        toast.success('WhiteList User Created Successfully');
        if (saleOnData.isSeed && tokenData.isPrivateSale)
          setShowMerkleUpdateModal(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message ? error.message : error.toString().slice(7));
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

  async function updateUserInContract() {
    try {
      if (!isConnected) throw new Error('Please connect your wallet');
      const seedUserMerkleRoot = await getSeedUserMerkleRootApi();

      const setMerkleRootResponse = await setMerkleRoot(
        seedUserMerkleRoot.merkleRoot,
        walletAddress,
      );

      if (setMerkleRootResponse.status) {
        dispatch(setGlobalLoading(false));
        toast.success('User Added Successfully');
      }
    } catch (error) {
      console.error(error);
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  }

  const leftButtonHandler = () => {
    setShowMerkleUpdateModal(false);
  };

  const rightButtonHandler = () => {
    updateUserInContract();
    setShowMerkleUpdateModal(false);
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
      <DialogBox
        handleShow={showMerkleUpdateModal}
        mainHading="Update"
        leftButtonName={'Cancel'}
        rightButtonName={'Update'}
        leftButtonHandler={leftButtonHandler}
        rightButtonHandler={rightButtonHandler}
      >
        <p style={{ margin: '40px 0px', fontSize: '17px' }}>
          Do you want to update uploaded address(s) in currently running seed
          sale?
        </p>
      </DialogBox>
      <GlobalLoading />
    </main>
  );
};

export default WhiteListSeedUser;
