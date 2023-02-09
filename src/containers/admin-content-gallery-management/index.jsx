import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../component/common/button';
import FilterBy from '../../component/common/FilterBy';
import GalleryDialogBox from '../../component/common/gallery-dialog-box';
import GalleryDeleteDialogBox from '../../component/common/gallery-delete-dialoag-box';
import GalleryContentManagementTable from '../../component/ui/gallery-content-management-table';
import styles from './galleryManagement.module.scss';
import {
  getGalleryAdminDataApi,
  uploadGalleryApi,
  insertGalleryDataApi,
  deleteGalleryDataApi,
  galleryOperationDataApi,
} from '../../../services/api/content-management/gallery-management';

const pageSelectOptions = [
  { value: 'video', label: 'Video' },
  { value: 'image', label: 'Image' },
];

const GalleryManagement = () => {
  const [deleteItemId, setDeleteItemId] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [getFile, setFiles] = useState('video');
  const [galleryAttachment, setGalleryAttachment] = useState('');
  const [isGalleryAttachment, setIsGalleryAttachment] = useState('');
  const [galleryList, setGalleryList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [galleryAttachmentURL, setGalleryAttachmentURL] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [getFileType, setFileType] = useState('');
  const [isSort, setIsSort] = useState(true);
  const [adminGalleryCount, setAdminGalleryCount] = useState('');
  const [pageNumber, setPageNumber] = useState();
  const [pageLimit, setPageLimit] = useState();

  useEffect(() => {
    setPageLimit(10);
    setPageNumber(1);
    getGalleryData(1, 10);
    setPageNumber((value) => value + 1);
  }, []);

  const getGalleryData = async (pageNo, pageLim) => {
    const res = await getGalleryAdminDataApi(pageNo, pageLim);
    if (res.success) {
      setGalleryList(res.data.rows);
      setAdminGalleryCount(res.data.count);
      setLoading(false);
    } else {
      toast.error(res.message);
    }
  };

  const fetchMoreData = async () => {
    const res = await getGalleryAdminDataApi(pageNumber, pageLimit);
    setGalleryList((value) => [...value, ...res.data.rows]);
    setLoading(false);
    setAdminGalleryCount((value) => {
      return value - 10;
    });
    setPageNumber((value) => value + 1);
  };

  useEffect(() => {
    if (galleryAttachmentURL) {
      setIsDisabled(false);
    }
  }, [galleryAttachmentURL]);

  useEffect(() => {
    if (getFileType) {
      filterGalleryData(getFileType);
    }
  }, [getFileType]);

  const filterGalleryData = async (file) => {
    const res = await galleryOperationDataApi(`fileType=${file}`);
    if (res.success) {
      setGalleryList(res.data.rows);
      setLoading(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleSorting = async (sortBy) => {
    setLoading(true);
    if (sortBy == 'DESC') {
      setIsSort(true);
    } else {
      setIsSort(false);
    }
    try {
      const res = await galleryOperationDataApi(`sortBy=${sortBy}`);
      if (res.success) {
        setGalleryList(res.data.rows);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      // throw error;
    }
  };

  const handleDeleteDialog = (id) => {
    setDeleteItemId(id);
    setDeleteDialog(true);
  };

  const handleCloseGalleryPopup = () => {
    setIsShow(false);
    setFiles('video');
    setGalleryAttachment('');
    setGalleryAttachmentURL('');
    setDeleteDialog(false);
    setDeleteItemId('');
    setIsGalleryAttachment('');
    setIsDisabled(true);
    setFileType();
  };
  const getGalleryUrl = async (e) => {
    let attachment = e.target.files[0];
    setIsGalleryAttachment(e.target.files[0]);
    const fileBody = new FormData();
    fileBody.append('file', attachment);
    let fileResponse = await uploadGalleryApi(fileBody);

    if (fileResponse.success) {
      setGalleryAttachment(fileResponse.data.fileName);
      setIsDisabled(false);
    } else {
      toast.error(fileResponse.message);
    }
  };
  const handleFile = async () => {
    if (getFile && (galleryAttachmentURL || galleryAttachment)) {
      let finalAttachment;
      let valid =
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
      if (valid.test(galleryAttachmentURL)) {
        finalAttachment = galleryAttachmentURL;
      } else if (galleryAttachment) {
        finalAttachment = galleryAttachment;
      } else {
        toast.error('Please Paste Valid URL');
      }
      if (finalAttachment) {
        try {
          let data = {
            url: galleryAttachmentURL
              ? galleryAttachmentURL
              : galleryAttachment,
            fileType: getFile,
          };
          const res = await insertGalleryDataApi(data);
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
            setFiles('video');
            setGalleryAttachment('');
            setGalleryAttachmentURL('');
            setDeleteDialog(false);
            setDeleteItemId('');
            setIsGalleryAttachment('');
            setIsDisabled(true);
            setFileType('');
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

  const handleDeleteGallery = async () => {
    try {
      const res = await deleteGalleryDataApi(deleteItemId);
      if (res.success) {
        toast.success(res.message);
        setDeleteItemId('');
        getGalleryData(1, 10);
        setDeleteDialog(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setDeleteItemId('');
      setDeleteDialog(false);
    }
  };

  return (
    <main className={styles.content_management_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
          <div className={styles.filter_wrap}>
            <FilterBy
              options={pageSelectOptions}
              handleChange={(value) => setFileType(value.value)}
            />
          </div>
          <div className={''}>
            <Button onClick={() => setIsShow(true)}>Add Gallery</Button>
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <GalleryContentManagementTable
          data={galleryList}
          handleDeleteItem={handleDeleteDialog}
          loading={isLoading}
          fetchMoreData={fetchMoreData}
          dataCount={adminGalleryCount}
          handleSorting={handleSorting}
          isSort={isSort}
        />
      </section>
      <GalleryDeleteDialogBox
        mainHading="You’re about to delete this Gallery"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac nibh ut in. Convallis in tristique dui sit vestibulum habitant"
        leftButtonHandler={handleCloseGalleryPopup}
        rightButtonHandler={() => handleDeleteGallery(deleteItemId)}
        leftButtonName="Cancel"
        rightButtonName="Delete"
        handleShow={deleteDialog}
      />
      <GalleryDialogBox
        leftBlogButtonHandler={handleCloseGalleryPopup}
        rightBlogButtonHandler={handleFile}
        handleShow={isShow}
        onChangeSelect={(value) => setFiles(value)}
        selectOption={pageSelectOptions}
        isGalleryAttachment={isGalleryAttachment}
        uploadGalleryAttachment={getGalleryUrl}
        galleryAttachmentURL={galleryAttachmentURL}
        setGalleryAttachmentURL={setGalleryAttachmentURL}
        getFile={getFile}
        isDisabled={isDisabled}
      />
    </main>
  );
};

export default GalleryManagement;
