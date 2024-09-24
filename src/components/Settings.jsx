import toast from 'react-hot-toast';
import { usePlan } from '../contexts/PlanContext';
import { createPortal } from 'react-dom';
import plusMark from '../assets/plus.svg';
import minusMark from '../assets/minus.svg';
import deleteMark from '../assets/trash.svg';
import settings from '../assets/settings.svg';
import removeMark from '../assets/remove-mark.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function Settings({ setShowSettings }) {
  const { addDay, removeDay, exercises, deletePlan, name } = usePlan();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const newDay = exercises.length + 1;

  function handleAddDay() {
    if (exercises.length < 7) {
      addDay();
      toast.success(`Day ${newDay} succesfully added`);
      setShowSettings(false);
    } else {
      toast.error('Maximum days reached');
      setShowSettings(false);
    }
  }

  function handleRemoveDay() {
    if (exercises.length === 1) {
      navigate('/app/init', { replace: true });
      toast.success('Plan is deleted');
      deletePlan();
    } else {
      removeDay();
      navigate('/plan', { replace: true });
      toast.success('Last day removed succesfully');
      setShowSettings(false);
    }
  }

  function handleDeltePlan() {
    deletePlan();
    navigate('/app/init');
    toast.success('Plan is deleted succesfully');
  }

  return createPortal(
    <div className="absolute inset-0 flex justify-center h-screen bg-slate-200/20 backdrop-blur-md">
      {showDeleteModal ? (
        <ConfirmModal
          confirmMessage={`Are you sure you want to DELETE your plan (${name}) ?`}
          action={() => handleDeltePlan()}
          btnMessage={'Yes, I want'}
          setter={setShowDeleteModal}
        />
      ) : (
        <div className="w-[90%] max-w-[20rem] bg-bright-blue rounded-lg h-fit flex flex-col gap-4 text-2xl mt-12 py-6 space-y-4 items-center relative">
          <img
            src={removeMark}
            className="absolute p-1 rounded-lg cursor-pointer w-7 h-7 top-4 right-4 bg-danger"
            onClick={() => setShowSettings(false)}
          />
          <div className="flex items-center justify-center gap-2 w-7 h-7">
            <img src={settings} />
            <p className="text-3xl font-semibold ">Settings</p>
          </div>
          <button
            className="flex items-center justify-center w-48 gap-2 p-2 rounded-lg cursor-pointer bg-dark-gray"
            onClick={handleAddDay}
          >
            <img src={plusMark} className="w-4 h-4" />
            Add new day
          </button>
          <button
            className="flex items-center justify-center w-48 gap-2 p-2 rounded-lg cursor-pointer bg-dark-gray "
            onClick={handleRemoveDay}
          >
            <img src={minusMark} className="w-4 h-4" />
            remove last day
          </button>
          <button
            className="flex items-center justify-center w-48 gap-2 p-2 rounded-lg cursor-pointer bg-dark-gray"
            onClick={() => setShowDeleteModal(true)}
          >
            <img src={deleteMark} className="w-4 h-4" />
            Delete Plan
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}

export default Settings;
