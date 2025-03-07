import React from 'react';
import {Link} from 'react-router-dom';
import TodoImg from '../images/Todo.png';

const Start = () => {
  return (
    <div className="h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
    <img className="w-16 ml-8" src={TodoImg} alt="Uber Logo" />
      <div className="bg-white pb-7 py-5 px-4">
        <h2 className="text-3xl font-bold">Get Started with TaskManagement</h2>
        <button className="w-full bg-black text-white py-3 rounded mt-5"><Link to = '/login'>Continue</Link></button>
      </div>
    </div>
  );
};

export default Start;
