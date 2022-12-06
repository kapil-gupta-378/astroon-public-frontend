import React from 'react';
import TextInput from '../../component/common/text-input';
import styles from './saleControls.module.scss';

const SaleControls = () => {
  return (
    <main className={styles.sale_page_wrap}>
      <form className={styles.form_wrap}>
        <div className={styles.input_wrap}>
          <TextInput title={'Token Price'} handleType={'number'} />
          <TextInput title={'Cap'} handleType={'number'} />
        </div>
        <div className={styles.input_wrap}>
          <TextInput title={'Start Date'} handleType="date" />
          <TextInput title={'End Date'} handleType="date" />
        </div>
        <div className={styles.input_wrap}>
          <TextInput title={'Clifting Time'} handleType={'number'} />
          <TextInput title={'Vesting Time'} handleType={'number'} />
        </div>
        <div className={styles.input_wrap}>
          <TextInput title={'ThresHold'} />
        </div>
      </form>
    </main>
  );
};

export default SaleControls;
