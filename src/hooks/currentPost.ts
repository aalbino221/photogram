import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PostProps } from '../components/Reusable/interfaces/posts';

interface CurrentPost {
  showPost: boolean;
  postInfo: PostProps | null;
}

export default function useCurrenPost(): CurrentPost {
  const showPost = useSelector((state: RootState) => state.selectedPost.show);
  const postInfo = useSelector(
    (state: RootState) => state.selectedPost.postInfo,
  );
  return { showPost, postInfo };
}
