import { useDispatch, useSelector } from "react-redux";
import Item from "../components/ChooseCard/Item";
import { setRandomArr } from "../features/gameChooseCard/RandomArr";
import Header from "../components/ChooseCard/Header";
import Ready from "../components/ChooseCard/Ready";
import { cards } from "../constant/ChooseCard"; //Get cards here
import { setWin } from "../features/gameChooseCard/Win";
import Lose from "../components/ChooseCard/Lose";
import Win from "../components/ChooseCard/Win";

function ChooseCard() {
    var rightCard = useSelector((state) => state.RightCard)
    var card1 = useSelector((state) => state.Card1)
    var card2 = useSelector((state) => state.Card2)
    var ramdonArr = useSelector((state) => state.RandomArr)
    var arr = [...ramdonArr]
    var dispatch = useDispatch()

    //set random arr and dispatch
    if (arr.length === 0) {
        while (arr.length !== cards.length * 2) {
            var random = Math.round(Math.random() * (cards.length - 1))
            if (arr.includes(random)) {
                var index = arr.indexOf(random);
                var clone = [...arr]
                clone.splice(index, 1);
                if (!clone.includes(random)) {
                    arr.push(random)
                }
            } else arr.push(random)
        }
        dispatch(setRandomArr(arr))
    }

    function render() {
        return arr.map((index, i) => {
            var side = 'back';
            var rightChoose = rightCard.includes(cards[index].id)
            if (rightChoose) side = 'front'
            else {
                //card1[0,1] 0=card's id, 1=index of arr(length*2)
                if (card1 !== null && card1[1] === i) side = 'front-temp';//check if index card1 = index arr
                if (card2 !== null && card2[1] === i) side = 'front-temp';
            }
            return <Item card={cards[index]}
                side={side}
                card1={card1}
                card2={card2}
                index={i}
                key={i} />
        })
    }
    var time = useSelector((state) => state.Time)
    var live = useSelector((state) => state.Live)
    //Player lose
    var lose = false
    if (time !== null || live !== null) { //Fix bug null
        if (time === 0 || live === 0)
            lose = true //Player lose when timeout or no lives left
    }
    //Player win
    var win = useSelector((state) => state.Win)
    setTimeout(() => {
        if (rightCard.length === cards.length) dispatch(setWin(true))
    }, 500)
    if (rightCard.length === 0) dispatch(setWin(false)) //Player want back to menu when they win

    return (
        <div className="choose-card">
            {time === null || live === null ?
                <div>
                    <div className='blackout'></div>
                    <Ready />
                </div> :
                <div className='container'>
                    <div className="row">
                        <Header />
                        {render()}
                    </div>
                </div>}
            {lose &&
                <div>
                    <div className='blackout'></div>
                    <Lose />
                </div>}
            {win &&
                <div>
                    <div className='blackout'></div>
                    <Win />
                </div>}
        </div>
    )
}

export default ChooseCard;