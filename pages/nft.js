import React from 'react';
import NFTCard from '../src/component/common/nft-card';

const NFTPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '40px',
      }}
    >
      {[...Array(16).keys()].map((_, idx) => (
        <NFTCard key={idx} />
      ))}
    </div>
  );
};

export default NFTPage;
