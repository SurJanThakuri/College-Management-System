import React from 'react'

function Faculty({name, description, imgSrc}) {
    return (
        <>
            <div className="bg-white w-52 max-h-72 rounded-lg overflow-hidden shadow-lg m-4">
                <img className="w-full h-40 object-cover object-center" src={imgSrc} alt='' />
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{name}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </>
    )
}

export default Faculty
