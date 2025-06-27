import React from 'react'

const Die = (props) => {
  const styles={
    backgroundColor:props.isheld?"#59E391":undefined  }
  return (
    <>
    <button className='box'
     style={styles}
     onClick={props.hold}
     >{props.value}</button>
    </>
  )
}

export default Die