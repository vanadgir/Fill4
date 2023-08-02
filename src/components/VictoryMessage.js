import winstar from "../images/winstar.jpg";

export default function VictoryMessage({callback, width, height}){

  return(
    <div className="victory" style={{"width": width, "height": height, "position": "relative"}}>
      <div className="dismiss" onClick={callback}>X</div>
      <img src={winstar} alt="victory" className="winstar"/>
    </div>
  )
}