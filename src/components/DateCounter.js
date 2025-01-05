import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function Reducer(state, action) {
  console.log(state, action);

  // if (action.type === "inc") return state + action.payload;
  // if (action.type === "dec") return state - action.payload;
  // if (action.type === "setStep") return action.payload;
  // if (action.type === "setCount") return action.payload;
  // if (action.type === "reset") return initialState;
  switch (action.type){
    case "inc":
      return{...state, count: state.count + state.step};
    case "dec":
      return{...state, count: state.count - state.step};
    case "setStep":
      return{...state, step:  action.payload};
    case "setCount":
      return{...state, count: action.payload};
    case "reset":
      return initialState;
    default:
      throw new Error("unknown action type");
  }
}
export default function DateCounter() {
  // const [step, setStep] = useState(1);
  // const [count, setCount] = useState(1);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { step, count } = state;

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function dec() {
    // setCount((count) => count - step);
    dispatch({ type: "dec"});
  }

  function inc() {
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  }

  function defineStep(e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  }

  function defineCount(e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  }

  function reset() {
    // setCount(0);
    dispatch({ type: "reset" });
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>
      <div className="">
        <button onClick={dec}>-</button>
        <input type="text" value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
