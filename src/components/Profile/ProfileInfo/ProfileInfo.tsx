/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/button-has-type */
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Img from '../../Reusable/components/Img';
import { UserInfoProps } from '../../../firebase/firestore/getInfo/getUserInfo';
import StatsInfo from './StatsInfo';
import useCurrentUser from '../../../hooks/currentUser';
import savePhoto from '../../../firebase/storage/savePhoto';
import changeProfilePic from '../../../firebase/firestore/changeProfile/changeProfilePic';
import { changeUser } from '../../../redux/currentUser';

interface ProfileInfoprops {
  info: UserInfoProps;
}

function ProfileInfo({ info }: ProfileInfoprops) {
  const dispatch = useDispatch();
  const change = useSelector((state: RootState) => state.change.change);
  const imageRef = useRef<HTMLInputElement>(null);
  const [currentUser, currentUserId] = useCurrentUser();
  const { name, profilePicture, followingCount, followerCount, postCount, id } =
    info;
  const statsInfo = {
    name,
    followerCount,
    followingCount,
    postCount,
    currentUserId,
    id,
  };
  const changePicture = async () => {
    if (imageRef.current?.files && imageRef.current.files.length > 0) {
      const url = await savePhoto(imageRef.current?.files[0] as File);
      changeProfilePic(currentUserId, url);
      dispatch(
        changeUser({ currentUser, id: currentUserId, profilePicture: url }),
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex border-b pb-5 px-10">
      <div className="w-min self-center pr-10">
        {info.id === currentUserId ? (
          <label
            htmlFor="avatarPic"
            className="custom-file-upload"
          >
            <div className="hover:cursor-pointer relative h-auto w-auto ">
              <div style={{ pointerEvents: 'none' }}>
                <Img
                  link={
                    imageRef.current?.files && imageRef.current.files.length > 0
                      ? URL.createObjectURL(imageRef.current?.files[0])
                      : profilePicture
                  }
                  height={8}
                  width={8}
                  borderRadius={50}
                />
              </div>
              <div
                className="hover:bg-opacity-40 hover:bg-black text-transparent hover:text-white w-full h-full absolute top-0 t text-4xl flex items-center justify-center z-2"
                style={{ borderRadius: '50%' }}
              >
                <i className="fa-solid fa-plus" />
              </div>
            </div>
            <input
              type="file"
              id="avatarPic"
              name="avatarPic"
              accept="image/png, image/jpeg"
              className="hidden"
              ref={imageRef}
              onChange={changePicture}
            />
          </label>
        ) : (
          <Img
            link={profilePicture}
            height={8}
            width={8}
            borderRadius={50}
          />
        )}
      </div>
      <StatsInfo stats={statsInfo} />
    </div>
  );
}

export default ProfileInfo;
