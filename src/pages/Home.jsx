import React, { useState } from "react";
import TaskList from "../component/Tasklist";
import TaskForm from "../component/Taskform";

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Hide Form" : "Add Task"}
      </button>
      {showForm && <TaskForm onSave={() => setShowForm(false)} />}
      <TaskList />
    </div>
  );
};

export default Home;