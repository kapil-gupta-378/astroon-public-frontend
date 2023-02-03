import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '../../common/button';
import GlobalLoading from '../../common/global-loading';
import styles from './NFTRewardModal.module.scss';
const NFTRewardModal = ({
  handleShow,
  leftButtonHandler,
  claimHandler,
  fetchMoreData,
  loading,
  dataCount,
  claimDisabled,
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
            NFT Reward
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
                    <b>{data.length === 0 ? 'Data not available' : ''}</b>
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
                        <th scope="col">NFT Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Purchase time</th>
                        <th scope="col">Available claim</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{item.name ? item.name : '-'}</td>
                            <td>{item.categoryId}</td>
                            <td>
                              {moment(item.updatedAt).format(
                                'DD/MM/YYYY h:mma',
                              )}
                            </td>
                            <td>{item.rewards}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {data.length !== 0 && (
                    <div className={styles.reward_wrap}>
                      <div className={styles.headings}>
                        <h5>
                          Total Reward : <span>300</span>
                        </h5>
                        <h5>
                          Total Claimed : <span>300</span>
                        </h5>
                      </div>
                      <Button disabled={claimDisabled} onClick={claimHandler}>
                        Claim
                      </Button>
                    </div>
                  )}
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

export default NFTRewardModal;
