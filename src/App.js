import { useEffect, useReducer } from "react";
import "./App.css";
import DateCounter from "./components/DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextAnswer from "./components/NextQuestion";


const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
      case "start":
        return {...state, status: "active"}
      case "newAnswer":
        return {...state, answer: action.payload, points: state.questions.correctOption === action.payload ? state.points + state.questions.points : state.points}
      case "nextQuestion":
        return {...state, index: state.index + 1, answer: null}
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points} = state;
  const questionCount = questions.length;


  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionCount={questionCount} dispatch={dispatch} />
        )}
        {status === "active" && <>

        <Questions question={questions[index]} dispatch={dispatch} answer={answer} />
        <NextAnswer dispatch={dispatch} answer={answer} />
        </> 
        }
        
      </Main>
      <DateCounter />
    </div>
  );
}

export default App;
