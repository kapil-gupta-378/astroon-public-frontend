import React from 'react';
import styles from './faqTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';
import editIcon from '../../../../public/assets/images/Edit-table-icon.svg';
import desIcon from '../../../../public/assets/images/des.svg';
import asenIcon from '../../../../public/assets/images/asen.svg';
import Image from 'next/image';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';

const FAQTable = ({
  data,
  loading,
  handleDeleteItem,
  fetchMoreData,
  dataCount,
  handleSorting,
  isSort,
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
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  {isSort ? (
                    <th
                      scope="col"
                      onClick={() => handleSorting('ASC')}
                      className={styles.sorting}
                    >
                      <Image
                        src={desIcon}
                        width={15}
                        height={15}
                        layout="fixed"
                        alt="sort-icon"
                      />
                      Ordering
                    </th>
                  ) : (
                    <th
                      scope="col"
                      onClick={() => handleSorting('DESC')}
                      className={styles.sorting}
                    >
                      <Image
                        src={asenIcon}
                        width={15}
                        height={15}
                        layout="fixed"
                        alt="sort-icon"
                      />
                      Ordering
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.ordering}</td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          router.push(`/admin/updateFAQ/${item.id}`)
                        }
                      >
                        <Image
                          src={editIcon}
                          width={15}
                          height={15}
                          layout="fixed"
                          alt="delte-icon"
                        />
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
FAQTable.proptypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  handleDeleteItem: PropTypes.func,
};
export default FAQTable;
