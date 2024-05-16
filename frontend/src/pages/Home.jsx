import Button from '../components/Button'
import InputField from '../components/InputField'
import TextAreaField from '../components/TextAreaField'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Home() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [error, setError] = useState("");

    const onSubmit = (data) => {
        console.log(data);
    };


    return (
        <div className='max-w-full min-h-screen'>
            <header className='sticky transition-all bg-white px-2 opacity-90 duration-300 top-0 flex justify-between items-center m-0'>
                <a href="#home"><div className="logo flex justify-center items-center">
                    <img src="/images/vs-logo.png" className='h-20' alt="" />
                    <img src="/images/vs-text.png" className='h-14' alt="" />
                </div></a>
                <div className="menu hidden md:block bg-white">
                    <ul className='flex justify-center gap-8 items-center font-bold text-lg cursor-pointer'>
                        
                        <li className='hover:text-[#673EE6] transition-all duration-300 hover:border-b-4 hover:border-[#673EE6]'><a href="#programs">Programs</a></li>
                        <li className='hover:text-[#673EE6] transition-all duration-300 hover:border-b-4 hover:border-[#673EE6]'><a href="#about">About</a></li>
                        <li className='hover:text-[#673EE6] transition-all duration-300 hover:border-b-4 hover:border-[#673EE6]'><a href="#gallery">Gallery</a></li>
                        <li className='hover:text-[#673EE6] transition-all duration-300 hover:border-b-4 hover:border-[#673EE6]'><a href="#services">Services</a></li>
                        <li className='hover:text-[#673EE6] transition-all duration-300 hover:border-b-4 hover:border-[#673EE6]'><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <Link to={'/admin-login'} className='login mt-3 mr-2'>
                    <Button children="Login" className='px-4 transition-all duration-300 hover:shadow-md hover:shadow-gray-400 ' />
                </Link>
            </header>
            <main className='scroll-snap-type-y mandatory'>
                <div id='home' className="hero-section scroll-snap-start h-[50vh] md:h-[70vh] w-full bg-white bg-[url('/images/smHero.jpg')] bg-cover md:bg-[url('/images/hero.jpg')]" style={{  backgroundSize: 'fit', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                    <div className="hero-text h-full mx-4 flex flex-col items-center md:items-start justify-center">
                        <h1 className="text-4xl font-bold cursor-pointer">ipsum dolor</h1>
                        <h1 className="text-4xl font-bold cursor-pointer">Lorem ipsum do sit</h1>
                        <h1 className="text-4xl font-bold cursor-pointer">do sit.</h1>
                        <h2 className='text-lg mt-6 cursor-pointer'> Blanditiis recusandae dignissimos molestiae veniam.</h2>
                        <h2 className='text-lg cursor-pointer'>amet consectetur adipisicing elit</h2>
                        <Button children="Discover More Courses" className='px-8 py-4 rounded-3xl mt-10 transition-all duration-300 hover:shadow-md hover:shadow-gray-400' />
                    </div>
                </div>

                <div id='programs' className="programs scroll-snap-start pt-16 pb-10 bg-white">
                    <div className='text-center text-blue-600 cursor-pointer'>Browser Categories</div>
                    <h1 className='font-extrabold text-4xl my-7 text-center cursor-pointer'>Our Programs</h1>
                    <div className="cards grid sm:grid-cols-2 grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 p-14 gap-4">
                        <div className="card w-[80%] sm:w-[95%] text-center hover:shadow-gray-700 hover:shadow-md hover:border-gray-100 hover:border-t-blue-600 hover:border-t-4 transition-all duration-300 ease-in-out flex flex-col gap-4 border-gray-300 border-2 p-10 h-70 rounded-md">
                            <div className="icon flex items-center justify-center">
                                <img className='h-16' src="/images/software-application.png" alt="" />
                            </div>
                            <h2 className='font-extrabold text-2xl text-wrap cursor-pointer'>BCA</h2>
                            <span className='text-gray-600 cursor-pointer'>Bachelor in Computer Application</span>
                        </div>
                        <div className="card w-[80%] sm:w-[95%] text-center hover:shadow-gray-700 hover:shadow-md hover:border-gray-100 hover:border-t-blue-600 hover:border-t-4 transition-all duration-300 ease-in-out flex flex-col gap-4 border-gray-300 border-2 p-10 h-70 rounded-md">
                            <div className="icon flex items-center justify-center">
                                <img className='h-16' src="/images/investment.png" alt="" />
                            </div>
                            <h2 className='font-extrabold text-2xl text-wrap cursor-pointer'>BBS</h2>
                            <span className='text-gray-600 cursor-pointer'>Bachelor of Business Studies</span>
                        </div>
                        <div className="card w-[80%] sm:w-[95%] text-center hover:shadow-gray-700 hover:shadow-md hover:border-gray-100 hover:border-t-blue-600 hover:border-t-4 transition-all duration-300 ease-in-out flex flex-col gap-4 border-gray-300 border-2 p-10 h-70 rounded-md">
                            <div className="icon flex items-center justify-center">
                                <img className='h-16' src="/images/management.png" alt="" />
                            </div>
                            <h2 className='font-extrabold text-2xl text-wrap cursor-pointer'>BBM</h2>
                            <span className='text-gray-600 cursor-pointer'>Bachelor of Business Management</span>
                        </div>
                        <div className="card w-[80%] sm:w-[95%] text-center self-center hover:shadow-gray-700 hover:shadow-md hover:border-gray-100 hover:border-t-blue-600 hover:border-t-4 transition-all duration-300 ease-in-out flex flex-col gap-4 border-gray-300 border-2 p-10 h-70 rounded-md">
                            <div className="icon flex items-center justify-center">
                                <img className='h-16' src="/images/social-work.png" alt="" />
                            </div>
                            <h2 className='font-extrabold text-2xl text-wrap cursor-pointer'>BSW</h2>
                            <span className='text-gray-600 cursor-pointer'>Bachelor of Arts in Social Work</span>
                        </div>

                    </div>

                    <div className="button text-center">
                        <Button children="Browse more Programs" className='hover:text-white px-8 py-4 rounded-3xl mt-2 transition-all duration-300 hover:shadow-md hover:shadow-gray-400' bgColor='white' textColor='black' />
                    </div>

                    <div id='about' className="about bg-white flex flex-col sm:flex-row justify-center items-center mx-4 sm:mx-12 my-20 rounded-xl shadow-xl">
                        <div className="img w-1/2">
                            <img src="/images/about.jpg" className='rounded-l-xl h-full' alt="" />
                        </div>
                        <div className="main w-1/2 flex flex-col justify-center gap-6 p-0 sm:p-10">
                            <div>
                                <h2 className='font-extrabold text-4xl text-wrap'>About</h2>
                                <h2 className='font-extrabold text-4xl text-wrap'>VS International</h2>
                            </div>

                            <span className='text-gray-500 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum vitae aspernatur neque atque enim similique omnis possimus dicta culpa libero?</span>
                            <img src="/images/signature.png" className='h-12 w-1/4' alt="" />
                            <Button children="Learn More" className='px-8 py-3 w-fit rounded-3xl transition-all duration-300 border-none hover:shadow-md hover:shadow-gray-400' />
                        </div>
                    </div>
                </div>

                <div id='gallery' className="gallery py-16">
                    <div className='text-center text-blue-600 cursor-pointer'>Featured Pictures</div>
                    <h1 className='font-extrabold text-4xl my-7 text-center cursor-pointer'>Our Academic Gallery</h1>

                    <div className="cards flex flex-wrap md:flex-row flex-col gap-8 justify-center items-center">
                        <div className="card max-w-80 rounded-3xl shadow-xl h-auto ">
                            <div className="img">
                                <img src="/images/image1.jpg" alt="" className='rounded-t-xl' />
                            </div>
                            <div className='m-6 p-4'>
                                <span className='bg-purple-100 text-purple-600 px-3 py-1 rounded-full my-4'>Cafeteria</span>
                                <h2 className='font-extrabold text-2xl my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
                            </div>
                        </div>
                        <div className="card max-w-80 rounded-3xl shadow-xl h-auto ">
                            <div className="img">
                                <img src="/images/image3.jpg" alt="" className='rounded-t-xl' />
                            </div>
                            <div className='m-6 p-4'>
                                <span className='bg-orange-100 text-orange-600 px-3 py-1 rounded-full my-4 cursor-pointer'>Playing</span>
                                <h2 className='font-extrabold text-2xl my-4 cursor-pointer'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
                            </div>
                        </div>
                        <div className="card max-w-80 rounded-3xl shadow-xl h-auto ">
                            <div className="img">
                                <img src="/images/image2.jpg" alt="" className='rounded-t-xl' />
                            </div>
                            <div className='m-6 p-4'>
                                <span className='bg-pink-100 text-pink-600 px-3 py-1 rounded-full my-4 cursor-pointer'>Examination</span>
                                <h2 className='font-extrabold text-2xl my-4 cursor-pointer'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
                            </div>
                        </div>
                        <div className="card max-w-80 rounded-3xl shadow-xl h-auto ">
                            <div className="img">
                                <img src="/images/image5.webp" alt="" className='rounded-t-xl' />
                            </div>
                            <div className='m-6 p-4'>
                                <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full my-4 cursor-pointer'>Classroom</span>
                                <h2 className='font-extrabold text-2xl my-4 cursor-pointer'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
                            </div>
                        </div>


                    </div>
                </div>

                <div id='services' className="features py-10 mb-20">
                    <div className="bg w-full pt-16 pb-10" style={{ backgroundImage: `url(/images/blue-bg.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                        <div className='text-center text-white cursor-pointer'>Browser Features</div>
                        <h1 className='font-extrabold text-4xl my-7 text-center text-white cursor-pointer'>College Services</h1>

                        <div className="cards z-10 flex items-center justify-center flex-col lg:flex-row py-8 px-4 gap-4">
                            <div className="card bg-white text-center hover:shadow-gray-700 hover:shadow-md hover:border-gray-100 transition-all duration-300 ease-in-out max-w-[450px] flex flex-col gap-4 shadow-md p-10 h-70 rounded-md">
                                <div className="icon flex items-center justify-center">
                                    <img className='h-16' src="/images/diploma.png" alt="" />
                                </div>
                                <h2 className='font-extrabold text-2xl text-nowrap cursor-pointer'>Academic Support</h2>
                                <span className='text-gray-600 cursor-pointer'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                            </div>
                            <div className="card bg-white text-center hover:shadow-gray-700 hover:shadow-md hover:border-gray-100  transition-all duration-300 ease-in-out max-w-[450px] flex flex-col gap-4 shadow-md p-10 h-70 rounded-md">
                                <div className="icon flex items-center justify-center">
                                    <img className='h-16' src="/images/promotion.png" alt="" />
                                </div>
                                <h2 className='font-extrabold text-2xl text-nowrap cursor-pointer'>Career Assistance</h2>
                                <span className='text-gray-600 cursor-pointer'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, corrupti!</span>
                            </div>
                            <div className="card bg-white text-center hover:shadow-gray-700 hover:shadow-md hover:border-gray-100 transition-all duration-300 ease-in-out max-w-[450px] flex flex-col gap-4 shadow-md p-10 h-70 rounded-md">
                                <div className="icon flex items-center justify-center">
                                    <img className='h-16' src="/images/reading.png" alt="" />
                                </div>
                                <h2 className='font-extrabold text-2xl text-nowrap cursor-pointer'>Student Life</h2>
                                <span className='text-gray-600 cursor-pointer'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci.</span>
                            </div>
                        </div>


                    </div>
                </div>

                <div id='contact' className="contact pt-20 mt-16">
                    <div className="bg py-8 flex items-center justify-center flex-col gap-4" style={{ backgroundImage: `url(/images/contact-bg.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                        <h1 className='font-extrabold text-4xl text-center text-white cursor-pointer'>Reach Out To Us</h1>
                        <div className="card bg-white hover:shadow-gray-700 hover:shadow-md hover:border-gray-100 transition-all duration-300 ease-in-out w-10/12 shadow-md px-10 py-5 h-auto rounded-md my-5">
                            <div className="flex flex-col md:flex-row w-full">
                                <div className="contact-info md:w-1/2 my-4 p-4 flex flex-col gap-6">
                                    <div>
                                        <h1 className='font-bold text-xl'>Visit Our College at</h1>
                                        <div className="flex items-center gap-2 p-2">
                                            <img className='h-4' src="/images/location.png" alt="" />
                                            <p className='text-wrap w-full'>Minbhawan - Baneshwor, Kathmandu, Nepal</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className='font-bold text-xl'>Contact Us:</h1>
                                        <div className="flex items-center gap-2 p-2">
                                            <img className='h-4' src="/images/mail.png" alt="" />
                                            <p>example@example.com</p>
                                        </div>
                                        <div className="flex items-center gap-2 px-2">
                                            <img className='h-4' src="/images/phone-call.png" alt="" />
                                            <p><p>+0 123 456 789</p></p>
                                        </div>

                                    </div>
                                </div>
                                <form className='' onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex gap-16 my-4">
                                        <InputField
                                            label="Your Name"
                                            name="name"
                                            type="text"
                                            className='w-full rounded-md border  py-3 px-6 text-base text-body-color placeholder-body-color shadow-md outline-none focus:border-blue-600 focus-visible:shadow-none'
                                            {...register("name", { required: "Name is required" })}
                                        />
                                        {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                                        <InputField
                                            label="Your Email"
                                            name="email"
                                            type="email"
                                            className='w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-md outline-none focus:border-blue-600 focus-visible:shadow-none'
                                            {...register("email", { required: "Email is required" })}
                                        />
                                        {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                                    </div>
                                    <TextAreaField
                                        label="Message"
                                        name="message"
                                        type="text"
                                        rows="4"
                                        placeholder="Enter Your Message"
                                        className='w-full resize-none rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-md outline-none focus:border-blue-600 focus-visible:shadow-none'
                                        {...register("message", { required: "Message is required" })}
                                    />
                                    {errors.message && <span className='text-red-600'>{errors.message.message}</span>}
                                    <div className="btn flex items-center justify-center">
                                        <Button children="Submit" className='px-6' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className=' px-4 py-6 bg-white'>
                <div className="flex justify-between flex-col md:flex-row items-center text-center">
                    <div className='md:w-1/4'>
                        <h1 className='font-bold text-lg'>About Us</h1>
                        {/* <img className='h-14' src="/images/vs-logo.png" alt="" /> */}
                        <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                    <div className="follow">
                        <h1 className='font-bold text-lg'>Follow Us</h1>
                        <div className="flex gap-4 mt-4">
                            <div className='h-11 w-11 rounded-full border-2 border-gray-300 flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-none group transition-all duration-500 ease-linear'>
                                <img className='h-5 group-hover:invert' src="/images/facebook.png" alt="" />
                            </div>
                            <div className='h-11 w-11 rounded-full border-2 border-gray-300 flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-none group transition-all duration-500 ease-linear'>
                                <img className='h-5 group-hover:invert' src="/images/twitter.png" alt="" />
                            </div>
                            <div className='h-11 w-11 rounded-full border-2 border-gray-300 flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-none group transition-all duration-500 ease-linear'>
                                <img className='h-5 group-hover:invert' src="/images/insta.png" alt="" />
                            </div>
                            <div className='h-11 w-11 rounded-full border-2 border-gray-300 flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-none group transition-all duration-500 ease-linear'>
                                <img className='h-5 group-hover:invert' src="/images/linkedin.png" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="terms-condtions">
                        <h2 className='font-bold text-md'>Copyright©2024 All rights reserved</h2>
                        <div className="mt-4">
                            <p>Privacy Policy | Terms & Conditions</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
