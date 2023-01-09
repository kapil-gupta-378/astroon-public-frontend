import React, { useEffect, useState } from 'react';
import { getNFTDataApi } from '../services/api/content-management/nft-management';
import { toast } from 'react-toastify';
// import OpenseaNFTCard from '../src/component/common/opensea-nft-card';
import MysteryBox from '../src/component/ui/mystery-box';

const NFTPage = () => {
  const [, setNFTData] = useState([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    getNFTFinalData();
  }, []);

  const getNFTFinalData = async () => {
    const res = await getNFTDataApi();
    if (res.success) {
      setNFTData(res.data.rows);
      setIsLoading(false);
    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '40px',
        gap: '15px',
        justifyContent: 'center',
      }}
    >
      <MysteryBox />
    </div>
  );
};

export default NFTPage;
