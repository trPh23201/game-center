import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router"

export default function Ready(props) {
    const [shadow, changeShadow] = useState('red')
    var auEl = useRef()
    var history = useHistory()
    useEffect(() => {
        const timeout = setTimeout(() => {
            changeShadow(shadow === 'red' ? 'blue' : 'red')
        }, 1000)
        return () => clearTimeout(timeout) //Call this when unmount, to stop setState when unmounted
    }, [shadow])
    if (auEl.current) {
        auEl.current.volume = 0.6
        auEl.current.play()
            .catch(er => { history.push('/games') }) //Fix the user didn't interact with the document first(EX when reload page)
    }
    return (
        <div className='ready'>
            <audio ref={auEl} loop src={require('../../sounds/hungrySnake/menu.mp3')}></audio>
            <p className={shadow}>Welcome to Hungry Snake game! <br /></p>
            <p>KEYBOARD: W,A,S,D to change direction or Dash</p>
            <button type="button" className="btn btn-lg" onClick={() => props.setReady(true)}>START</button>
        </div>
    )
}