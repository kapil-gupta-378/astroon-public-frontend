import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import GlobalLoading from '../../common/global-loading';
import styles from './tokenBuyHistory.module.scss';
const TokenBuyHistory = ({
  handleShow,
  leftButtonHandler,
  fetchMoreData,
  loading,
  dataCount,
  data = [{ saleType: 'sdofak', buyToken: 'soidadfmo', createdAt: 'doisgifj' }],
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
            Transition History
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
                        <th scope="col">Sale type</th>
                        <th scope="col">Token</th>
                        <th scope="col">Purchase time</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, idx) => {
                        return (
                          <tr key={item.id}>
                            <th scope="row">{idx + 1}</th>
                            <td>{item.saleType}</td>
                            <td>{item.buyToken}</td>
                            <td>
                              {moment(item.createdAt)
                                .utc()
                                .format('DD/MM/YYYY h:mma')}
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
        </Modal.Body>
      </Modal>
      {<GlobalLoading />}
    </>
  );
};

export default TokenBuyHistory;
