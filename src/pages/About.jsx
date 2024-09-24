import FitPeople from '../assets/fit-people.svg';

function About() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center">
        <main>
          <div className="flex flex-col items-center justify-between md:flex-row w-full max-w-[65rem] mx-auto p-6 gap-4 sm:gap-12 sm:mt-16 ">
            <div className="flex flex-col gap-8">
              <h1 className="mt-8 text-2xl underline sm:text-5xl decoration-bright-blue underline-offset-4">
                About <span className="font-bold text-gradient ">Tamareen</span>
              </h1>
              <p className="text-lg font-medium leading-relaxed tracking-wide sm:text-2xl">
                Welcome to Tamareen! We are your ultimate fitness companion,
                <span className="font-semibold text-gradient">
                  offering GIFs for every exercise
                </span>{' '}
                along with{' '}
                <span className="font-semibold text-gradient">
                  detailed instructions.
                </span>{' '}
                You can also find YouTube videos for each move, ensuring you get
                the technique just right.
                <span className="font-semibold text-gradient">
                  Easily search and find exercises by category.
                </span>{' '}
                Whether you are a beginner or a pro, Tamareen is here to help
                you crush your fitness goals. Join us and{' '}
                <span className="font-semibold text-gradient">
                  make your workouts awesome!
                </span>
              </p>
            </div>

            <div>
              <div className="w-[17rem] h-[17rem] md:w-[25rem] md:h-[25rem] flex justify-center items-center mt-4   ">
                <img src={FitPeople} className="z-50 w-full" alt="Fit Man" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default About;
