import React from 'react'
import Die from './Die'
import { useState } from 'react'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'

const Main = () => {
  function generatedAllDice(){
    const arr=[]
    for(let i=0;i<10;i++){
      const rand={value:Math.ceil(Math.random()*6), isHeld:false,
        id:nanoid()
      }
      arr.push(rand)
    }
    return arr
  }
 function rolldice() {
  if(!gameWon){
    setDice(oldDice => oldDice.map(die => 
        die.isHeld ?
            die :
            { ...die, value: Math.ceil(Math.random() * 6) }
    ))
    }
    else{
      setDice(generatedAllDice())
    }
  }
  function hold(id){
    setDice(prevDice=>prevDice.map(die=>die.id === id?{...die,isHeld: !die.isHeld}:die))
  }

  const [dice,setDice]=useState( () => generatedAllDice())
  const [width, height] = useWindowSize()
  const gameWon=dice.every(die=>die.isHeld)&&dice.every(die=>die.value===dice[0].value)
  
  const diceElements=dice.map(dieObj=> 
  <Die 
  key={dieObj.id} 
  value={dieObj.value} 
  isheld={dieObj.isHeld}
  hold={()=>hold(dieObj.id)}
  //   button.onClick = hold(dieObj.id);  // ❌ calls hold immediately

  // button.onClick = () => hold(dieObj.id);  // ✅ sets up a click handler
  />
  )
  return (
    <>
      <div className='container flex items-center justify-center h-screen p-4 mx-auto bg-gray-800'>
        <div className='bg-white h-[80vh] w-full max-w-[80vh] sm:h-[500px] shadow-xl rounded-3xl flex flex-col justify-center items-center'>
        <h1 className="title">Tenzies</h1>
        <p className="mt-2 text-center text-gray-600 text-md sm:text-lg">
        Roll until all dice are the same. Click each die to freeze it.
        </p>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {diceElements}
        </div>
        <button 
         className={`mx-auto mt-10 text-4xl font-bold text-white w-25 h-15   rounded-2xl hover:scale-105 duration-150
        ${gameWon ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-900  hover:bg-blue-950'}`}
       onClick={rolldice}>
      {gameWon ? "New" : "Roll"}
       </button>
        {gameWon && <Confetti width={width} height={height} />}
        {gameWon?<p className='mt-2 text-2xl font-bold italic'>YOU HAVE WON!!</p> :null}
          </div>
      </div>
    </>
  )
}

export default Main