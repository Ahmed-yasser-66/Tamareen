import myImg from '../assets/myImg.png';
import githubIcon from '../assets/github.svg';
import linkedinIcon from '../assets/linkedin.svg';
import { calculateYears } from '../helpers';

function Creator() {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <div className="flex flex-col flex-grow gap-10 my-10">
          <div className="w-full px-6 max-w-[40rem] mx-auto flex items-center flex-col gap-6 ">
            <img
              src={myImg}
              className="object-cover border-4 rounded-full w-36 h-36 shadow-custom-glow sm:w-40 sm:h-40 border-bright-blue"
              alt="Creator's portrait"
            />
            <h2 className="px-2 py-1 text-2xl font-semibold border-4 rounded-full sm:text-3xl border-bright-blue animate__swing">
              Ahmed Yasser
            </h2>
            <div className="flex gap-4 sm:gap-6">
              <a
                className="cursor-pointer"
                href="https://github.com/Ahmed-yasser-66"
                target="blank"
              >
                <img
                  src={githubIcon}
                  className="w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-bright-blue shadow-custom-glow"
                  alt="github logo"
                />
              </a>
              <a
                className="cursor-pointer"
                href="https://www.linkedin.com/in/ahmed-yasser-689391250/"
                target="blank"
              >
                <img
                  src={linkedinIcon}
                  className="w-8 h-8 rounded-md sm:w-10 sm:h-10 bg-bright-blue shadow-custom-glow"
                  alt="linkedIn logo"
                />
              </a>
            </div>

            <ul className="flex flex-col gap-5 text-xl font-normal text-center sm:text-2xl text-blanace ">
              <li>
                👨‍💻 I&apos;m a developer based in Egypt. I began my programming
                journey when I was 15 years old.
                <br />
                {`(Cuurently...I'm ${calculateYears('6-6-2007')} 😃) `}
              </li>
              <li>
                ☕ I&apos;m a coffee lover; I can not code without a cup of
                coffee by my side.
              </li>
              <li>
                📚 I enjoy reading books, especially on Islamic teachings and
                self-development.
              </li>
              <li>
                🏋️‍♂️ I hit the gym three times a week. By the way, I created this
                website to help me easily find exercises for my training plan.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Creator;
