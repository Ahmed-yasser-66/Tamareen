import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { getExercise, getYtVideos } from '../utils/fetchData';
import arrowLeft from '../assets/arrow-left.svg';
import Loader from '../components/Loader';

function ExerciseDetails() {
  const { exercisesData, ytData } = useLoaderData();
  const [imageIsloading, setImageIsLoading] = useState(true);

  const ytVideos = ytData.contents;

  console.log(ytVideos);

  return (
    <>
      <Link to="/app">
        <button className="flex items-center gap-2 px-3 py-1 mt-10 ml-8 rounded-lg bg-bright-blue">
          <img src={arrowLeft} className="w-5 h-5" />
          Back To All Exercises
        </button>
      </Link>
      <div className="flex flex-col gap-6 px-5 py-10 mx-auto border-b-4 md:px-12 md:py-24 md:flex-row border-bright-blue">
        <div className="w-full mx-auto max-w-[35rem] p-2 rounded-xl bg-gradient-to-b from-light-blue to-bright-blue h-auto">
          {imageIsloading && (
            <div className="flex items-center justify-center w-full h-full bg-white">
              <Loader />
            </div>
          )}

          <img
            src={exercisesData.gifUrl}
            className="w-full h-full rounded-xl"
            onLoad={() => setImageIsLoading(false)}
          />
        </div>

        <div className="flex flex-col gap-6 px-5 mt-6 md:mt-0">
          <h1 className="text-3xl font-semibold underline sm:text-4xl underline-offset-4 text-gradient decoration-bright-blue">
            {exercisesData.name}
          </h1>

          <div className="flex flex-col gap-5 mt-4">
            <h2 className="text-2xl font-medium sm:text-3xl">Instructions :</h2>
            <ol className="flex flex-col gap-5 text-xl list-decimal">
              {exercisesData.instructions.map((inst) => (
                <li>{inst}</li>
              ))}
            </ol>
          </div>

          <ul className="flex flex-col gap-6 mt-6 list-disc">
            <li className="text-xl uppercase">
              Body Part :{' '}
              <span className="px-2 py-0.5 ml-2 capitalize rounded-md bg-bright-blue">
                {exercisesData.bodyPart}
              </span>
            </li>

            <li className="text-xl uppercase">
              Target :{' '}
              <span className="px-2 py-0.5 ml-2 capitalize rounded-md bg-bright-blue">
                {exercisesData.target}
              </span>
            </li>

            <li className="text-xl uppercase ">
              secondary Muscles :{' '}
              <div className="mt-2">
                {exercisesData.secondaryMuscles.map((muscle) => (
                  <span className="px-2 py-0.5 ml-2 capitalize rounded-md bg-bright-blue ">
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
            {exercisesData.name}
          </span>{' '}
          exercise
        </h2>

        <div className="flex flex-col items-center justify-between gap-12 mx-auto mt-6 md:flex-row">
          {ytVideos?.slice(0, 3)?.map((item, index) => (
            <a
              key={index}
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            >
              <div className="h-auto p-2 rounded-lg bg-gradient-to-b from-light-blue to-bright-blue w-96">
                <img className="w-full " src={item.video.thumbnails[0].url} />
                <p className="mt-2 text-lg font-semibold text-left">
                  {item.video.title}
                </p>
                <p className="mt-1 text-left">
                  <span className="text-lg ">Chanell</span> :{' '}
                  {item.video.channelName}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export async function loader({ params }) {
  const exercisesData = await getExercise(params.Id);
  const ytData = await getYtVideos(exercisesData.name);

  return { exercisesData, ytData };
}

export default ExerciseDetails;
