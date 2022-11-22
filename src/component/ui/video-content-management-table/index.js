import React, { useState } from 'react';
import styles from './videoContentManagementTable.module.scss';
import editIcon from '../../../../public/assets/images/Edit-table-icon.svg';
import Image from 'next/image';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '../../common/button';
import Player from '../../common/video-popup';
const VideoContentManagementTable = ({ data, loading, handleUpdateItem }) => {
  const [show, setShow] = useState(false);
  const [showURL, setShowURL] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (url) => {
    setShow(true);
    setShowURL(url);
  };
  return (
    <div id={'table_scroll'} className={styles.table_wrap}>
      {!loading ? (
        <InfiniteScroll
          scrollableTarget={'table_scroll'}
          dataLength={data.length} //This is important field to render the next data
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={''}
          // below props only if you need pull down functionality
          refreshFunction={() => false}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          <div className={styles.scroll_wrap}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Page Name</th>
                  <th scope="col">Videos</th>
                  <th scope="col">Upload Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.videoType}</td>
                      <td>
                        <Button onClick={() => handleShow(item.url)}>
                          View
                        </Button>
                      </td>
                      <td>
                        {moment(item.createdAt.toString()).format('DD/MM/YYYY')}
                      </td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleUpdateItem(item)}
                      >
                        <Image
                          src={editIcon}
                          width={15}
                          height={15}
                          layout="fixed"
                          alt="edit-icon"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      ) : (
        <div className={styles.spinner_wrap}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      <Player show={show} handleClose={handleClose} showURL={showURL} />
    </div>
  );
};

export default VideoContentManagementTable;
