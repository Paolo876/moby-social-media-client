import { useSelector, useDispatch } from 'react-redux';
import { postsActions } from '../redux/reducers/postsSlice';
import { getPosts, createPost } from '../redux/reducers/postsReducers';

export default function usePostsRedux() {
    const dispatch = useDispatch();
    const postsRedux = useSelector(state => state.posts)
    if(postsRedux) {
      return {
        ...postsRedux,
        getPosts: data => dispatch(getPosts(data)),
        createPost: data => dispatch(createPost(data)),
      };
    } else {
      throw Error('Error accessing posts reducer.');
    }
  }