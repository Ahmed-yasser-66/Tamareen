import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function UserForm() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const { updateUserName, updateUserGender, userName, userGender, isEditMode } =
    useUser();

  useEffect(
    function () {
      setName(userName);
      setGender(userGender);
    },
    [userName, userGender]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !gender) {
      toast.error('Fill out all fields');
      return;
    }

    if (name.length > 10) {
      toast.error('Name should be less than 10 Characters');
      return;
    }

    updateUserName(name);
    updateUserGender(gender);

    if (isEditMode && name && gender) {
      navigate('/app/init', { replace: true });
      toast.success('Profile updated succesfully');
    }
  }

  return createPortal(
    <div className="absolute inset-0 flex bg-slate-200/20 backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[90%] h-fit max-w-xl mx-auto mt-16 bg-gradient-to-t from-light-blue to-bright-blue p-4 z-50 rounded-lg"
      >
        <div className="mb-4 text-center">
          {isEditMode ? (
            <h1 className="text-3xl font-semibold">Update Your Profile 😄</h1>
          ) : (
            <>
              <h1 className="text-3xl font-semibold">Welcome to TAMAREEN!</h1>
              <h2 className="mt-2 text-xl ">
                We need your Name and Gender for a better experience 😄
              </h2>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">First Name</label>
          <input
            type="text"
            className="px-2 py-1 text-xl rounded-md text-dark-gray focus:outline-none focus:ring focus:ring-bright-blue"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">Gender</label>
          <select
            className="px-2 py-1 text-xl rounded-md text-dark-gray focus:outline-none focus:ring focus:ring-bright-blue"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button className="px-2 py-2 mx-auto mt-6 text-lg font-semibold uppercase transition-all duration-100 rounded-lg w-36 bg-dark-gray hover:bg-medium-gray">
          {isEditMode ? 'Update' : 'Start'}
        </button>
      </form>
    </div>,
    document.body
  );
}

export default UserForm;
