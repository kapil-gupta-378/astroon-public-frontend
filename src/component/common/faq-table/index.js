import React from 'react';
import styles from './faqTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';
import editIcon from '../../../../public/assets/images/Edit-table-icon.svg';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const FAQTable = ({ data, loading, handleDeleteItem }) => {
  const router = useRouter();
  return (
    <div id={'table_scroll'} className={styles.table_wrap}>
      {!loading ? (
        <div className={styles.scroll_wrap}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Ordering</th>
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
                      onClick={() => router.push(`/admin/updateFAQ/${item.id}`)}
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
