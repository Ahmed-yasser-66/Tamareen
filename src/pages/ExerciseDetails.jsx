import { useState } from 'react';
import { Link } from 'react-router-dom';

// import { getExercise, getYtVideos } from '../utils/fetchData';
import arrowLeft from '../assets/arrow-left.svg';
import Loader from '../components/Loader';
import { useExercise } from '../hooks/useExercise';
import { useYoutubeVideos } from '../hooks/useYoutubeVideos';
import Footer from '../components/Footer';

function ExerciseDetails() {
  const {
    exercise,
    isLoading: isLoadingExercise,
    error: exerciseError,
  } = useExercise();

  const {
    ytData,
    isLoading: isLoadingVideos,
    error: videosError,
  } = useYoutubeVideos(exercise ? exercise.name : '');

  const [imageIsloading, setImageIsLoading] = useState(true);

  if (isLoadingExercise || isLoadingVideos) return <Loader />;

  if (exerciseError || videosError)
    return (
      <p className="mt-8 text-2xl font-semibold">
        {exerciseError.message || videosError.message} 😥
      </p>
    );

  const ytVideos = ytData.contents;

  return (
    <>
      <Link
        to="/app"
        className="flex items-center gap-2 p-2 mt-10 ml-8 rounded-lg w-fit bg-bright-blue"
      >
        <img src={arrowLeft} className="w-5 h-5" />
        Back To All Exercises
      </Link>
      <div className="flex flex-col gap-6 px-5 py-10 mx-auto border-b-4 md:px-12 md:py-24 md:flex-row border-bright-blue">
        <div className="w-full mx-auto max-w-[35rem] p-2 rounded-xl bg-gradient-to-b from-light-blue to-bright-blue h-auto">
          {imageIsloading && (
            <div className="flex items-center justify-center w-full h-full bg-white">
              <Loader />
            </div>
          )}

          <img
            src={exercise.gifUrl}
            className="w-full h-full rounded-xl"
            onLoad={() => setImageIsLoading(false)}
          />
        </div>

        <div className="flex flex-col gap-6 px-5 mt-6 md:mt-0">
          <h1 className="text-3xl font-semibold underline sm:text-4xl underline-offset-4 text-gradient decoration-bright-blue">
            {exercise.name}
          </h1>

          <div className="flex flex-col gap-5 mt-4">
            <h2 className="text-2xl font-medium sm:text-3xl">Instructions :</h2>
            <ol className="flex flex-col gap-5 text-xl list-decimal">
              {exercise.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ol>
          </div>

          <ul className="flex flex-col gap-6 mt-6 list-disc">
            <li className="text-xl uppercase">
              Body Part :{' '}
              <span className="px-2 py-0.5 ml-2 capitalize rounded-md bg-bright-blue">
                {exercise.bodyPart}
              </span>
            </li>

            <li className="text-xl uppercase">
              Target :{' '}
              <span className="px-2 py-0.5 ml-2 capitalize rounded-md bg-bright-blue">
                {exercise.target}
              </span>
            </li>

            <li className="text-xl uppercase ">
              secondary Muscles :{' '}
              <div className="flex flex-wrap gap-2 mt-2">
                {exercise.secondaryMuscles.map((muscle, i) => (
                  <span
                    className="px-2 py-0.5 ml-2 capitalize rounded-md bg-bright-blue "
                    key={i}
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center w-[90%] max-w-[70rem]  mx-auto mt-6">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Youtube videos on the{' '}
          <span className="text-2xl font-bold sm:text-3xl text-bright-blue">
            {exercise.name}
          </span>{' '}
          exercise
        </h2>

        <div className="flex flex-col gap-8 my-12 md:flex-row">
          {ytVideos?.slice(0, 3)?.map((item, index) => (
            <a
              key={index}
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            >
              <div className="p-0 overflow-hidden rounded-lg bg-gradient-to-b from-light-blue to-bright-blue ">
                <img
                  className="object-cover w-full h-64 transition-all duration-150 ease-linear rounded-lg hover:scale-105 aspect-video"
                  src={item.video.thumbnails[0].url}
                />
                <div className="p-2">
                  <p className="mt-2 text-xl font-semibold text-left">
                    {item.video.title.length > 35
                      ? item.video.title.substring(0, 20) + '...'
                      : item.video.title}
                  </p>
                  <p className="mt-1 text-left">
                    <span className="text-lg ">Chanell</span> :{' '}
                    {item.video.channelName}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExerciseDetails;
