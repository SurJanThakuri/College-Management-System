import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Faculty() {
    return (
        <div>
            <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
                <div className="flex">
                    <Sidebar />
                    <div className="w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
                <Header title="Admin" />
                        <div className="flex justify-between items-center">
                        <h1 className='text-2xl font-bold'>Bachelor of Computer Application</h1>
                        <div className="flex gap-3">
                        <Link to="/admin-dashboard/faculties/BCA/edit">
                            <Button children="Edit" type='button' className='px-4' />
                        </Link>
                        <Link to="/admin-dashboard/faculties/BCA/edit">
                            <Button children="Delete" type='button' className='px-4' bgColor='bg-red-600' hover='hover:bg-red-700' />
                        </Link>
                        </div>
                        </div>
                        <p className='my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quae recusandae obcaecati assumenda nostrum officia, quo rerum laboriosam, dolorem aliquam esse, quis sed laborum voluptatum unde. Eveniet laudantium omnis qui? Suscipit, voluptates delectus dicta numquam neque praesentium eum fugit id ullam saepe, ut, nam nostrum labore ad molestiae minima porro doloremque illo ex. Temporibus impedit hic veritatis deleniti neque in perspiciatis dolor enim inventore ut nam explicabo fugiat debitis magnam dolorum, assumenda consectetur recusandae eligendi ad ex ratione aspernatur, ipsum quasi. Nostrum, odit ab unde illum at earum molestias sunt est a nisi blanditiis itaque! Eveniet dolor labore consequatur cupiditate.</p>

                        <h2 className='font-bold text-xl'>BCA Course Structure:</h2>
                        <div className="image flex items-center justify-center my-4">
                            <img src="	https://i0.wp.com/bcanotesnepal.com/wp-content/uploads/2022/07/bca-course-structure.png?w=680&ssl=1" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faculty
