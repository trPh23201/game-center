import {useSelector } from "react-redux"

export default function Lives(){
    var live = useSelector((state) => state.Live)
    return(
        <h3 className='lives'>Lives: {live}</h3>
    )
}