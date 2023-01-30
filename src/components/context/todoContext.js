import { createContext, useReducer } from "react";
import { reducer, INITIAL_STATE } from "../reducer/todoReducer";

export const todoContext = createContext();

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <todoContext.Provider value={{ state, dispatch }}>
      {children}
    </todoContext.Provider>
  );
};
export default TodoProvider;
