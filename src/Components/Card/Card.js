import React from 'react'
import './Card.css'

const Card = (props) => {
    console.log("inside card"+props)

  return (
    <div className='maindiv'>
        <div className='imgdiv'>
            <img src={props.img} alt="" />
            <p>{props.text}</p>
        </div>
        <div className='namediv'>
            <p>{props.uname}</p>
            <p>{props.time}</p>
        </div>

    </div>
  )
}

export default Card