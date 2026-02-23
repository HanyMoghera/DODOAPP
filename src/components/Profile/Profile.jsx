import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  function onDelete(taskId) {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://todo-nti.vercel.app/todo/delete-todo/${taskId}`, {
        headers: { token },
      })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId),
        );
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to delete task.");
      });
  }

  function openUpdateModal(task) {
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  }

  function closeModal() {
    setSelectedTask(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
  }

  function onUpdate() {
    const token = localStorage.getItem("token");
    setIsUpdating(true);
    axios
      .patch(
        `https://todo-nti.vercel.app/todo/update-todo/${selectedTask._id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        },
        {
          headers: { token },
        },
      )
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id
              ? {
                  ...task,
                  title: updatedTitle,
                  description: updatedDescription,
                }
              : task,
          ),
        );
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to update task.");
      })
      .finally(() => setIsUpdating(false));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://todo-nti.vercel.app/todo/get-all", {
        headers: { token },
      })
      .then((response) => {
        setTasks(response.data.todos);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch tasks.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-xl font-semibold text-heading mb-6">My Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-body">No tasks found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-neutral-secondary-medium border border-default-medium rounded-base px-4 py-4 shadow-xs flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-medium text-heading">
                  {task.title}
                </h3>
                <p className="text-sm text-body mt-1">{task.description}</p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  className="text-white bg-brand hover:bg-brand-strong border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2 focus:outline-none transition-all"
                  onClick={() => openUpdateModal(task)}
                >
                  Update
                </button>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 border border-transparent focus:ring-4 focus:ring-red-300 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2 focus:outline-none transition-all"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-base shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-heading mb-4">
              Update Task
            </h3>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-heading">
                Title
              </label>
              <input
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs"
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-heading">
                Description
              </label>
              <textarea
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs resize-none"
                rows={4}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                className="text-heading bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-secondary-strong font-medium rounded-base text-sm px-4 py-2 transition-all"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`text-white border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2 focus:outline-none transition-all
                  ${isUpdating ? "bg-brand/50 cursor-not-allowed opacity-60" : "bg-brand hover:bg-brand-strong"}`}
                onClick={onUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Modify"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
