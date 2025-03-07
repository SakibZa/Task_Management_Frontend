import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from './Taskform'; // Import the TaskForm component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // State to track the task being edited

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Axios request configuration with Authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:8000/api/task/allTasks", config)
      .then((response) => {
        setTasks(response.data.tasks); // Ensure the response data matches the expected structure
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  // Delete a task
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/task/${id}`, config)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id)); 
      })
      .catch((error) => console.error("Error deleting task:", error));
  };


  const handleEdit = (task) => {
    setEditingTask(task); 
  };

 
  const handleSave = () => {
    setEditingTask(null); 
    fetchTasks(); 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

    
      {editingTask && (
        <TaskForm task={editingTask} onSave={handleSave} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <p className="text-sm text-gray-500">Due Date: {task.due_date}</p>
            <div className="mt-2 space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(task)} 
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;