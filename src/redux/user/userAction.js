import { getUserDataApi } from '../../../services/api/user';
import { setUserData, setUserDataLoading } from './userSlice';
export const fetchUserDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setUserDataLoading(true));
      const data = await getUserDataApi();
      dispatch(setUserData(data.data));
      dispatch(setUserDataLoading(false));
    } catch (error) {
      dispatch(
        setUserData({
          bio: '',
          displayName: '',
          email: '',
          customUrl: '',
          assets: [],
        }),
      );

      dispatch(setUserDataLoading(false));
    }
  };
};
