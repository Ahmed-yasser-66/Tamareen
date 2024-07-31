import toast from 'react-hot-toast';
import { usePlan } from '../contexts/PlanContext';
import { createPortal } from 'react-dom';
import plusMark from '../assets/plus.svg';
import minusMark from '../assets/minus.svg';
import deleteMark from '../assets/trash.svg';
import settings from '../assets/settings.svg';

function Settings({ setShowSettings }) {
  const { addDay, exercises } = usePlan();
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

  return createPortal(
    <div className="absolute inset-0 flex justify-center h-screen bg-slate-200/20 backdrop-blur-md">
      <div className="w-[90%] max-w-[20rem] bg-bright-blue rounded-lg h-fit flex flex-col gap-4 text-2xl mt-12 py-6 space-y-4 items-center">
        <div className="flex items-center justify-center gap-2 w-7 h-7">
          <img src={settings} />
          <p className="text-3xl font-semibold underline">Settings</p>
        </div>
        <button
          className="flex items-center gap-2 p-2 rounded-lg cursor-pointer bg-dark-gray w-fit"
          onClick={handleAddDay}
        >
          <img src={plusMark} className="w-4 h-4" />
          Add new day
        </button>
        <button className="flex items-center gap-2 p-2 rounded-lg cursor-pointer bg-dark-gray w-fit">
          <img src={minusMark} className="w-4 h-4" />
          remove last day
        </button>
        <button className="flex items-center gap-2 p-2 rounded-lg cursor-pointer bg-dark-gray w-fit">
          <img src={deleteMark} className="w-4 h-4" />
          Delete Plan
        </button>
      </div>
    </div>,
    document.body
  );
}

export default Settings;
