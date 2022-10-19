import React from 'react';
import styles from './contactUsTable.module.scss';
const ContactTable = ({ data, loading, handlePopup }) => {
  return (
    <div className={styles.table_wrap}>
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
          {!loading ? (
            data.length !== 0 ? (
              data?.map((item, idx) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.reasonForContact}</td>
                    <td>{item.subject}</td>
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
              })
            ) : (
              <td colSpan="5" className="text-center">
                <h3>Data Not Found</h3>
              </td>
            )
          ) : (
            <td colSpan="5" className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
