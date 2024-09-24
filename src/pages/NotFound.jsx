import { Link } from 'react-router-dom';
import notFoundImg from '../assets/404.svg';
import arrowLeft from '../assets/arrow-left.svg';

function NotFound() {
  return (
    <div className="flex flex-col items-center w-full h-full px-6 mx-auto mt-8 gap-6 max-w-[80rem] justify-evenly sm:flex-row sm:mt-24">
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-9xl text-gradient">404</h1>
        <h2 className="text-4xl font-semibold tracking-wide">
          Oops,Page Not Found!
        </h2>
        <p className="text-2xl font-medium sm:text-3xl">
          You might be lost trying to{' '}
          <Link
            replace
            to="/app"
            className="underline text-gradient decoration-bright-blue"
          >
            Find Exercises{' '}
          </Link>
          😁
        </p>
        <Link
          replace
          to="/"
          className="flex items-center gap-2 px-3 py-1 text-xl font-semibold rounded-lg w-fit bg-bright-blue"
        >
          <img src={arrowLeft} className="w-5 h-5" /> Back to Home
        </Link>
      </div>
      <div>
        <img
          src={notFoundImg}
          className="h-96 w-96"
          alt="Error illustration for descriping not founding a page"
        />
      </div>
    </div>
  );
}

export default NotFound;
