import React from 'react'

export default function Progress({questionCount, index, points, maxPossiblePoints}) {
  return (
    <header className='progress'>
      <progress max={questionCount} value={index} />
      <p>Questions <strong>{index+1}</strong>/{questionCount}</p>
      <p><strong>{points}</strong> / {maxPossiblePoints}</p>
    </header>
  )
}
