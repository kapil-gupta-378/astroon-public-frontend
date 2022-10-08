// import Image from 'next/image';
import Image from 'next/image';
import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Button from '../../component/common/button';
// import mainHeadingBackground from '../../../public/assets/images/AST-page-heading-background.svg';
import styles from './ast.module.scss';
import tokenomicsImage from '.././../../public/assets/images/tokenomics.svg';
import HowStep from '../../component/common/how-step';
import HeadingBackground from '../../component/common/heading-background';
const data = [
  { name: '1D', uv: 10, pv: 2400, amt: 2400 },
  { name: '1Week', uv: 30, pv: 2400, amt: 2400 },
  { name: '1Month', uv: 20, pv: 2400, amt: 2400 },
  { name: '1Year', uv: 60, pv: 2400, amt: 2400 },
];
const AST = () => {
  return (
    <section className={`container ${styles.ast_page_wrap}`}>
      <HeadingBackground>
        <p className={styles.heading1}>Astroon Token</p>
        <h1 className={styles.heading2}>$ AST</h1>
      </HeadingBackground>
      <div className={styles.description_wrap}>
        <h3>Meet $AST – Astroon Token</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet feugiat
          nunc ornare adipiscing aenean ipsum pretium eu arcu. Aenean aliquam
          integer interdum facilisi fusce. Sed lacus mi dolor, feugiat.
          Pellentesque aenean ultricies facilisis gravida malesuada bibendum.
          <br /> <br />
          Diam, aliquam sit dolor faucibus in pellentesque aliquam. Morbi
          pellentesque Vulputate mauris, aliquet vitae, vitae. Turpis integer
          vestibulum nunc, id dictum et. Velit bibendum nulla non est. Elementum
          leo ultrices consequat ut sed eget magna. Gravida vitae viverra
          volutpat ornare <br /> <br /> Vulputate mauris, aliquet vitae, vitae.
          Turpis integer vestibulum nunc, id dictum et. Velit bibendum nulla non
          est. Elementum leo ultrices consequat ut sed eget magna. Gravida vitae
          viverra volutpat ornare Vulputate mauris, aliquet vitae, vitae. Turpis
          integer vestibulum nun
        </p>
      </div>
      <div className={styles.chart_wrap}>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#FCEE21"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.btn_wrap}>
          <Button>Buy $AST</Button>
        </div>
      </div>

      <HowStep title="How it Works?" />
      <div className={styles.tokenomics_wrap}>
        <h3>Tokenomics</h3>
        <div className={styles.tokenomics_image}>
          <Image
            src={tokenomicsImage}
            layout="responsive"
            alt="image tokenomics"
          />
        </div>
        <p className={styles.token_point_1}>Lorem ipsum dolor sit ame</p>
        <p className={styles.token_point_2}>Lorem ipsum dolor sit ame</p>
        <p className={styles.token_point_3}>Lorem ipsum dolor sit ame</p>
        <p className={styles.token_point_4}>Lorem ipsum dolor sit ame</p>
        <p className={styles.token_point_5}>Lorem ipsum dolor sit ame</p>
      </div>
    </section>
  );
};

export default AST;
