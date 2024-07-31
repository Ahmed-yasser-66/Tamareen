import { Outlet } from 'react-router-dom';
import HomeNav from './HomeNav';
import Footer from './Footer';

function HomeLayout() {
  return (
    <>
      <HomeNav />
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout;
