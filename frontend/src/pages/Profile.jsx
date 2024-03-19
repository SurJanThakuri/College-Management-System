import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function Profile() {
    return (
        <>
            <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <div className="flex justify-center w-full">
                    <div class="flex flex-col items-center max-w-sm rounded overflow-hidden shadow-lg">
                        <img class="w-1/2" src="src/assets/admin.png" alt="Sunset in the mountains" />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2 text-center">Jane Brown</div>
                            <p class="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
