import React from 'react'

function Card({title, imgSrc, number}) {
    return (
        <div className="bg-[#FFFFFF] p-4 rounded shadow-md w-56 flex flex-col items-center">
            <img className='h-14' src={imgSrc} alt="" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p>{number}</p>
        </div>
    )
}

export default Card
