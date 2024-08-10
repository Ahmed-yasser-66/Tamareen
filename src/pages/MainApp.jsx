import AppNav from '../components/AppNav';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import { useUser } from '../contexts/UserContext';
import UserForm from '../components/UserForm';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import ConfirmAction from '../components/ConfirmModal';
import ConfirmModal from '../components/ConfirmModal';

function MainApp() {
  const { userName, userGender } = useUser();

  return (
    <div className="relative flex flex-col min-h-screen">
      {!userName || !userGender ? <UserForm /> : null}

      <div className="flex-1 ">
        <AppNav />
        <Categories />
        <SearchBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainApp;
