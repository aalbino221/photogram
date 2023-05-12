import { HeaderContainer, Icon, Button } from './HeaderStyles';

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <Button>
          <h1 className="font-semibold text-2xl font-unica ">Photogram</h1>
        </Button>
      </div>
      <div className="border w-5/12 rounded py-1 px-2 flex items-center">
        <i className="fa-solid fa-magnifying-glass text-gray-300 pr-2" />
        <input className="w-full  outline-none text-gray-600 text-sm" />
      </div>
      <div className="flex gap-6">
        <Button>
          <Icon className="fa-regular fa-square-plus text-2xl" />
        </Button>
        <Button>
          <Icon className="fa-solid fa-house" />
        </Button>
        <Button>
          <Icon className="fa-solid fa-comment" />
        </Button>
        <Button>
          <Icon className="fa-solid fa-user" />
        </Button>
      </div>
    </HeaderContainer>
  );
};

export default Header;
