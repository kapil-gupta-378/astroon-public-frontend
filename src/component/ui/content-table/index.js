import React from 'react';
import styles from './contentTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
const ContentTable = ({
  data,
  loading,
  handleDeleteItem,
  fetchMoreData,
  dataCount,
  onClickUserName,
}) => {
  const router = useRouter();
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
              <b>Yay! You have seen it all</b>
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
                  <th scope="col">Content Name</th>
                  <th scope="col">Content Type</th>
                  <th scope="col">Upload Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => onClickUserName(item.id)}
                      >
                        {item.user.userName}
                      </td>
                      <td>{item.contentName}</td>
                      <td>{item.contentType}</td>
                      <td>
                        {moment(item.createdAt.toString()).format('DD/MM/YYYY')}
                      </td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          router.push(`/admin/edit-profile/${item.id}`)
                        }
                      >
                        <button className={styles.table_btn_approve}>
                          Approve
                        </button>
                      </td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          router.push(`/admin/edit-profile/${item.id}`)
                        }
                      >
                        <button className={styles.table_btn_disapprove}>
                          Disapprove
                        </button>
                      </td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Image
                          src={deleteIcon}
                          width={15}
                          height={15}
                          layout="fixed"
                          alt="delte-icon"
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

export default ContentTable;
