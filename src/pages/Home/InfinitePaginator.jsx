import { useEffect } from 'react'
import usePostsRedux from '../../hooks/usePostsRedux';
import { useInView } from 'react-intersection-observer';


const InfinitePaginator = () => {
  const { isLoading, error, getPosts, pageNumber, hasMore } = usePostsRedux();
  const { ref, inView } = useInView();

  useEffect(() => {
    if(inView && hasMore && !isLoading && !error) getPosts(pageNumber + 1)

  }, [inView])
  return (
    <div ref={ref}></div>
  )
}

export default InfinitePaginator