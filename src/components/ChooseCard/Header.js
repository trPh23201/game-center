import Lives from "./Lives"
import Time from "./Time"

export default function Header(props) {
    return (
        <div className='header'>
            <div className='row'>
                <div className='col-sm-4'></div>
                <div className='col-sm-2'>
                    <Time />
                </div>
                <div className='col-sm-2'>
                    <Lives/>
                </div>
                <div className='col-sm-4'></div>
            </div>
        </div>
    )
}