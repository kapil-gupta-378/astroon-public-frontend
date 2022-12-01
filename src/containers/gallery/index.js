import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import styles from './gallery.module.scss';
import HeadingBackground from '../../component/common/heading-background';
import { getGalleryForUserFileApi } from '../../../services/api/content-management/gallery-management';

const Gallery = () => {
  const [galleryList, setGalleryList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  useEffect(() => {
    getGalleryData();
  }, []);

  const showItems = (item) => {
    const resultsRender = [];
    for (var i = 0; i < item.length; i += 2) {
      resultsRender.push(
        <div className={`clearfix ${styles.main_gall_wrp}`} key={item.id}>
          {item.slice(i, i + 2).map((data, index) => (
            <>
              <div
                key={index}
                className={` ${styles.comm_wrp} ${
                  data.fileType == 'image'
                    ? styles.image_wrap
                    : styles.video_wrap
                }`}
              >
                {data.fileType == 'video' ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={data.url}
                    controls={true}
                  />
                ) : (
                  <Image
                    loader={ImageLoader}
                    src={data.url}
                    width="465px"
                    height="599px"
                    alt="gallery image"
                    layout="responsive"
                  />
                )}
              </div>
            </>
          ))}
        </div>,
      );
    }

    return <div>{resultsRender}</div>;
  };

  const getGalleryData = async () => {
    const res = await getGalleryForUserFileApi();
    if (res.success) {
      let video = res.data.rows.filter((obj) => obj.fileType == 'video');
      let image = res.data.rows.filter((obj) => obj.fileType == 'image');

      const n1 = video.length;
      const n2 = image.length;
      const arr3 = new Array(n1 + n2);
      const arrayFilter = (arr1, arr2, n1, n2, arr3) => {
        let i = 0,
          j = 0,
          k = 0;
        // Traverse both array
        while (i < n1 && j < n2) {
          arr3[k++] = arr1[i++];
          arr3[k++] = arr2[j++];
        }

        // Store remaining elements of first array
        while (i < n1) arr3[k++] = arr1[i++];

        // Store remaining elements of second array
        while (j < n2) arr3[k++] = arr2[j++];
      };
      arrayFilter(image, video, n1, n2, arr3);
      setGalleryList(arr3);
      setLoading(false);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className={` container ${styles.gallery_wrap}`}>
      <HeadingBackground>
        <h1 className={styles.gallery_heading}>Gallery</h1>
      </HeadingBackground>
      {!isLoading ? (
        <div className={styles.upper_wrap}>
          {galleryList && showItems(galleryList)}
        </div>
      ) : (
        <>
          <div className={styles.spinner_wrap}>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
