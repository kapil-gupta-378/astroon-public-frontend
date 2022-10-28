import React from 'react';
import Link from 'next/link';
import styles from './blogTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';
import Image from 'next/image';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
const BlogTable = ({
  data,
  loading,
  handlePopup,
  fetchMoreData,
  dataCount,
}) => {
  return (
    <div id={'table_scroll'} className={styles.table_wrap}>
      {!loading ? (
        <InfiniteScroll
          scrollableTarget={'table_scroll'}
          dataLength={data.length} //This is important field to render the next data
          next={() => fetchMoreData()}
          hasMore={dataCount > 6}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more data available</b>
            </p>
          }
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
                  <th scope="col">Username</th>
                  <th scope="col">Blog Title</th>
                  <th scope="col">Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.user.userName}</td>
                      <td>
                        <Link href={`blog-detail/${item.id}`}>
                          <a>{item.title}</a>
                        </Link>
                      </td>
                      <td>
                        {moment(item.createdAt.toString()).format('DD/MM/YYYY')}
                      </td>
                      <td style={{ cursor: 'pointer' }}>
                        <Image
                          src={deleteIcon}
                          width={15}
                          height={15}
                          layout="fixed"
                          alt="delte-icon"
                          onClick={() => handlePopup(item.id)}
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
    </div>
  );
};

export default BlogTable;
