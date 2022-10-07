import React from 'react';
import Button from '../../common/button';
import style from './playcreateearn.module.scss';

const PlayCreateEarn = () => {
  return (
    <div className={style.playcreateearn_wrp}>
      <div className={`${style.playcreateearn_content} container-fluid`}>
        <h3>Play, Create and Earn</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet feugiat
          nunc ornare adipiscing aenean ipsum pretium
          <br /> eu arcu. Aenean aliquam integer interdum facilisi fusce. Sed
          lacus mi dolor,
        </p>
        <Button kind="text">View More</Button>
      </div>
    </div>
  );
};

export default PlayCreateEarn;
