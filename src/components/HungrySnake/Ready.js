import { useEffect, useState } from "react"

export default function Ready(props) {
    const [shadow, changeShadow] = useState('red')
    useEffect(() => {
        const timeout = setTimeout(() => {
            changeShadow(shadow === 'red' ? 'blue' : 'red')
        }, 1000)
        return () => clearTimeout(timeout) //Call this when unmount, to stop setState when unmounted
    }, [shadow])
    return (
        <div className='ready'>
            <p className={shadow}>Welcome to Hungry Snake game! <br />Choose game mode you want:</p>
            <button type="button" className="btn btn-lg" onClick={() => props.setReady(true)}>START</button>
        </div>
    )
}