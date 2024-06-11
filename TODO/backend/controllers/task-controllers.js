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
  const activeTasks = DummyTasks.filter((task) => !task.isCompleted);

  if (activeTasks.length === 0) {
    return next(new HttpError("No active tasks found.", 404));
  }

  res.json({ activeTasks });
};

const getCompletedTasks = (req, res, next) => {
  const completedTasks = DummyTasks.filter((task) => task.isCompleted);

  if (completedTasks.length === 0) {
    return next(new HttpError("No completed tasks found.", 404));
  }

  res.json({ completedTasks });
};

const createTask = (req, res, next) => {
  const { title, description, creationDate, dueDate, priority } = req.body;

  if (!title || !description || !creationDate || !dueDate || !priority) {
    return next(
      new HttpError(
        "All fields (title, description, creationDate, dueDate, priority) are required.",
        400
      )
    );
  }

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

  const taskIndex = DummyTasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return next(new HttpError("Task not found.", 404));
  }

  if (
    !title ||
    !description ||
    !creationDate ||
    !dueDate ||
    !priority ||
    typeof isCompleted !== "boolean"
  ) {
    return next(
      new HttpError(
        "All fields (title, description, creationDate, dueDate, priority, isCompleted) are required.",
        400
      )
    );
  }

  const updatedTask = { ...DummyTasks[taskIndex] };
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

  const taskIndex = DummyTasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return next(new HttpError("Task not found.", 404));
  }

  DummyTasks = DummyTasks.filter((t) => t.id !== taskId);

  res.status(200).json({ message: "Deleted task." });
};

exports.getActiveTasks = getActiveTasks;
exports.getCompletedTasks = getCompletedTasks;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
