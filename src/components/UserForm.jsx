import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

function UserForm() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  const { updateUserName, updateUserGender, userName, userGender } = useUser();

  useEffect(
    function () {
      setName(userName);
      setGender(userGender);
    },
    [userName, userGender]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !gender) return;

    updateUserName(name);
    updateUserGender(gender);
  }

  return (
    <div className="absolute inset-0 flex bg-slate-200/20 backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[90%] h-fit max-w-xl mx-auto mt-16 bg-gradient-to-t from-light-blue to-bright-blue p-4 z-50 rounded-lg"
      >
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold">Welcome to TAMAREEN!</h1>
          <h2 className="mt-2 text-xl ">
            We need your Name and Gender for a better experience 😄
          </h2>
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
          Start
        </button>
      </form>
    </div>
  );
}

export default UserForm;
