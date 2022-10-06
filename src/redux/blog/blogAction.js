import { getBlogDataApi } from '../../../services/api/blog/blog';
import { setBlogdata } from './blogSlice';

export const fetchBlogData = () => {
  return async (dispatch) => {
    const data = await getBlogDataApi();
    dispatch(setBlogdata(data.rows));
  };
};
