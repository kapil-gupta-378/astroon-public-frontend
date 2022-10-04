import React from 'react';
import styles from './accordion.module.scss';

const Accordion = ({ id }) => {
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
            Phasellus pellentesque pulvinar.
          </button>
        </h2>
        <div
          id={`collapse${id}`}
          className={`accordion-collapse collapse ${styles.accordion_body_wrap}`}
          aria-labelledby={`heading${id}`}
          data-bs-parent="#accordionExample"
        >
          <div className={styles.accordion_body}>
            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat aute irure dolor
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
