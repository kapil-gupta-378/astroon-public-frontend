import React from 'react';
import styles from './contactUsTable.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
const ContactTable = ({
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
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Reason for Contact</th>
                  <th scope="col">Subject</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.reasonForContact}</td>
                      <td>
                        <button
                          className={styles.view_btn}
                          onClick={() => handlePopup(item.id)}
                        >
                          View
                        </button>
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

export default ContactTable;
