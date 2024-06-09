import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Todo from "./todo/pages/Todo";
import PageNotFound from "./todo/pages/PageNotFound";
import AddTask from "./todo/pages/AddTask";
import CompletedTask from "./todo/pages/CompletedTask";
import Settings from "./todo/pages/Settings";
import Mainnav from "./todo/components/MainNav";
import EditTask from "./todo/pages/EditTask";
import DisableCtrls from "./shared/util/DisableCtrls";

const DummyTasks = [
  {
    id: "id1",
    title: "Learn Flutter",
    description: "Learning Flutter to the core",
    creationDate: "2024-12-02",
    dueDate: "2024-12-05",
    priority: "High",
    isCompleted: false,
  },
  {
    id: "id2",
    title: "Learn MERN",
    description: "Learning MERN to the core",
    creationDate: "2024-12-02",
    dueDate: "2024-12-05",
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "id3",
    title: "Learn AI",
    description: "Learning AI to the core",
    creationDate: "2024-12-02",
    dueDate: "2024-12-05",
    priority: "Low",
    isCompleted: false,
  },
];

function App() {
  const [recentlyDeletedTask, setRecentlyDeletedTask] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  const [activeTasks, setActiveTasks] = useState(
    DummyTasks.filter((item) => !item.isCompleted)
  );
  const [completedTasks, setCompletedTasks] = useState(
    DummyTasks.filter((item) => item.isCompleted)
  );

  const handleTaskComplete = (id) => {
    const updatedActiveTasks = activeTasks.filter((task) => task.id !== id);
    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== id
    );

    const taskToUpdate =
      activeTasks.find((task) => task.id === id) ||
      completedTasks.find((task) => task.id === id);

    if (taskToUpdate) {
      taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
      if (taskToUpdate.isCompleted) {
        setCompletedTasks([...updatedCompletedTasks, taskToUpdate]);
        setActiveTasks(updatedActiveTasks);
      } else {
        setActiveTasks([...updatedActiveTasks, taskToUpdate]);
        setCompletedTasks(updatedCompletedTasks);
      }
    }
  };

  const handleEditTask = (updatedTask) => {
    setActiveTasks(
      activeTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleNewTask = (newTask) => {
    setActiveTasks([...activeTasks, newTask]);
  };

  const handleDelete = (id) => {
    const taskToDelete =
      activeTasks.find((task) => task.id === id) ||
      completedTasks.find((task) => task.id === id);

    if (!taskToDelete) return;

    setRecentlyDeletedTask(taskToDelete);

    setActiveTasks(activeTasks.filter((task) => task.id !== id));
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));

    if (undoTimeout) clearTimeout(undoTimeout);

    const timeout = setTimeout(() => {
      setRecentlyDeletedTask(null);
    }, 5000);

    setUndoTimeout(timeout);
  };

  const handleUndelete = () => {
    if (!recentlyDeletedTask) return;

    if (recentlyDeletedTask.isCompleted) {
      setCompletedTasks([...completedTasks, recentlyDeletedTask]);
    } else {
      setActiveTasks([...activeTasks, recentlyDeletedTask]);
    }

    setRecentlyDeletedTask(null);

    if (undoTimeout) clearTimeout(undoTimeout);
    setUndoTimeout(null);
  };

  return (
    <Router>
      <main>
        <Mainnav />
      </main>
      <DisableCtrls />
      <Routes>
        <Route
          path="/"
          element={
            <Todo
              items={activeTasks}
              onDelete={handleDelete}
              onTaskComplete={handleTaskComplete}
              onUndelete={handleUndelete}
            />
          }
        />
        <Route
          path="/add-task"
          element={<AddTask onNewTask={handleNewTask} />}
        />
        <Route
          path="/edit-task/:taskId"
          element={<EditTask tasks={activeTasks} onEditTask={handleEditTask} />}
        />
        <Route
          path="/completed-tasks"
          element={
            <CompletedTask
              items={completedTasks}
              onDelete={handleDelete}
              onTaskComplete={handleTaskComplete}
            />
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />

        <Route path="*" element={<Navigate to="/pagenotfound" />} />
      </Routes>
    </Router>
  );
}

export default App;
