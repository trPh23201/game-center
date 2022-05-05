import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { setRandomArr } from "../../features/gameChooseCard/RandomArr";
import { removeCard1 } from "../../features/gameChooseCard/Card1";
import { removeCard2 } from "../../features/gameChooseCard/Card2";
import { removeRightCard } from "../../features/gameChooseCard/RightCard";
import { setLive } from "../../features/gameChooseCard/Live";
import { setTime } from "../../features/gameChooseCard/Time";

export default function Win(){
    var time = useSelector((state) => state.Time)
    var live = useSelector((state) => state.Live)
    var dispatch = useDispatch();
    var history = useHistory();
    function deleteCache(){
        dispatch(setTime(null))
        dispatch(setLive(null))
        dispatch(setRandomArr([]))
        dispatch(removeCard1())
        dispatch(removeCard2())
        dispatch(removeRightCard())
    }
    function quitGame(){
        deleteCache()
        history.goBack()
    }
    function toMenu(){
        deleteCache()
    }
    return(
        <div className='win'>
            <p>YOU ARE THE WINNER</p>
            <p>YOUR SCORE</p>
            <p className='score'>{time*100+live*500}</p>
            <div className='row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-3'>
                    <button className="btn btn-lg" onClick={()=>toMenu()}>Menu</button>
                </div>
                <div className='col-sm-3'>
                    <button className="btn btn-lg" onClick={()=>quitGame()}>Quit</button>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </div>
    )
}