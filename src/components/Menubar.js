import { Link, useRouteMatch } from 'react-router-dom';

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <li className={match ? "active" : ""}>
            <Link to={to}>{label}</Link>
        </li>
    );
}

function Menubar() {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                {/* Toggler/collapsibe Button */}
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#menu">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">HomePage</Link>
                </div>

                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="nav navbar-nav">
                        <MenuLink label='Games' to='/games' />
                        <MenuLink label='Leaderboard' to='/leaderboard' />
                    </ul>
                    {/* <ul className="nav navbar-nav navbar-right">
                    <li><a href="#"><span className="glyphicon glyphicon-user" /> Sign Up</a></li>
                    <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Login</a></li>
                </ul> */}
                </div>
            </div>
        </nav>
    );
}

export default Menubar;