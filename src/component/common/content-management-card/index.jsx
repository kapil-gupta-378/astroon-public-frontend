import { Card, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';

import nft_card from '../../../../public/assets/images/nft_management.svg';
import video_card from '../../../../public/assets/images/video_management.svg';
import game_card from '../../../../public/assets/images/game_management.svg';
import gallery_card from '../../../../public/assets/images/gallery_management.svg';

const ContentManagementCards = () => {
  const router = useRouter();

  const redirectTONFTManagement = () => {
    router.push('content-management/nft-management');
  };

  const redirectTOVideoManagement = () => {
    router.push('content-management/video-management');
  };

  const redirectTOGalleryManagement = () => {
    router.push('content-management/gallery-management');
  };

  const redirectTOGamesManagement = () => {
    router.push('content-management/games-management');
  };

  return (
    <>
      <div className="content-management">
        <Row xs={1} md={3} className="g-4">
          <Card>
            <Image variant="top" src={nft_card} alt="nft_card" />
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => redirectTONFTManagement()}
              >
                NFT Management
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Image variant="top" src={video_card} alt="video_card" />
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => redirectTOVideoManagement()}
              >
                Video Management
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Image variant="top" src={game_card} alt="game_card" />
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => redirectTOGamesManagement()}
              >
                Game Management
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Image variant="top" src={gallery_card} alt="gallery_card" />
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => redirectTOGalleryManagement()}
              >
                Gallery Management
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </>
  );
};

export default ContentManagementCards;
