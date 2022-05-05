import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { setLive } from "../../features/gameChooseCard/Live";
import { setTime } from "../../features/gameChooseCard/Time";

export default function Ready(props) {
    var dispatch = useDispatch();
    const [shadow, changeShadow] = useState('red')
    var auEl = useRef()
    var history = useHistory()
    useEffect(() => {
        const timeout = setTimeout(() => {
            changeShadow(shadow === 'red' ? 'blue' : 'red')
        }, 1000)
        return () => clearTimeout(timeout) //Call this when unmount, to stop setState when unmounted
    }, [shadow])
    //Play music
    if (auEl.current) {
        auEl.current.volume = 0.6
        auEl.current.play()
            .catch(er => { history.push('/games') }) //Fix the user didn't interact with the document first(EX when reload page)
    }
    //set diffiicult
    function setDiff(time, live) {
        dispatch(setTime(time))
        dispatch(setLive(live))
    }

    return (
        <div className='ready'>
            <audio ref={auEl} loop src={require('../../sounds/chooseCard/menu.mp3').default}></audio>
            <p className={shadow}>Welcome to Choose Card game! <br />Choose difficult you want:</p>
            <div className='row'>
                <div className='col-sm-4'>
                    <button type="button" className="btn btn-lg" onClick={() => setDiff(180, 40)}>Normal</button>
                    <div className='detail'>
                        40 lives <br />
                        180 secs <br />
                    </div>
                </div>
                <div className='col-sm-4'>
                    <button type="button" className="btn btn-lg" onClick={() => setDiff(120, 20)}>Hard</button>
                    <div className='detail'>
                        20 lives <br />
                        120 secs <br />
                    </div>
                </div>
                <div className='col-sm-4'>
                    <button type="button" className="btn btn-lg" onClick={() => setDiff(90, 5)}>Nightmare</button>
                    <div className='detail'>
                        5 lives <br />
                        90 secs <br />
                    </div>
                </div>
            </div>
        </div>
    )
}