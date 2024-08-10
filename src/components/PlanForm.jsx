import { useState } from 'react';
import { usePlan } from '../contexts/PlanContext';
import toast from 'react-hot-toast';

function PlanForm() {
  const { changeName, changeDays } = usePlan();

  const [planName, setPlanName] = useState('');
  const [numDays, setNumDays] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!planName || !numDays) {
      toast.error('Fill out all fields');
      return;
    }

    localStorage.setItem('planName', planName);
    localStorage.setItem('planDays', numDays);

    changeName(planName);
    changeDays(numDays);
  }

  return (
    <div className="absolute inset-0 flex bg-slate-200/20 backdrop-blur-md">
      <form
        className="flex flex-col gap-4 w-[90%] h-fit max-w-xl mx-auto mt-16 bg-gradient-to-t from-light-blue to-bright-blue p-4 z-50 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="mt-2 text-3xl font-semibold text-center">
          Create your plan 💪
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xl font-semibold">
            Plan Name
          </label>
          <input
            className="px-2 py-1 text-xl rounded-md text-dark-gray focus:outline-none focus:ring focus:ring-bright-blue"
            id="name"
            type="text"
            placeholder="Enter your plan name..."
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="days" className="text-xl font-semibold">
            Number of days
          </label>
          <select
            className="px-2 py-1 text-xl rounded-md text-dark-gray focus:outline-none focus:ring focus:ring-bright-blue"
            id="days"
            value={''}
            onChange={(e) => setNumDays(e.target.value)}
          >
            <option value={0}>Choose number of days</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>
        </div>
        <button className="px-2 py-2 mx-auto mt-6 text-lg font-semibold uppercase transition-all duration-100 rounded-lg w-36 bg-dark-gray hover:bg-medium-gray">
          create
        </button>
      </form>
    </div>
  );
}

export default PlanForm;
