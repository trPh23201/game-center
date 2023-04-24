import { useDispatch, useSelector } from "react-redux";
import { removeCard1, setCard1 } from "../../features/gameChooseCard/Card1";
import { removeCard2, setCard2 } from "../../features/gameChooseCard/Card2";
import { addRightCard } from "../../features/gameChooseCard/RightCard";
import { useEffect, useRef, memo } from "react";
import { setLive } from "../../features/gameChooseCard/Live";

function Item(props) {
  var dispatch = useDispatch();
  var live = useSelector((state) => state.Live)
  var auEl = useRef()
  var auEl2 = useRef()
  var auEl3 = useRef()
  var diEl = useRef()

  useEffect(()=>{
    // diEl.current.style.animationDelay = "-0.3s";
  },[])

  function remove2Card(time) { //Make 2card player select removes
    setTimeout(() => {
      dispatch(removeCard1());
      dispatch(removeCard2());
    }, time) //When time out, player can select card1
  }

  function flip() {
    var clone = auEl.current.cloneNode() //Copy audio
    if (props.side === 'back') { //If card's side is back => player can flip
      if (props.card1 === null) { //Player choose card1
        clone.play()
        dispatch(setCard1([props.card.id, props.index]))
      } else if (props.card1[0] === props.card.id && props.card2 === null) { //player chose right && If player chose 2 card 3rd click cant let them right
        clone.play()
        dispatch(setCard2([props.card.id, props.index])) //Flip 2nd card (duration now 0,3s)
        setTimeout(() => {
          auEl3.current.play();
          dispatch(addRightCard(props.card.id)) //Make 2 right cards change color GREEN
          remove2Card(300)
        }, 300) //Card2 flip time (should equal css animation duration - now 0,3s)
      } else if (props.card2 === null) { //Player choose wrong
        clone.play()
        dispatch(setCard2([props.card.id, props.index])) //Flip 2nd card (duration now 0,3s)
        remove2Card(600) //Time for flip 2 wrong cards back 
        setTimeout(() => {
          clone.play()
          auEl2.current.play();
          dispatch(setLive(live-1))
        }, 600); //Time for -1 player's live
      }
    } else if (props.side === 'front-temp' && props.card2 === null) { //Help player turn card1 to 'back' side 
      clone.play()
      dispatch(removeCard1())
    }
  }

  return (
    <div className='col-sm-2'>
      <audio ref={auEl} src={require('../../sounds/chooseCard/flipCard.mp3')} />
      <audio ref={auEl2} src={require('../../sounds/chooseCard/wrongChoose.mp3')} />
      <audio ref={auEl3} src={require('../../sounds/chooseCard/rightChoose.mp3')} />
      <div className={`item ${props.side}`} onClick={() => flip()} ref={diEl}>
        {props.side === 'back' ?
          <span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span> :
          <span className={`${props.card.icon}`} aria-hidden="true"></span>
        }
      </div>
    </div>
  )
}

export default memo(Item); //Improve performance (When time decrease dont re-render)