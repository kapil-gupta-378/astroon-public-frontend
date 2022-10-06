import React from 'react';
import styles from './accordion.module.scss';

const Accordion = ({ data, id }) => {
  return (
    <div className={styles.accordion_wrap} id="accordionExample">
      <div className={styles.accordion_item}>
        <h2 id={`heading${id}`}>
          <button
            className={styles.accordion_btn}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${id}`}
            aria-expanded="false"
            aria-controls={`collapse${id}`}
          >
            {data.question}
          </button>
        </h2>
        <div
          id={`collapse${id}`}
          className={`accordion-collapse collapse ${styles.accordion_body_wrap}`}
          aria-labelledby={`heading${id}`}
          data-bs-parent="#accordionExample"
        >
          <div className={styles.accordion_body}>{data.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
