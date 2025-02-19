import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import GlobalLoading from '../../common/global-loading';
import styles from './MysteryBoxBuyHistory.module.scss';

const MysteryBoxBuyHistory = ({
  handleShow,
  leftButtonHandler,
  fetchMoreData,
  loading,
  dataCount,
  data = [
    { saleType: 'NFT Pre', count: '2', price: '0.02', createdAt: '02/01/2023' },
  ],
  reveal,
}) => {
  return (
    <>
      <Modal
        show={handleShow}
        onHide={leftButtonHandler}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        className={'claim_token_modal'}
      >
        <Modal.Header closeVariant={'white'} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Transaction History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    <b>
                      {data.length === 0
                        ? 'Data not available'
                        : 'No more data available'}
                    </b>
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
                  <h3 style={{ textAlign: 'center' }}>
                    &#8593; Release to refresh
                  </h3>
                }
              >
                <div className={styles.scroll_wrap}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">NFT</th>
                        <th scope="col">Price</th>
                        <th scope="col">Purchase time</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, idx) => {
                        return (
                          <tr key={item.id}>
                            <th scope="row">{idx + 1}</th>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity} AST</td>
                            <td>
                              {moment(item.createdAt).format(
                                'DD/MM/YYYY h:mma',
                              )}
                            </td>
                            <td>{reveal ? 'Revealed' : 'Not reveal'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </InfiniteScroll>
            ) : (
              <div className={styles.spinner_wrap}>
                <div className="spinner-border text-white" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      {<GlobalLoading />}
    </>
  );
};

export default MysteryBoxBuyHistory;
