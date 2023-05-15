/* eslint-disable react/button-has-type */
import lindy from '../../assets/lindy.jpeg';
import Img from '../Reusable/Img';

function ProfileInfo() {
  return (
    <div className="flex border-b pb-5 px-10">
      <div className="w-min self-center pr-10">
        <Img
          link={lindy}
          height={8}
          width={8}
          borderRadius={50}
        />
      </div>
      <div className="w-7/12 flex flex-col gap-3">
        <div className="flex gap-5">
          <h2 className="text-lg font-bold">Lindyzinha231</h2>
          <button className="bg-blue-600 text-white rounded px-6">
            Seguir
          </button>
          <button className=" rounded px-3 bg-gray-400 text-white">
            Mensagem
          </button>
        </div>
        <div className="flex gap-3">
          <div>
            <p className="text-gray-800 font-semibold">1 Following</p>
          </div>
          <div>
            <p className="text-gray-800 font-semibold">1 Followers</p>
          </div>
          <div>
            <p className="text-gray-800 font-semibold">1 Posts</p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          posuere sagittis nulla a cursus. Vestibulum consectetur ut quam
          ultrices commodo. Mauris a nisl semper, scelerisque nisi ut, ultricies
          nisl.
        </p>
      </div>
    </div>
  );
}

export default ProfileInfo;
