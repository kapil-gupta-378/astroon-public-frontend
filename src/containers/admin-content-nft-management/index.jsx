import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  validateOpenseaURLApi,
  insertNFTDataApi,
  getNFTDataApi,
  deleteNFTDataApi,
} from '../../../services/api/content-management/nft-management';
import Button from '../../component/common/button';
import NFTDeleteDialogBox from '../../component/common/nft-delete-dialoag-box';
import NFTDialogBox from '../../component/common/nft-dialog-box';
import NFTContentManagementTable from '../../component/ui/nft-content-management-table';
import styles from './nftManagement.module.scss';

const categorySelectOptions = [
  { value: 'Art', label: 'Art' },
  { value: 'Jwellery', label: 'Jwellery' },
  { value: 'Sneakers', label: 'Sneakers' },
  { value: 'Watches', label: 'Watches' },
];

const NFTManagement = () => {
  const [deleteItemId, setDeleteItemId] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [nftFormShow, setNftFormShow] = useState(false);
  const [openseaLink, setOpenseaLink] = useState('');
  const [getNFTData, setNFTData] = useState('');
  const [category, setCategory] = useState();
  const [nftListData, setNFTListData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNFTFinalData();
  }, []);

  const getNFTFinalData = async () => {
    const res = await getNFTDataApi();
    if (res.success) {
      setNFTListData(res.data.rows);
      setIsLoading(false);
    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  };

  const handleDeleteDialog = (id) => {
    setDeleteItemId(id);
    setDeleteDialog(true);
  };

  const handleDeleteNFT = async () => {
    try {
      const res = await deleteNFTDataApi(deleteItemId);
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
        setDeleteItemId('');
        getNFTFinalData();
        setDeleteDialog(false);
        setCategory('');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setDeleteItemId('');
      setDeleteDialog(false);
    }
  };

  const handleCloseNFTPopup = () => {
    setIsShow(false);
    setNftFormShow(false);
    setOpenseaLink('');
    setNFTData('');
    setDeleteItemId('');
    setDeleteDialog(false);
    setCategory('');
  };

  const handleOpenseaLink = async () => {
    const expression = /^(https:\/\/testnets\.)opensea\.[a-z]{2}$/gm;
    const regex = new RegExp(expression);
    const url = openseaLink;
    const result = url.substring(0, 27);

    if (openseaLink) {
      if (result.match(regex)) {
        try {
          let data = {
            url: openseaLink,
          };
          const res = await validateOpenseaURLApi(data);
          if (res.success) {
            setNFTData(res.data);
            setNftFormShow(true);
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
          toast.error(error.response.data.message);
          // throw error;
        }
      } else {
        toast.error('Please enter valid URL', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Please enter opensea URL');
    }
  };

  const handleNFTData = async () => {
    if (openseaLink && getNFTData && category) {
      try {
        let data = {
          url: openseaLink,
          nft: getNFTData,
          category: category,
        };
        const res = await insertNFTDataApi(data);
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
          setNftFormShow(false);
          setOpenseaLink('');
          setNFTData(res.data);
          getNFTFinalData();
          setCategory('');
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
        toast.error(error.response.data.message);
        // throw error;
      }
    } else {
      toast.error('Please Fill All The Fields');
    }
  };
  return (
    <main className={styles.content_management_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
          <div className={''}>
            <Button onClick={() => setIsShow(true)}>Add NFT</Button>
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <NFTContentManagementTable
          data={nftListData}
          loading={isLoading}
          handleDeleteItem={handleDeleteDialog}
        />
      </section>
      <NFTDeleteDialogBox
        mainHading="You’re about to delete this Content"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac nibh ut in. Convallis in tristique dui sit vestibulum habitant"
        leftButtonHandler={handleCloseNFTPopup}
        rightButtonHandler={() => handleDeleteNFT(deleteItemId)}
        leftButtonName="Cancel"
        rightButtonName="Delete"
        handleShow={deleteDialog}
      />
      <NFTDialogBox
        leftBlogButtonHandler={handleCloseNFTPopup}
        rightBlogButtonHandler={handleOpenseaLink}
        handleShow={isShow}
        finalData={getNFTData}
        showNFT={nftFormShow}
        inputValue={openseaLink}
        onChangeInput={(value) => setOpenseaLink(value)}
        categorySelectOptions={categorySelectOptions}
        setCategory={setCategory}
        handleSubmit={handleNFTData}
      />
    </main>
  );
};

export default NFTManagement;
