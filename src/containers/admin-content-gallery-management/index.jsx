import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../component/common/button';
import GalleryDialogBox from '../../component/common/gallery-dialog-box';
import GalleryDeleteDialogBox from '../../component/common/gallery-delete-dialoag-box';
import GalleryContentManagementTable from '../../component/ui/gallery-content-management-table';
import styles from './galleryManagement.module.scss';
import {
  getGalleryForFileApi,
  uploadGalleryApi,
  insertGalleryForFileApi,
  deleteGalleryForFileApi,
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

  useEffect(() => {
    getGalleryData();
  }, []);

  const getGalleryData = async () => {
    const res = await getGalleryForFileApi();
    if (res.success) {
      setGalleryList(res.data.rows);
      setLoading(false);
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
  };
  const getGalleryUrl = async (e) => {
    let attachment = e.target.files[0];
    setIsGalleryAttachment(e.target.files[0]);
    const fileBody = new FormData();
    fileBody.append('file', attachment);
    let fileResponse = await uploadGalleryApi(fileBody);

    if (fileResponse.success) {
      setGalleryAttachment(fileResponse.data.fileName);
    } else {
      toast.error(fileResponse.message, {
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
        toast.error('Please Paste Valid URL', {
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
            url: galleryAttachmentURL
              ? galleryAttachmentURL
              : galleryAttachment,
            fileType: getFile,
          };
          const res = await insertGalleryForFileApi(data);
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
            setFiles('video');
            setGalleryAttachment('');
            setIsShow(false);
            getGalleryData();
            setGalleryAttachmentURL('');
            setIsGalleryAttachment('');
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
      toast.error('Please Fill All Fields', {
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

  const handleDeleteGallery = async () => {
    try {
      const res = await deleteGalleryForFileApi(deleteItemId);
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
        getGalleryData();
        setDeleteDialog(false);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeleteItemId('');
      setDeleteDialog(false);
    }
  };

  return (
    <main className={styles.content_management_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
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
      />
      <ToastContainer />
    </main>
  );
};

export default GalleryManagement;
