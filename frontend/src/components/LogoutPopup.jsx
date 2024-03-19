import React from 'react'

function LogoutPopup({onCancel, onConfirm}) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg h-[20vh] w-[30vw]">
                <p className="font-bold text-lg text-black">Are you sure you want to logout?</p>
                <div className="flex justify-end mt-4 mb-5">
                    <button className="font-bold px-4 py-2 mr-4 border text-white border-black-700 bg-blue-600 rounded-md hover:bg-blue-800" onClick={onCancel}>No</button>
                    <button className="font-bold px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default LogoutPopup
