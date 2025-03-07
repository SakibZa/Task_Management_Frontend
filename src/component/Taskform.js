import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ task, onSave }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : "pending");
  const [dueDate, setDueDate] = useState(task ? task.due_date : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, status, due_date: dueDate };

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Axios request configuration with Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (task) {
      // Update existing task
      axios
        .put(`http://localhost:8000/api/task/${task.id}`, newTask, config)
        .then(() => {
          onSave(); // Call onSave to close the form and refresh the task list
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      // Add new task
      axios
        .post("http://localhost:8000/api/task/create", newTask, config)
        .then(() => {
          onSave(); // Call onSave to close the form and refresh the task list
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {task ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;