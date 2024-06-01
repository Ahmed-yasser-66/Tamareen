import { Link } from 'react-router-dom';
import dumbellIcon from '../assets/dumbbell-solid.svg';
import maleAvatar from '../assets/male-avatar.svg';
import femaleAvtar from '../assets/female-avatar.svg';
import Dropdown from './Dropdown';
import { useUser } from '../contexts/UserContext';

function AppNav() {
  const { userName, userGender } = useUser();

  if (!userName || !userGender) return null;

  return (
    <nav className="flex items-center justify-between px-2 py-3 overflow-visible text-dark-gray md:px-32 sm:py-4 bg-bright-blue">
      <div className="flex items-center gap-2 sm:gap-4">
        <img src={dumbellIcon} className="w-5 h-5 sm:h-8 sm:w-8" />
        <Link
          to="/"
          className="text-xl font-semibold tracking-widest uppercase sm:text-3xl"
        >
          Tamareen
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-10 h-10 px-1 py-1 rounded-full bg-medium-gray sm:px-2 sm:py-2 sm:w-14 sm:h-14">
          {userGender === 'male' ? (
            <img src={maleAvatar} />
          ) : (
            <img src={femaleAvtar} />
          )}
        </div>

        <h2 className="text-lg font-semibold sm:text-2xl">
          Welcome, {userName}!
        </h2>
        <Dropdown />
      </div>
    </nav>
  );
}

export default AppNav;
