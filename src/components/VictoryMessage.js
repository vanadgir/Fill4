import winstar from "../images/winstar.jpg";

export default function VictoryMessage({callback, dim}){

  return(
    <div className="victory" style={{"width": dim, "height": dim, "position": "relative"}}>
      <div className="dismiss" onClick={callback}>X</div>
      <img src={winstar} alt="victory" className="winstar"/>
    </div>
  )
}