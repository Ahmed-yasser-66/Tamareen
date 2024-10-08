import { Link } from 'react-router-dom';

import fitMan from '../assets/fit-man.svg';

import arrowRight from '../assets/arrow-right.svg';

function Hero() {
  return (
    <main className="flex flex-col items-center justify-between md:flex-row w-full md:w-[65rem] mx-auto p-6">
      <div>
        <h1 className="text-5xl leading-snug sm:text-7xl ">
          Enhance your
          <br />
          Gym Workouts
          <br />
          with
          <br />
          <span className="font-bold text-gradient">TAMAREEN !</span>
        </h1>
        <Link to="/app" className="gap-2 felx">
          <button className="flex items-center gap-4 px-4 py-2 mt-6 mb-4 text-xl font-semibold rounded-lg sm:mt-10 sm:mb-6 bg-bright-blue text-light-gray">
            Start Now
            <img src={arrowRight} className="w-5 " />
          </button>
        </Link>
      </div>

      <div>
        <div className="w-[17rem] h-[17rem] md:w-[25rem] md:h-[25rem] flex justify-center items-center mt-6  bg-bright-blue rounded-full overflow-hidden">
          <img src={fitMan} alt="Fit Man" />
        </div>
      </div>
    </main>
  );
}

export default Hero;
