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
import styles from './ast.module.scss';
import HowStep from '../../component/common/how-step';
import HeadingBackground from '../../component/common/heading-background';
import BuyTokenModal from '../../component/ui/buy-token-modal/BuyTokenModal';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalLoading } from '../../redux/global-loading/globalLoadingSlice';
import { buyToken } from '../../../services/web3/tokenMothods';
import { fetchTokenDataAction } from '../../redux/token/tokenAction';
import { getWalletAstTokenBalance } from '../../../services/web3/walletMothods';
import { setBalance } from '../../redux/persist/wallet/walletSlice';
import SaleDetailCard from '../../component/common/sale-detail-card';
import { postTokenBuyTransaction } from '../../../services/api/astroon-token';
import moment from 'moment/moment';
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
  const [currentSaleLastBuy, setCurrentSaleLastBuy] = useState(0);
  const { walletAddress, isUserConnected } = useSelector(
    (state) => state.walletReducer,
  );

  const {
    tokenData,
    seedSale,
    privateSale,
    publicSale,
    saleOnData,
    saleRoundOn,
  } = useSelector((state) => state.tokenReducer);
  const { userData, claimingToken } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTokenDataHandler();
  }, []);

  useEffect(() => {
    if (tokenData?.saleData?.saleRound && claimingToken) {
      const obj = claimingToken.find((item) => {
        return item.saleRound == tokenData?.saleData?.saleRound;
      });

      if (obj === undefined) {
        setCurrentSaleLastBuy(0);
      } else {
        setCurrentSaleLastBuy(obj.totalBuyToken);
      }
    }
  }, [tokenData, claimingToken]);

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
    try {
      // throw Error when user not connected to website
      if (!isUserConnected) throw new Error('Please connect your wallet');
      if (sliderValue < Number(tokenData?.rate?.minBound))
        throw new Error(
          `You can not buy less than ${tokenData?.rate?.minBound} token`,
        );

      // throw Error when sale is not on
      if (!tokenData.isPrivateSale && !tokenData.isPublicSale)
        throw new Error('Sale is not live');

      // checking private sale is on
      if (tokenData.isPrivateSale) {
        // throw Error when user is not white list user
        if (saleOnData.isPrivate && !userData.whiteListedUser)
          throw new Error('Currently token are availble for private user');
        if (saleOnData.isSeed && !userData.seedUser)
          throw new Error('Currently token are availble for seed user');
      }

      let tokenTransaction;
      // invoking token buy funtion if no error
      dispatch(setGlobalLoading(true));
      tokenTransaction = await buyToken(
        sliderValue,
        tokenData.rate.rate,
        walletAddress,
        tokenData,
      );
      const currentDate = moment().format('');
      if (tokenTransaction.status) {
        const data = {
          walletAddress: walletAddress,
          saleRound: tokenData.saleData.saleRound,
          buyToken: sliderValue,
          saleType: tokenData.saleData.isSeed
            ? 'Seed sale'
            : tokenData.saleData.isPrivate
            ? 'Private sale'
            : 'Public sale',
          purchaseDate: currentDate,
        };
        await postTokenBuyTransaction(data);
        toast.success('Token Transfered Successfully');
        setShowBuyTokenModal(false);
        dispatch(setGlobalLoading(false));
        dispatch(fetchTokenDataAction());
        const walletBalance = await getWalletAstTokenBalance(walletAddress);
        dispatch(setBalance(walletBalance));
      }
    } catch (error) {
      console.error(error);
      dispatch(fetchTokenDataAction());
      dispatch(setGlobalLoading(false));
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  };

  const closeModal = () => {
    setShowBuyTokenModal(false);
    setSliderValue(1);
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
      <div className={styles.Sale_card_wrap}>
        <div style={{ width: '350px' }}>
          <SaleDetailCard
            data={seedSale}
            key={1}
            isSaleOn={saleOnData.isSeed && tokenData.isPrivateSale}
            buyTokenHandler={() => setShowBuyTokenModal(true)}
            saleRoundOn={saleRoundOn}
          />
        </div>
        <div style={{ width: '350px' }}>
          <SaleDetailCard
            data={privateSale}
            key={2}
            isSaleOn={saleOnData.isPrivate && tokenData.isPrivateSale}
            buyTokenHandler={() => setShowBuyTokenModal(true)}
            saleRoundOn={saleRoundOn}
          />
        </div>
        <div style={{ width: '350px' }}>
          <SaleDetailCard
            data={publicSale}
            key={3}
            isSaleOn={saleOnData.isPublic && tokenData.isPublicSale}
            buyTokenHandler={() => setShowBuyTokenModal(true)}
            saleRoundOn={saleRoundOn}
          />
        </div>
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
        modalShowHandler={closeModal}
        modalShow={showBuyTokenModal}
        selectedQuantity={sliderValue}
        handleFunction={buyTokenHandler}
        lastBuy={currentSaleLastBuy}
      />
    </section>
  );
};

export default AST;
