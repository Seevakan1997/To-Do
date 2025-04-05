import { useEffect, useState } from "react";
import { fetchTasks, createTask, completeTask } from "./api";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [creating, setCreating] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState(null);

  useEffect(() => {
    loadTasks();

    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [darkMode]);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required!");
      return;
    }

    setCreating(true);
    try {
      const response = await createTask({ title, description });
      console.log("Task created:", response);
      setTitle("");
      setDescription("");
      await loadTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("There was an error creating the task. Please try again!");
    } finally {
      setCreating(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      setCompletingTaskId(id);
      await completeTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Error completing task:", error);
      alert("There was an error completing the task. Please try again!");
    } finally {
      setCompletingTaskId(null);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container
      className={`mt-4 d-flex align-items-center justify-content-center`}
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={5}>
          <h2
            className="text-left mb-4"
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: darkMode ? "#0d6efd" : "#007bff",
            }}
          >
            Add a Task
          </h2>
          <Form onSubmit={handleSubmit} className="my-3">
            <Form.Control
              className="mb-3 shadow-sm"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ fontSize: "16px" }}
            />
            <Form.Control
              as="textarea"
              className="mb-3 shadow-sm"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ fontSize: "16px" }}
            />
            <Button
              type="submit"
              className="w-25 float-end mb-4"
              variant="primary"
              disabled={creating}
            >
              {creating ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Add Task"
              )}
            </Button>
          </Form>
        </Col>

        <Col md={1} className="d-flex align-items-start justify-content-center">
          <div
            style={{
              width: "1px",
              backgroundColor: darkMode ? "#444" : "#000",
              height: "100%",
            }}
          />
        </Col>

        <Col md={6}>
          <Button
            onClick={toggleDarkMode}
            variant={darkMode ? "light" : "dark"}
            className="mb-3 position-absolute top-0 end-0 m-3"
            style={{
              fontSize: "12px",
              border: "none",
            }}
          >
            {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
          </Button>

          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className="d-flex justify-content-between mb-3"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div>
                  <h5 style={{ fontWeight: "600" }}>{task.title}</h5>
                  <p>{task.description}</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    size="sm"
                    variant={task.completed ? "success" : "primary"}
                    onClick={() => handleComplete(task.id)}
                    style={{ padding: "5px 10px", minWidth: "70px" }}
                    disabled={task.completed || completingTaskId === task.id}
                  >
                    {completingTaskId === task.id ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Done"
                    )}
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
