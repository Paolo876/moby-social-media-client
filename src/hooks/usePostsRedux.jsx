import { useSelector, useDispatch } from 'react-redux';
import { postsActions } from '../redux/reducers/postsSlice';
import { getPosts, createPost,likePost } from '../redux/reducers/postsReducers';

export default function usePostsRedux() {
    const dispatch = useDispatch();
    const postsRedux = useSelector(state => state.posts)
    if(postsRedux) {
      return {
        ...postsRedux,
        getPosts: data => dispatch(getPosts(data)),
        createPost: data => dispatch(createPost(data)),
        likePost: data => dispatch(likePost(data)),
      };
    } else {
      throw Error('Error accessing posts reducer.');
    }
  }