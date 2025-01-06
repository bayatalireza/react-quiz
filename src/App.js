import { useEffect, useReducer } from "react";
import "./App.css";
import DateCounter from "./components/DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {...state, status: "error"}
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status} = state;


  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({type: "dataReceived", payload: data}))
      .catch((err) => dispatch({type: "dataFailed", payload: err}));
  }, []);

  return (
    <div className="App">
      <Header />
     
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen questions={questions} />}
      </Main>
      <DateCounter />
    </div>
  );
}

export default App;
