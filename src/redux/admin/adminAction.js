import { getAdminListDataApi } from '../../../services/api/admin';
import { setAdmindata, setAdmindataLoading } from './adminSlice';

export const fetchAdminListData = () => {
  return async (dispatch) => {
    try {
      dispatch(setAdmindataLoading(true));
      const data = await getAdminListDataApi();
      if (data.rows.length !== 0) dispatch(setAdmindata(data.rows));
      dispatch(setAdmindataLoading(false));
    } catch (error) {
      dispatch(setAdmindataLoading(false));
    }
  };
};
