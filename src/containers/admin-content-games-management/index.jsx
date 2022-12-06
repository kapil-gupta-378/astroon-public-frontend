import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../component/common/button';
import GamesDialogBox from '../../component/common/games-dialog-box';
import GamesContentManagementTable from '../../component/ui/games-content-management-table';
import styles from './gamesManagement.module.scss';
import {
  getGamesAppURLApi,
  insertGamesAppURLApi,
  updateGamesAppURLApi,
} from '../../../services/api/content-management/games-management';

const GamesManagement = () => {
  const [isShow, setIsShow] = useState(false);
  const [getURL, setUrl] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [playStoreURL, setPlayStoreURL] = useState('');
  const [appStoreURL, setAppStoreURL] = useState('');
  const [updateItemId, setUpdateItemId] = useState('');
  const [isUpdateBTN, setIsUpdateBTN] = useState(false);

  useEffect(() => {
    getGamesData();
  }, []);

  const getGamesData = async () => {
    const res = await getGamesAppURLApi();
    if (res.success) {
      setUrl(res.data);
      setLoading(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleUpdateDialog = (data) => {
    setUpdateItemId(data.id);
    setPlayStoreURL(data.androidLink);
    setAppStoreURL(data.iosLink);
    setIsUpdateBTN(true);
    setIsShow(true);
  };

  const handleCloseGamesPopup = () => {
    setIsShow(false);
    setUpdateItemId('');
    setIsUpdateBTN(false);
    setPlayStoreURL('');
    setAppStoreURL('');
  };
  const handleGamesURL = async () => {
    if (playStoreURL && appStoreURL) {
      let finalAttachment;
      const playExpression = /^(https:\/\/play\.)google\.[a-z]{3}$/gm;
      const playRegex = new RegExp(playExpression);
      const palyUrl = playStoreURL;
      const playResult = palyUrl.substring(0, 22);
      const appExpression = /^(https:\/\/apps\.)apple\.[a-z]{3}$/gm;
      const appRegex = new RegExp(appExpression);
      const appUrl = appStoreURL;
      const appResult = appUrl.substring(0, 22);
      if (playResult.match(playRegex) && appResult.match(appRegex)) {
        finalAttachment = playStoreURL;
      } else if (appResult.match(appRegex)) {
        finalAttachment = appStoreURL;
      } else {
        toast.error('Please Enter Valid URL', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (finalAttachment) {
        try {
          let data = {
            androidLink: playStoreURL,
            iosLink: appStoreURL,
          };
          let res;
          if (updateItemId) {
            res = await updateGamesAppURLApi(updateItemId, data);
          } else {
            res = await insertGamesAppURLApi(data);
          }

          if (res.success) {
            toast.success(res.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setIsShow(false);
            setIsUpdateBTN(false);
            setUpdateItemId('');
            setPlayStoreURL('');
            setAppStoreURL('');
            getGamesData();
          } else {
            toast.error(res.message, {
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
          if (error.response) {
            toast.error(error.response.data.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      }
    } else {
      toast.error('Please Fill All Fields');
    }
  };

  return (
    <main className={styles.content_management_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
          <div className={''}>
            <Button onClick={() => setIsShow(true)}>Add Games</Button>
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <GamesContentManagementTable
          data={getURL}
          handleUpdateItem={handleUpdateDialog}
          loading={isLoading}
        />
      </section>
      <GamesDialogBox
        leftBlogButtonHandler={handleCloseGamesPopup}
        rightBlogButtonHandler={handleGamesURL}
        handleShow={isShow}
        playStoreURL={playStoreURL}
        setPlayStoreURL={setPlayStoreURL}
        appStoreURL={appStoreURL}
        setAppStoreURL={setAppStoreURL}
        isUpdateBTN={isUpdateBTN}
      />
    </main>
  );
};

export default GamesManagement;
