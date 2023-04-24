import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTime } from "../../features/gameChooseCard/Time"

export default function Time() {
    var time = useSelector((state) => state.Time)
    var live = useSelector((state) => state.Live)
    var win = useSelector((state) => state.Win)
    var dispatch = useDispatch()
    var auEl = useRef()
    //Play music
    if (auEl.current){
        auEl.current.volume = 0.5
        auEl.current.play()
        .catch(er=>{}) //Fix uncaught error: the error you provided does not contain a stack trace.
    } 
    useEffect(() => {
        if (!win) { //Win time wont decrease time
            if (live !== 0) { //Lives = 0 wont decrease time
                if (time > 0) {
                    const timeout = setTimeout(() => {
                        dispatch(setTime(time-1))
                    }, 1000)
                    return () => clearTimeout(timeout) //remove setTimeout when dismount
                }
            }
        }
    }, [time, live, win, dispatch])
    var min = Math.floor(time / 60)
    var sec = time - min * 60

    return (
        <div>
            <audio ref={auEl} loop src={require('../../sounds/chooseCard/playGround.mp3')}/>
            <h3 className='time'>Time: {min}:{sec < 10 ? `0${sec}` : sec}</h3>
        </div>
    )
}