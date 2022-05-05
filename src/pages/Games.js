import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useRouteMatch } from "react-router";
import MenuGame from '../components/MenuGame';
import ChooseCard from './ChooseCard';
import HungrySnake from './HungrySnake';

function Games() {
    let { path} = useRouteMatch();

    return (
        <Router>
            <Switch>
                <Route path={path} exact component={()=> <MenuGame/>}></Route>
                <Route path={`${path}/ChooseCard`} component={()=> <ChooseCard/>}></Route>
                <Route path={`${path}/HungrySnake`} component={()=> <HungrySnake/>}></Route>
            </Switch>
        </Router>
    )
}

export default Games;