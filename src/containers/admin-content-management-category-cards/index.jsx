import React from 'react';
import styles from './contentManagementCategoryCards.module.scss';
import ContentManagementCards from '../../component/common/content-management-card';

const ContentManagementCategoryCards = () => {
  return (
    <main className={styles.content_management_wrap}>
      <ContentManagementCards />
    </main>
  );
};

export default ContentManagementCategoryCards;
