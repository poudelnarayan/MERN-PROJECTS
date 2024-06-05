import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TodoForm.css";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const TodoForm = (props) => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  let taskToEdit;
  if (taskId && props.isEditing && props.items) {
    const foundTask = props.items.find((item) => item.id === taskId);
    if (foundTask) {
      taskToEdit = {
        ...foundTask,
        creationDate: foundTask.creationDate.split("T")[0], // Ensure date is in YYYY-MM-DD format
        dueDate: foundTask.dueDate.split("T")[0], // Ensure date is in YYYY-MM-DD format
      };
    }
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    creationDate: Yup.date().required("Creation date is required"),
    dueDate: Yup.date()
      .required("Due date is required")
      .min(
        Yup.ref("creationDate"),
        "Due date cannot be earlier than creation date"
      ),
    priority: Yup.string()
      .oneOf(["High", "Medium", "Low"], "Invalid priority")
      .required("Priority is required"),
  });

  const initialValues = props.isEditing
    ? taskToEdit
    : {
        id: uuidv4(),
        title: "",
        description: "",
        creationDate: "",
        dueDate: "",
        priority: "Medium",
        isCompleted: false,
      };

  console.log(initialValues);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    props.onSubmit(values);
    navigate("/");
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      {props.isEditing ? (
        <h2 className="form-title">Edit Task</h2>
      ) : (
        <h2 className="form-title">Add New Task</h2>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="input-field">
              <label htmlFor="description">Description</label>
              <Field as="textarea" name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>
            <div className="input-field">
              <label htmlFor="creationDate">Creation Date</label>
              <Field type="date" name="creationDate" />
              <ErrorMessage
                name="creationDate"
                component="div"
                className="error"
              />
            </div>
            <div className="input-field">
              <label htmlFor="dueDate">Due Date</label>
              <Field type="date" name="dueDate" />
              <ErrorMessage name="dueDate" component="div" className="error" />
            </div>
            <div className="input-field">
              <label htmlFor="priority">Priority</label>
              <Field as="select" name="priority">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Field>
              <ErrorMessage name="priority" component="div" className="error" />
            </div>

            {props.isEditing ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Add Task
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm;
