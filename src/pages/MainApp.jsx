import AppNav from '../components/AppNav';
import SearchBar from '../components/SearchBar';
import Exercises from '../components/Exercises';
import Categories from '../components/Categories';
import { useUser } from '../contexts/UserContext';
import UserForm from '../components/UserForm';

function MainApp() {
  const { userName, userGender } = useUser();

  return (
    <div className="relative flex flex-col min-h-screen">
      {!userName || !userGender ? <UserForm /> : null}

      <div className="flex-1 ">
        <AppNav />
        <Categories />
        <SearchBar />
        <Exercises />
      </div>

      <footer className="h-12 bg-bright-blue"></footer>
    </div>
  );
}

export default MainApp;
