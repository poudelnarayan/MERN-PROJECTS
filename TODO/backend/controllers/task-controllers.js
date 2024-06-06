const HttpError = require("../models/http-error");
const uuid = require("uuid");

let DummyTasks = [
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

const getActiveTasks = (req, res, next) => {
  const activeTasks = DummyTasks.filter((task) => task.isCompleted === false);
  res.json({ activeTasks });
};

const getCompletedTasks = (req, res, next) => {
  const completedTasks = DummyTasks.filter((task) => task.isCompleted === true);
  res.json({ completedTasks });
};

const createTask = (req, res, next) => {
  const { title, description, creationDate, dueDate, priority } = req.body;
  const createdTask = {
    id: uuid.v4(),
    title,
    description,
    creationDate,
    dueDate,
    priority,
    isCompleted: false,
  };
  DummyTasks.push(createdTask);
  res.status(201).json({ task: createdTask });
};

const updateTask = (req, res, next) => {
  const { title, description, creationDate, dueDate, priority, isCompleted } =
    req.body;
  const taskId = req.params.id;
  const updatedTask = { ...DummyTasks.find((t) => t.id === taskId) };
  const taskIndex = DummyTasks.findIndex((t) => t.id === taskId);
  updatedTask.title = title;
  updatedTask.description = description;
  updatedTask.creationDate = creationDate;
  updatedTask.dueDate = dueDate;
  updatedTask.priority = priority;
  updatedTask.isCompleted = isCompleted;
  DummyTasks[taskIndex] = updatedTask;
  res.status(200).json({ task: updatedTask });
};

const deleteTask = (req, res, next) => {
  const taskId = req.params.id;

  DummyTasks = DummyTasks.filter((t) => t.id !== taskId);
  if (!DummyTasks) {
  }
  res.status(200).json({ message: "Deleted Task." });
};

exports.getActiveTasks = getActiveTasks;
exports.getCompletedTasks = getCompletedTasks;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
