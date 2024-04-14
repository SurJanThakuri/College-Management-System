import React, { useEffect , useState} from 'react'
import axios from 'axios'
import { refreshToken } from '../services/authServices'


function NoticeBoard() {

  useEffect(() => {

    const accessToken = localStorage.getItem('accessToken');
    const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

    if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
         refreshToken();
    }
    }, []);

    const[notices, setNotices] = useState([]);

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      axios.get('http://localhost:8000/api/v1/admin/notices', {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      })
          .then(response => {
              setNotices(response.data.data);
          })
          .catch(error => {
              console.log(error);
          });
      }, []);

  return (
    <>
       <div className="w-full h-[30rem] bg-[#FFFFFF] p-6 pr-0.5 rounded shadow-md">
                        <h2 className='font-bold text-2xl'>Notice Board</h2>
                        <hr className='h-1' />
                        <div className="notices w-full h-[95%] bg-[#FFFFFF] overflow-auto">
                        {notices.map((notice) => (
                        <div className="notice my-3">
                        <p>{notice.date}</p>
                        <h2 className='text-[#8466C2] font-bold'>{notice.title}</h2>
                        <p>{notice.description}</p>
                        </div>
                        ))}
                        </div>
                        </div>
    </>
  )
}

export default NoticeBoard
