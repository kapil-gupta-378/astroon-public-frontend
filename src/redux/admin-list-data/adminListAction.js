import { getAdminListDataApi } from '../../../services/api/admin';
import {
  setAdmindata,
  setAdmindataLoading,
  setAdmindataUpdate,
  setAdminListCount,
} from '../admin-list-data/adminListSlice';

export const fetchAdminListData = (paramsData, moreData = false) => {
  return async (dispatch) => {
    try {
      if (!moreData) {
        dispatch(setAdmindataLoading(true));
        const data = await getAdminListDataApi(paramsData);
        if (data?.rows) dispatch(setAdmindata(data.rows));
        dispatch(setAdminListCount(data.count));
      } else {
        const data = await getAdminListDataApi(paramsData);
        dispatch(setAdmindataUpdate(data.rows));
      }
      dispatch(setAdmindataLoading(false));
    } catch (error) {
      dispatch(setAdmindataLoading(false));
    }
  };
};
