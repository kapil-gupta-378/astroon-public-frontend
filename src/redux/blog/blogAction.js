import { getBlogDataApi } from '../../../services/api/blog/blog';
import { setBlogdata, setBlogdataCount, setBlogdataLoading } from './blogSlice';

export const fetchBlogData = (currentPage, more) => {
  return async (dispatch) => {
    try {
      dispatch(setBlogdataLoading(true));
      const data = await getBlogDataApi(currentPage, 6);
      if (data.data.rows.length !== 0) dispatch(setBlogdata(data.data.rows));
      if (more === false) dispatch(setBlogdataCount(data.data.count));
      dispatch(setBlogdataLoading(false));
    } catch (error) {
      dispatch(setBlogdataLoading(false));
    }
  };
};
