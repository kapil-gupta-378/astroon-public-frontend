import { getContentListDataApi } from '../../../services/api/content/content';
import {
  setContentData,
  setContentDataLoading,
  setContentDataUpdate,
  setContentListCount,
} from './contentSlice';
export const fetchContentListData = (paramsData, moreData = false) => {
  return async (dispatch) => {
    try {
      if (!moreData) {
        dispatch(setContentDataLoading(true));
        const data = await getContentListDataApi(paramsData);
        if (data.rows.length !== 0) {
          dispatch(setContentData(data.rows));
        } else {
          dispatch(setContentData([]));
        }
        dispatch(setContentListCount(data.count));
      } else {
        const data = await getContentListDataApi(paramsData);
        dispatch(setContentDataUpdate(data.rows));
      }
      dispatch(setContentDataLoading(false));
    } catch (error) {
      dispatch(setContentDataLoading(false));
    }
  };
};
