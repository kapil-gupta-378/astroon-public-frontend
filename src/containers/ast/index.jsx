// import Image from 'next/image';
import React from 'react';
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Button from '../../component/common/button';
// import mainHeadingBackground from '../../../public/assets/images/AST-page-heading-background.svg';
import styles from './ast.module.scss';
import HowStep from '../../component/common/how-step';
import HeadingBackground from '../../component/common/heading-background';
const lineChartData = [
  { name: '1D', uv: 10, pv: 2400, amt: 2400 },
  { name: '1Week', uv: 30, pv: 2400, amt: 2400 },
  { name: '1Month', uv: 20, pv: 2400, amt: 2400 },
  { name: '1Year', uv: 60, pv: 2400, amt: 2400 },
];
const pieChartData = [
  { name: 'Group A', value: 400, name: 'akpi' },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group D', value: 200 },
];
const AST = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <section className={`container ${styles.ast_page_wrap}`}>
      <div className={styles.banner}>
        <HeadingBackground>
          <p>Astroon Token</p>
          <h1>$ AST</h1>
        </HeadingBackground>
      </div>

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
            <LineChart data={lineChartData}>
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

        <PieChart width={700} height={700}>
          <Pie
            data={pieChartData}
            cx={350}
            cy={300}
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={250}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </section>
  );
};

export default AST;
