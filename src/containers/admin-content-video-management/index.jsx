import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../component/common/button';
import VideoDialogBox from '../../component/common/video-dialog-box';
import UpdateVideoDialogBox from '../../component/common/update-video-dialog-box';
import VideoContentManagementTable from '../../component/ui/video-content-management-table';
import styles from './videoManagement.module.scss';
import {
  getVideosForPagesApi,
  uploadVideosApi,
  insertVideosForPagesApi,
  updateVideosForPagesApi,
} from '../../../services/api/content-management/video-management';

const pageSelectOptions = [
  { value: 'animation', label: 'Animation' },
  { value: 'app', label: 'App' },
  { value: 'games', label: 'Games' },
];

const VideoManagement = () => {
  const [updateItemId, setUpdateItemId] = useState('');
  const [updateDialog, setUpdateDialog] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [getPage, setPages] = useState();
  const [videoAttachment, setVideoAttachment] = useState('');
  const [isVideoAttachment, setIsVideoAttachment] = useState('');
  const [getUpdatePage, setUpdatePages] = useState();
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setLoasing] = useState(true);
  const [videoAttachmentURL, setVideoAttachmentURL] = useState('');
  const [videoUpdateAttachmentURL, setVideoUpdateAttachmentURL] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getVideosData();
  }, []);

  useEffect(() => {
    if (videoAttachmentURL) {
      setIsDisabled(false);
    }
  }, [videoAttachmentURL]);

  const getVideosData = async () => {
    const res = await getVideosForPagesApi();
    if (res.success) {
      setVideoList(res.data);
      setLoasing(false);
    } else {
      toast.error(res.message);
    }
  };
  const handleUpdateDialog = (data) => {
    setUpdatePages(data.videoType);
    setPages({
      value: data.videoType,
      label: data.videoType.charAt(0).toUpperCase() + data.videoType.slice(1),
      disabled: true,
    });
    setUpdateItemId(data.id);
    setVideoUpdateAttachmentURL(data.url);
    setUpdateDialog(true);
  };

  const handleCloseVideoPopup = () => {
    setUpdateDialog(false);
    setUpdatePages('');
    setUpdateItemId('');
    setVideoUpdateAttachmentURL('');
    setPages('');
    setVideoAttachment('');
    setIsShow(false);
    getVideosData();
    setVideoAttachmentURL('');
    setIsVideoAttachment('');
    setIsDisabled(true);
  };
  const getVideoUrl = async (e) => {
    let attachment = e.target.files[0];
    setIsVideoAttachment(e.target.files[0]);
    const fileBody = new FormData();
    fileBody.append('file', attachment);
    let fileResponse = await uploadVideosApi(fileBody);
    if (fileResponse.success) {
      setVideoAttachment(fileResponse.data.fileName);
      setIsDisabled(false);
    } else {
      toast.error(fileResponse.message);
    }
  };
  const handleVideo = async () => {
    if (getPage && (videoAttachmentURL || videoAttachment)) {
      let finalAttachment;
      let valid =
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
      if (valid.test(videoAttachmentURL)) {
        finalAttachment = videoAttachmentURL;
      } else if (videoAttachment) {
        finalAttachment = videoAttachment;
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
            url: videoAttachmentURL ? videoAttachmentURL : videoAttachment,
            videoType: getPage,
          };
          const res = await insertVideosForPagesApi(data);
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
            setUpdateDialog(false);
            setUpdatePages('');
            setUpdateItemId('');
            setVideoUpdateAttachmentURL('');
            setPages('');
            setVideoAttachment('');
            setIsShow(false);
            getVideosData();
            setVideoAttachmentURL('');
            setIsVideoAttachment('');
            setIsDisabled(true);
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

  const handleCloseUpdateVideoPopup = () => {
    setUpdateDialog(false);
    setUpdatePages('');
    setUpdateItemId('');
    setVideoUpdateAttachmentURL('');
    setPages('');
    setVideoAttachment('');
    setIsShow(false);
    getVideosData();
    setVideoAttachmentURL('');
    setIsVideoAttachment('');
  };
  const handleUpdateVideo = async () => {
    if (getUpdatePage && videoUpdateAttachmentURL) {
      let valid =
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
      const expression =
        /^(https:\/\/astroon-bucket\.)s3\.ap-northeast-1\.amazonaws\.[a-z]{3}$/gm;
      const regex = new RegExp(expression);
      const url = videoUpdateAttachmentURL;
      const result = url.substring(0, 54);

      if (result.match(regex) || valid.test(videoUpdateAttachmentURL)) {
        try {
          let data = {
            url: videoUpdateAttachmentURL,
            videoType: getUpdatePage,
          };
          const res = await updateVideosForPagesApi(updateItemId, data);
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
            setUpdateDialog(false);
            setUpdatePages('');
            setUpdateItemId('');
            setVideoUpdateAttachmentURL('');
            setPages('');
            setVideoAttachment('');
            setIsShow(false);
            getVideosData();
            setVideoAttachmentURL('');
            setIsVideoAttachment('');
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
    } else {
      toast.error('Please Fill All Fields');
    }
  };
  return (
    <main className={styles.content_management_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_right}>
          <div className={''}>
            <Button onClick={() => setIsShow(true)}>Add Video</Button>
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <VideoContentManagementTable
          data={videoList}
          handleUpdateItem={handleUpdateDialog}
          loading={isLoading}
        />
      </section>
      <VideoDialogBox
        leftBlogButtonHandler={handleCloseVideoPopup}
        rightBlogButtonHandler={handleVideo}
        handleShow={isShow}
        onChangeSelect={(value) => setPages(value)}
        selectOption={pageSelectOptions}
        isVideoAttachment={isVideoAttachment}
        uploadVideoAttachment={getVideoUrl}
        videoAttachmentURL={videoAttachmentURL}
        setVideoAttachmentURL={setVideoAttachmentURL}
        getPage={getPage}
        isDisabled={isDisabled}
      />
      <UpdateVideoDialogBox
        leftBlogButtonHandler={handleCloseUpdateVideoPopup}
        rightBlogButtonHandler={handleUpdateVideo}
        handleShow={updateDialog}
        onChangeSelect={(value) => setUpdatePages(value)}
        selectOption={pageSelectOptions}
        videoAttachmentURL={videoUpdateAttachmentURL}
        setVideoAttachmentURL={setVideoUpdateAttachmentURL}
        getPage={getPage}
      />
    </main>
  );
};

export default VideoManagement;
