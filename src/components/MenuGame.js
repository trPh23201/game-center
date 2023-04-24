import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router";

const GameLink = ({ label, to }) => {
    return (
        <Link to={to}>
            <div className="well">
                {label}
            </div>
        </Link>
    );
}

function MenuGame() {
    const [titleColor, changeColor] = useState('red')
    let { url } = useRouteMatch();

    useEffect(() => {
        const interval = setInterval(() => {
            titleColor === 'red' ? changeColor('black') : changeColor('red');
        }, 1000);
        return () => clearInterval(interval) //Fix dismount before async call finished.
    }, [titleColor]);

    return (
        <div className="games container">
            <h1 className="heading" style={{ color: titleColor }}>Choose the game you want to play</h1>
            <h3 style={{ color: 'yellow', textAlign: 'center' }}>Warning: LOUD music alert</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="body">
                        <GameLink label='ChooseCard' to={`${url}/ChooseCard`} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="body">
                        <GameLink label='HungrySnake (beta)' to={`${url}/HungrySnake`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuGame;