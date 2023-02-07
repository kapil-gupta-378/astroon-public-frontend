import React, { useEffect, useRef, useState } from 'react';
import styles from './updateBlog.module.scss';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import { useRouter } from 'next/router';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import Image from 'next/image';
import {
  getSingleBlogDataApi,
  updateBlogApi,
  uploadBlogBannerImageToServer,
} from '../../../services/api/blog/blog';
import { toast } from 'react-toastify';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdateBlog = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [getImageUrl, setImageUrl] = useState('');
  const [blogFeatureImageUrl, setFeatureImageUrl] = useState('');
  const [isPopular, setIsPopular] = useState();
  const [isTop, setIsTop] = useState();
  const [blogContent, setBlogContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [loading, setLoading] = useState();
  const router = useRouter();
  const blogImageRef = useRef();
  const uploadImageToBlog = () => {
    blogImageRef.current.click();
  };
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getBlogData(id);
    }
  }, [id]);

  const getBlogData = async (Id) => {
    const res = await getSingleBlogDataApi(Id);
    if (res.success) {
      setBlogTitle(res.data.title);
      setMetaDescription(res.data.metaDescription);
      setIsTop(res.data.isTop);
      setIsPopular(res.data.isPopular);
      setBlogContent(res.data.description);
      setImageUrl(res.data.featureImage);
    } else {
      toast.error(res.message);
    }
  };

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

  const uploadBlogImage = async (e) => {
    let image = e.target.files[0];
    const body = new FormData();
    body.append('file', image);
    const res = await uploadBlogBannerImageToServer(body);
    setFeatureImageUrl(res.fileName);
  };

  const updateBlog = async () => {
    setLoading(true);
    const data = {
      title: blogTitle,
      featureImage: blogFeatureImageUrl ? blogFeatureImageUrl : getImageUrl,
      description: blogContent,
      metaDescription: metaDescription,
      isPopular: isPopular,
      isTop: isTop,
    };

    try {
      const response = await updateBlogApi(data, id);
      if (response.success) {
        toast.success(response.message);
        router.back();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
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
        <h3>Update Blog</h3>
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
                value={isTop}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault1"
                checked={isTop == true ? true : false}
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
                value={isPopular}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault2"
                checked={isPopular == true ? true : false}
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
              data={blogContent}
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
          <Button disabled={loading} onClick={updateBlog}>
            Update
          </Button>
        </div>
      </section>
    </main>
  );
};

export default UpdateBlog;
