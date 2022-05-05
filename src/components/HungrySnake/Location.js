export function Location(props) {
    function returnClass(location) { //make locations on map be colorful
        if (location === 1) return 'location'
        else if (location === 2) return 'location-body'
        else if (location === 3) return 'location-head'
        else if (location === 4) return 'location-point'
        else return 'location-die'
    }

    return (
        <div className={returnClass(props.col)}>
        </div>
    )
}