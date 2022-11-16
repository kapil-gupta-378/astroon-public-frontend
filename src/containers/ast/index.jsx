// import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
import styles from './ast.module.scss';
import HowStep from '../../component/common/how-step';
import HeadingBackground from '../../component/common/heading-background';
import BuyTokenModal from '../../component/ui/buy-token-modal/BuyTokenModal';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalLoading } from '../../redux/global-loading/globalLoadingSlice';
import { buyToken } from '../../../services/web3/tokenMothods';
import { fetchTokenDataAction } from '../../redux/token/tokenAction';
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
  const [showBuyTokenModal, setShowBuyTokenModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const { walletAddress, isUserConnected } = useSelector(
    (state) => state.walletReducer,
  );
  const { tokenData } = useSelector((state) => state.tokenReducer);
  const { userData } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchTokenDataHandler();
  }, []);
  const fetchTokenDataHandler = async () => {
    dispatch(fetchTokenDataAction());
  };

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

  const buyTokenHandler = async () => {
    if (isUserConnected) {
      try {
        if (tokenData.isPrivateSale || tokenData.isPublicSale) {
          let tokenTransaction;
          if (tokenData.isPrivateSale) {
            if (userData.whiteListedUser) {
              dispatch(setGlobalLoading(true));
              tokenTransaction = await buyToken(
                sliderValue,
                tokenData.rate,
                walletAddress,
                tokenData.isPrivateSale,
              );
            } else {
              toast.error('Currently token are availble for private user', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            dispatch(setGlobalLoading(true));
            tokenTransaction = await buyToken(
              sliderValue,
              tokenData.rate,
              walletAddress,
              tokenData.isPrivateSale,
            );
          }

          if (tokenTransaction.status) {
            toast.success('Token Transfered Successfully', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setShowBuyTokenModal(false);
            dispatch(setGlobalLoading(false));
          }
        } else {
          toast.error('Sale is not live', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        dispatch(setGlobalLoading(false));
      }
    } else {
      toast.error('Please connect your wallet', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
          <Button onClick={() => setShowBuyTokenModal(true)}>Buy $AST</Button>
        </div>
      </div>

      <HowStep title="How it Works?" />
      <div className={styles.tokenomics_wrap}>
        <h3>Tokenomics</h3>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={140}
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
        </ResponsiveContainer>
      </div>
      <BuyTokenModal
        tokenData={tokenData}
        sliderOnChange={setSliderValue}
        sliderValue={sliderValue}
        modalShowHandler={setShowBuyTokenModal}
        modalShow={showBuyTokenModal}
        selectedQuantity={sliderValue}
        handleFunction={buyTokenHandler}
      />
      <ToastContainer />
    </section>
  );
};

export default AST;
