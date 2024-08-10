import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function ConfirmModal({ confirmMessage, action, btnMessage, setter }) {
  useEffect(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return createPortal(
    <div className="absolute inset-0 flex bg-slate-200/20 backdrop-blur-md">
      <div className="flex flex-col gap-10 w-[90%] h-fit max-w-md mx-auto mt-44 bg-medium-gray p-4 z-50 rounded-lg items-center justify-center">
        <p className="text-2xl text-center font-seminbold">{confirmMessage}</p>
        <div className="flex gap-4">
          <button
            className="w-24 p-1 text-xl font-semibold text-center rounded-md bg-danger text-light-gray "
            onClick={action}
          >
            {btnMessage}
          </button>
          <button
            onClick={() => setter(false)}
            className="w-24 p-1 text-xl font-semibold text-center rounded-md bg-bright-blue text-light-gray "
          >
            No,Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmModal;
