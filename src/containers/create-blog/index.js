import React, { useEffect, useRef, useState } from 'react';
import styles from './createBlog.module.scss';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import { useRouter } from 'next/router';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import Image from 'next/image';
import {
  createBlogApi,
  uploadBlogBannerImageToServer,
} from '../../../services/api/blog/blog';
import { toast, ToastContainer } from 'react-toastify';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [, setFeatureImage] = useState('');
  const [blogFeatureImageUrl, setFeatureImageUrl] = useState('');
  const [isPopular, setIsPopular] = useState();
  const [isTop, setIsTop] = useState();
  const [blogContent, setBlogContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);

  const router = useRouter();
  const blogImageRef = useRef();
  const uploadImageToBlog = () => {
    blogImageRef.current.click();
  };
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('ckeditor5-custom-build/build/ckeditor'),
    };

    setEditorLoaded(true);
  }, []);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append('file', file);
            fetch(`${APP_URL}upload/ckeditorImage`, {
              method: 'post',
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `${res.data.fileName}` });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const uploadBlogImage = (e) => {
    setFeatureImage(URL.createObjectURL(e.target.files[0]));
    setFeatureImageUrl(e.target.files[0]);
  };

  const createBlog = async () => {
    const body = new FormData();
    body.append('file', blogFeatureImageUrl);
    const imageResponse = await uploadBlogBannerImageToServer(body);
    const data = {
      title: blogTitle,
      featureImage: imageResponse.fileName,
      description: blogContent,
      metaDescription: metaDescription,
      isPopular: isPopular,
      isTop: isTop,
    };

    try {
      const response = await createBlogApi(data);

      if (response.success) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.back();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
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
  return (
    <main className={styles.create_blog_page_wrap}>
      <section onClick={() => router.back()} className={styles.header}>
        <Image
          src={backArrowIcon}
          width={20}
          height={20}
          alt="backarrow"
          layout="fixed"
        />
        <h3>Create Blog</h3>
      </section>
      <section className={styles.create_blog_form_wrap}>
        <TextInput
          titleBackground={'#010125'}
          placeHolder={'Enter title'}
          title={'Title'}
          kind={'fullborder'}
          handleValue={blogTitle}
          handleOnChange={(e) => setBlogTitle(e.target.value)}
        />
        <TextInput
          titleBackground={'#010125'}
          placeHolder={'Enter Meta Description'}
          title={'Meta Description'}
          kind={'fullborder'}
          handleValue={metaDescription}
          handleOnChange={(e) => setMetaDescription(e.target.value)}
        />

        <div className={styles.blog_upload_image_wrap}>
          <Button onClick={uploadImageToBlog}>Upload Banner Image</Button>
          <input
            className={styles.image_input}
            accept="image/*"
            ref={blogImageRef}
            type="file"
            onChange={uploadBlogImage}
          />
          <div className={styles.switchs_wrap}>
            <div className="form-check form-switch">
              <input
                onChange={(e) => setIsTop(e.target.checked)}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault1"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Put on top
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                onChange={(e) => setIsPopular(e.target.checked)}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault2"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Mark Papulor
              </label>
            </div>
          </div>
        </div>
        <div className={` ck-content ${styles.ckEditor_wrap}`}>
          <h6 className={styles.content_heading}>Blog Content </h6>
          {ClassicEditor && CKEditor && editorLoaded && (
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
              }}
              editor={ClassicEditor}
              data="<p>White Blog Content Here</p>"
              onChange={(event, editor) => {
                const data = editor.getData();
                setBlogContent(data);
              }}
              onError={(error, { willEditorRestart }) => {
                // If the editor is restarted, the toolbar element will be created once again.
                // The `onReady` callback will be called again and the new toolbar will be added.
                // This is why you need to remove the older toolbar.
                if (willEditorRestart) {
                  this.editor.ui.view.toolbar.element.remove();
                }
              }}
            />
          )}
        </div>

        <div className={styles.btn_wrap}>
          <Button onClick={createBlog}>Submit</Button>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default CreateBlog;
