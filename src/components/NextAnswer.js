
export default function NextAnswer({dispatch, answer}) {
      if(answer === null) return null;
  return (
    <div>
      <button className="btn btn-ui" onClick={()=>dispatch({type: "nextAnswer"})} >Next</button>
    </div>
  )
}
