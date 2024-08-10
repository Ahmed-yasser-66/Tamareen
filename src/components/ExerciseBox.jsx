import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useExercises } from '../contexts/ExercisesContext';
import arrow from '../assets/arrow-right.svg';
import trash from '../assets/trash.svg';
import savedMark from '../assets/saved-mark.svg';
import unsavedMark from '../assets/unsaved-mark.svg';
import addMark from '../assets/add-mark.svg';
import Loader from './Loader';
import PlanModal from './PlanModal';
import { usePlan } from '../contexts/PlanContext';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

function ExerciseBox({ exercise, isInSavedPage, isInPlanPage }) {
  const { id } = exercise;
  const { planId } = useParams();

  const [imageIsloading, setImageIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { savedExercises, addToSavedExercises, removeFromSavedExercises } =
    useExercises();
  const { deleteExercise } = usePlan();
  const [isSaved, setIsSaved] = useState(savedExercises.includes(id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(
    function () {
      setIsSaved(savedExercises.includes(id));

      if (showDeleteModal) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }

      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    },
    [showDeleteModal, id, savedExercises]
  );

  function handleSave() {
    if (isSaved) {
      removeFromSavedExercises(id);
    } else {
      addToSavedExercises(id);
    }
  }

  function handleDelete() {
    const day = parseInt(planId, 10);
    deleteExercise(day, id);
    toast.success('Exercise deleted successfully');
  }

  return (
    <>
      {showDeleteModal && (
        <ConfirmModal
          confirmMessage={`Are you sure you want to DELETE this exercise (${exercise.name}) ?`}
          action={() => handleDelete()}
          btnMessage={'Yes, I want'}
          setter={setShowDeleteModal}
        />
      )}
      <div className="relative px-2 pt-2 rounded-lg bg-gradient-to-b from-light-blue to-bright-blue">
        {modalIsOpen && (
          <PlanModal exercise={exercise} onOpenModal={setModalIsOpen} />
        )}

        {imageIsloading && (
          <div className="absolute inset-0 flex items-center justify-center w-full rounded-lg backdrop-blur-xl bg-white/30">
            <Loader />
          </div>
        )}

        {!isInSavedPage && (
          <div className="absolute flex items-center gap-3 top-4 right-4">
            {!isInPlanPage ? (
              <img
                src={addMark}
                className={`w-10 h-10 cursor-pointer ${modalIsOpen ? 'rotate-45' : ''} transition-all duration-75`}
                onClick={() => setModalIsOpen((open) => !open)}
              />
            ) : (
              <img
                src={trash}
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowDeleteModal(true)}
              />
            )}
            <div
              className="p-2 rounded-full cursor-pointer bg-bright-blue"
              onClick={handleSave}
            >
              {isSaved ? (
                <img className="w-4 h-4" src={savedMark} />
              ) : (
                <img className="w-4 h-4" src={unsavedMark} />
              )}
            </div>
          </div>
        )}

        <img
          onLoad={() => setImageIsLoading(false)}
          src={exercise.gifUrl}
          className="w-full rounded-lg"
          loading="lazy"
        />

        <h3 className="my-3 text-xl font-semibold">{exercise.name}</h3>

        <div className="flex justify-between my-4">
          <p className="flex items-center px-4 py-2 text-sm uppercase rounded-full text-light-gray bg-dark-gray">
            {exercise.bodyPart}
          </p>
          <Link
            to={`/app/${id}`}
            className="flex items-center gap-1 text-lg underline transition-all duration-50 underline-offset-2 hover:opacity-90"
          >
            More Details
            <img src={arrow} className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default ExerciseBox;
