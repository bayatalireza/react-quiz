import React from 'react'

export default function StartScreen({questionCount, dispatch}) {
  return (
    <div>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionCount}questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type: "start"})} >Let's start</button>
    </div>
  )
}
