import { getFaqDataApi } from '../../../services/api/faq';
import { setFaqdata } from './faqSlice';

export const fetchFaqData = () => {
  return async (dispatch) => {
    try {
      const data = await getFaqDataApi();
      dispatch(setFaqdata(data.rows));
    } catch (error) {
      dispatch(setFaqdata([]));
    }
  };
};
