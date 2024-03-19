import React from 'react'

function NoticeBoard() {
  return (
    <>
       <div className="w-1/2 h-[30rem] bg-[#FFFFFF] p-6 pr-0.5 rounded shadow-md">
                        <h2 className='font-bold text-2xl'>Notice Board</h2>
                        <hr className='h-1' />
                        <div className="notices w-full h-[95%] bg-[#FFFFFF] overflow-auto">
                        <div className="notice my-3">
                        <p>23 Feb, 2024</p>
                        <h2 className='text-[#8466C2] font-bold'>Jennyfar Loopez</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias excepturi officia.</p>
                        </div>
                        <div className="notice my-3">
                        <p>22 Feb, 2024</p>
                        <h2 className='text-[#8466C2] font-bold'>Killar Miller</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="notice my-3">
                        <p>21 Feb, 2024</p>
                        <h2 className='text-[#8466C2] font-bold'>Mike Hussy</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, atque vitae! Iste, officiis minus. Quaerat, ullam labore.</p>
                        </div>
                        
                        </div>
                    </div>
    </>
  )
}

export default NoticeBoard
