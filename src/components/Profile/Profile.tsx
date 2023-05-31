/* eslint-disable @typescript-eslint/no-unused-vars */
import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfilePosts from './ProfilePosts/ProfilePosts';
import getProfilePosts from '../../firebase/firestore/getInfo/getProfilePosts';
import getUserInfo, {
  UserInfoProps,
} from '../../firebase/firestore/getInfo/getUserInfo';
import ProfileSkeleton from './ProfileSkeleton';

interface ProfilePost {
  id: string;
  photoUrl: string;
}

const defaultValue = {
  id: '',
  name: '',
  profilePicture: '',
  followingCount: 0,
  followerCount: 0,
  postCount: 0,
};

const defaultValuePosts = {
  id: '',
  photoUrl: '',
};

const ProfileContainer = tw.div`
  mx-auto
  w-6/12
  flex
  py-16
  flex-col
  gap-12
`;

export default function Profile() {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const [posts, setPosts] = useState<Array<ProfilePost> | null>(null);
  const [profileInfo, setProfileInfo] = useState<UserInfoProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getProfilePosts(userId);
      setPosts(data);
    };
    fetchPosts();
    const fetchInfo = async () => {
      const data = await getUserInfo(userId);
      setProfileInfo(data);
      setLoading(false);
    };
    fetchInfo();
  }, [userId]);

  if (loading) {
    return (
      <ProfileContainer>
        <ProfileSkeleton />
      </ProfileContainer>
    );
  }
  return (
    <ProfileContainer>
      <ProfileInfo info={profileInfo || defaultValue} />
      <ProfilePosts posts={posts || [defaultValuePosts]} />
    </ProfileContainer>
  );
}
