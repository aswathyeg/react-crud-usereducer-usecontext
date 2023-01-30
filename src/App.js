import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { todoContext } from "./components/context/todoContext";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

export default function App() {
  const { dispatch, state } = useContext(todoContext);

  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");
  console.log(state.todos);

  const onSubmit = (e) => {
    const id = uuidv4();
    e.preventDefault();
    setTodo("");

    if (!isEditing) {
      dispatch({
        type: "ADD_TODO",
        payload: { id: id, text: todo },
      });
    } else {
      dispatch({
        type: "UPDATE_TODO",
        payload: {
          ...selectedTodo,
          text: todo,
        },
      });
      setIsEditing(false);
      setTodo("");
    }
  };
  const handleEdit = (value) => {
    setIsEditing(true);
    const todoItem = state.todos.find((items) => items.id === value.id);
    setTodo(todoItem.text);
    setSelectedTodo(todoItem);
  };

  return (
    <div className="App">
      <Header />
      <Container className="cotainer">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={todo}
            placeholder="Enter todo"
            onChange={(e) => setTodo(e.target.value)}
          />

          <button>{isEditing ? "Edit" : "Go"}</button>
        </form>
        {state.todos.length === 0 && <span>No todos</span>}

        {state.todos &&
          state.todos.map((item) => (
            <div key={item.id} className="todoitem">
              <span
                onClick={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: item.id })
                }
                style={{
                  cursor: "pointer",
                  textDecoration: item.completed ? "line-through" : "",
                }}
              >
                {item.text}
              </span>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_TODO", payload: item.id })
                }
              >
                Delete
              </button>
            </div>
          ))}
      </Container>
    </div>
  );
}
