import { useNavigate, useParams } from 'react-router-dom';
import { usePlan } from '../contexts/PlanContext';
import PlanForm from '../components/PlanForm';
import PlanDay from '../components/PlanDay';
import settings from '../assets/settings.svg';
import { useEffect, useState } from 'react';
import Settings from '../components/Settings';

function Plan() {
  const { name, days } = usePlan();
  const { planId } = useParams();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (showSettings) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showSettings]);

  function handleSelectDay(index) {
    navigate(`/plan/${index + 1}`, { replace: true });
    window.scrollBy({ top: 300, behavior: 'smooth' });
  }

  if (!name || !days) return <PlanForm />;

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center gap-4 mt-8 text-center sm:flex-row">
        <h1 className="text-3xl underline sm:text-4xl underline-offset-4 decoration-bright-blue">
          Your Plan : <span className="text-gradient">{name}</span>
        </h1>
        <img
          src={settings}
          className={`w-10 h-10 p-1 rounded-full cursor-pointer bg-bright-blue ${showSettings ? 'rotate-45' : ''} transition-all duration-75`}
          alt="Settings"
          onClick={() => setShowSettings((show) => !show)}
        />

        {showSettings && <Settings setShowSettings={setShowSettings} />}
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-6 px-4 mx-auto mt-16 sm:flex-row max-w-[80%] flex-wrap">
        {Array.from({ length: days }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-48 h-24 py-4 text-center rounded-lg cursor-pointer md:w-96 animatingGradient ${+planId === +(index + 1) ? 'border-white border-4' : ''}`}
            onClick={() => handleSelectDay(index)}
          >
            <span className="text-3xl font-semibold">Day {index + 1}</span>
          </div>
        ))}
      </div>
      <PlanDay />
    </div>
  );
}

export default Plan;
