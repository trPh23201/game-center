import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { Location } from "../components/HungrySnake/Location";
import Ready from "../components/HungrySnake/Ready";
import * as map from "../constant/HungrySnake";

export default function HungrySnake() {
    const [locations, setLocations] = useState(map.map1)
    const [direction, setDirection] = useState('right')
    const [ready, setReady] = useState(false)
    const [body, setBody] = useState(() => {
        var rowIndex = null;
        var colIndex = null;
        locations.forEach((row, value) => {
            if (row.includes(2)) { //2 = body's location
                rowIndex = value;
                colIndex = row.indexOf(2)
            }
        })
        return [{ row: rowIndex, col: colIndex }]
    })
    var totalCol = locations[0].length
    var totalRow = locations.length
    var auEat = useRef()

    //RETURN SNAKE'S HEAD LOCATION
    var returnHeadLocation = useCallback(() => {
        var rowIndex = null;
        var colIndex = null;
        locations.forEach((row, value) => {
            if (row.includes(3)) { //3 = head's location
                rowIndex = value;
                colIndex = row.indexOf(3)
            }
        })
        return { row: rowIndex, col: colIndex }
    }, [locations])

    //RETURN SNAKE'S TAIL LOCATION
    var returnTailLocation = useCallback(() => {
        return { row: body[0].row, col: body[0].col }
    }, [body])

    //CREATE FOOD WHEN PLAYER ATE 1 FOOD
    var createFood = useCallback((cloneMap) => {
        var loop = true
        while (loop) {
            var randomCol = Math.round(Math.random() * (totalCol - 1))
            var randomRow = Math.round(Math.random() * (totalRow - 1))
            if (cloneMap[randomRow][randomCol] !== 2 && cloneMap[randomRow][randomCol] !== 3) {
                cloneMap[randomRow][randomCol] = 4
                loop = false
            }
        }
    }, [totalRow, totalCol])

    //FUNCTION SNAKE'S BODY MOVE
    function bodyMove(body, cloneMap, crLo) {
        body.push(crLo)
        body.forEach((value, i) => {
            if (i === 0) cloneMap[value.row][value.col] = 1
            else cloneMap[value.row][value.col] = 2
        })
        body.shift()
    }

    //SNAKE SAFE MOVE
    var safeMove = useCallback((cloneMap, newLo, crLo) => {
        bodyMove(body, cloneMap, crLo)
        cloneMap[newLo.row][newLo.col] = 3 //Head move
        setLocations(cloneMap)
    }, [body])

    //SNAKE EAT FOOD
    var eatFood = useCallback((cloneMap, newLo, crLo) => {
        cloneMap[newLo.row][newLo.col] = 3
        cloneMap[crLo.row][crLo.col] = 2
        cloneMap[body[0].row][body[0].col] = 1
        var cloneSound = auEat.current.cloneNode();
        cloneSound.play();
        var clone = [...body]; clone.push({ row: crLo.row, col: crLo.col }); setBody(clone)
        createFood(cloneMap)
        setLocations(cloneMap)
    }, [body, createFood])

    //SNAKE AUTO MOVE
    useEffect(() => {
        var timeOut = setTimeout(() => {
            var crLo = returnHeadLocation();
            var tailLo = returnTailLocation();
            var newLo = crLo;
            var cloneMap = [...locations];
            if (direction === 'right' && crLo.col !== totalCol - 1) newLo = { row: crLo.row, col: crLo.col + 1 };
            if (direction === 'left' && crLo.col !== 0) newLo = { row: crLo.row, col: crLo.col - 1 }
            if (direction === 'top' && crLo.row !== 0) newLo = { row: crLo.row - 1, col: crLo.col }
            if (direction === 'bot' && crLo.row !== totalRow - 1) newLo = { row: crLo.row + 1, col: crLo.col }
            //Player at corner
            if (newLo === crLo) {
                if (direction === 'right') newLo = { row: crLo.row, col: 0 };
                if (direction === 'left') newLo = { row: crLo.row, col: totalCol - 1 };
                if (direction === 'top') newLo = { row: totalRow - 1, col: crLo.col };
                if (direction === 'bot') newLo = { row: 0, col: crLo.col };
            }
            //Render new Snake position
            if (cloneMap[newLo.row][newLo.col] === 1 || (newLo.row === tailLo.row && newLo.col === tailLo.col))
                safeMove(cloneMap, newLo, crLo)
            else if (cloneMap[newLo.row][newLo.col] === 4) eatFood(cloneMap, newLo, crLo)
            else if (cloneMap[newLo.row][newLo.col] === 2) alert('lose')
        }, 500)
        return () => { clearTimeout(timeOut); }
    }, [locations, direction, body, totalCol, totalRow, returnHeadLocation, eatFood, returnTailLocation, safeMove])

    //Player press W,A,S,D
    function changeDirection(e) {
        var crLo = returnHeadLocation();
        var tailLo = returnTailLocation();
        var newLo = crLo;
        var cloneMap = [...locations];
        if (e.key === 'd' && direction !== 'left') {
            if (crLo.col !== totalCol - 1) newLo = { row: crLo.row, col: crLo.col + 1 }
            else newLo = { row: crLo.row, col: 0 } //Player at corner
            if (cloneMap[newLo.row][newLo.col] !== 2 || (newLo.row === tailLo.row && newLo.col === tailLo.col))
                setDirection('right') //Check if newL0 = snake's body || IF new location=tail => change direction
        } else if (e.key === 'a' && direction !== 'right') {
            if (crLo.col !== 0) newLo = { row: crLo.row, col: crLo.col - 1 };
            else newLo = { row: crLo.row, col: totalCol - 1 } //Player at corner
            if (cloneMap[newLo.row][newLo.col] !== 2 || (newLo.row === tailLo.row && newLo.col === tailLo.col))
                setDirection('left')
        } else if (e.key === 'w' && direction !== 'bot') {
            if (crLo.row !== 0) newLo = { row: crLo.row - 1, col: crLo.col }
            else newLo = { row: totalRow - 1, col: crLo.col } //Player at corner
            if (cloneMap[newLo.row][newLo.col] !== 2 || (newLo.row === tailLo.row && newLo.col === tailLo.col))
                setDirection('top')
        } else if (e.key === 's' && direction !== 'top') {
            if (crLo.row !== totalRow - 1) newLo = { row: crLo.row + 1, col: crLo.col }
            else newLo = { row: 0, col: crLo.col } //Player at corner
            if (cloneMap[newLo.row][newLo.col] !== 2 || (newLo.row === tailLo.row && newLo.col === tailLo.col))
                setDirection('bot')
        }
        //Render new Snake position
        if (cloneMap[newLo.row][newLo.col] === 1 || (newLo.row === tailLo.row && newLo.col === tailLo.col)) safeMove(cloneMap, newLo, crLo)
        else if (cloneMap[newLo.row][newLo.col] === 4) eatFood(cloneMap, newLo, crLo)
    }

    function render() {
        return locations.map((location) => {
            return location.map((col, value) => {
                return (
                    <Location col={col} key={value} />
                )
            })
        })
    }

    return (
        <div className='hungry-snake'>
            {ready ?
                <div className='frame-map' onKeyDown={changeDirection} tabIndex="0">
                    {render()}
                    <audio ref={auEat} src={require('../sounds/hungrySnake/snakeEat.mp3')} />
                </div> :
                <div>
                    <div className='blackout'></div>
                    <Ready setReady={(a) => setReady(a)} />
                </div>
            }
        </div>
    )
}