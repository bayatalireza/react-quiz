import { useEffect, useReducer } from "react";
import "./App.css";
// import DateCounter from "./components/DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextAnswer from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const sec_per_question = 5;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished, reset
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return { ...state, status: "active", secondsRemaining: state.questions.length * sec_per_question};
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        // highScore:
        //   state.highScore > state.points ? state.highScore : state.points,
      };
    case "reset":
      // return {...state, status: "ready", index: 0, answer: null, points: 0}
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? "finished" : state.status };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highScore, secondsRemaining } = state;
  const questionCount = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

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
        {status === "active" && (
          <>
            <Progress
              questionCount={questionCount}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextAnswer
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionCount={questionCount}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            highScore={highScore > points ? highScore : points}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
      {/* <DateCounter /> */}
    </div>
  );
}

export default App;
