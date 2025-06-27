import React from 'react'
import Die from './Die'
import { useState } from 'react'
import {nanoid} from "nanoid"
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
  function rolldice(){
    setDice(generatedAllDice())
  }
  function hold(id){
    console.log(id)
  }
  const [dice,setDice]=useState(generatedAllDice())
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
      <div className='bg-gray-800 h-screen container mx-auto flex justify-center items-center p-4'>
        <div className='bg-white h-[80vh] w-full max-w-[80vh] sm:h-[500px] shadow-xl rounded-3xl flex flex-col justify-center items-center'>
          <div className="grid grid-cols-5 gap-4">
           {diceElements}
        </div>
        <button className='mx-auto w-25 h-15 bg-blue-900 text-white mt-10 font-bold text-4xl rounded-2xl hover:bg-blue-950' onClick={rolldice}>Roll</button>
          </div>
      </div>
    </>
  )
}

export default Main