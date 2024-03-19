import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AdminLogin from './pages/AdminLogin.jsx'
import Home from './pages/Home.jsx'
import TeacherLogin from './pages/TeacherLogin.jsx'
import StudentLogin from './pages/StudentLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Faculties from './pages/Faculties.jsx'
import Teachers from './pages/Teachers.jsx'
import Faculty from './pages/Faculty.jsx'
import AddFaculty from './pages/AddFaculty.jsx'
import EditFaculty from './pages/EditFaculty.jsx'
import AddTeacher from './pages/AddTeacher.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Teacher from './pages/Teacher.jsx'
import EditTeacher from './pages/EditTeacher.jsx'
import Students from './pages/Students.jsx'
import AddStudent from './pages/AddStudent.jsx'
import Student from './pages/Student.jsx'
import EditStudent from './pages/EditStudent.jsx'
import Notices from './pages/Notices.jsx'
import AddNotice from './pages/AddNotice.jsx'
import EditNotice from './pages/EditNotice.jsx'
import Complaints from './pages/Complaints.jsx'
import Complaint from './pages/Complaint.jsx'
import Payments from './pages/Payments.jsx'
import AddPayment from './pages/AddPayment.jsx'
import EditPayment from './pages/EditPayment.jsx'
import Routines from './pages/Routines.jsx'
import Routine from './pages/Routine.jsx'
import AddClass from './pages/AddClass.jsx'
import ClassTimes from './pages/ClassTimes.jsx'
import EditClass from './pages/EditClass.jsx'
import EditAdmin from './pages/EditAdmin.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/admin-login",
                element: <AdminLogin />
            },
            {
                path: "/teacher-login",
                element: <TeacherLogin />
            },
            {
                path: "/student-login",
                element: <StudentLogin />
            },
            {
                path: "/admin-dashboard",
                element: <AdminDashboard />
            },
            {
                path: "/admin-dashboard/edit",
                element: <EditAdmin />
            },
            {
                path: "/admin-dashboard/faculties",
                element: <Faculties />
            },
            {
                path: "/admin-dashboard/faculties/BCA",
                element: <Faculty />
            },
            {
                path: "/admin-dashboard/faculties/add-faculty",
                element: <AddFaculty />
            },
            {
                path: "admin-dashboard/faculties/BCA/edit",
                element: <EditFaculty />
            },
            {
                path: "/admin-dashboard/teachers",
                element: <Teachers />
            },
            {
                path: '/admin-dashboard/teachers/teacher',
                element: <Teacher />
            },
            {
                path: '/admin-dashboard/teachers/teacher/edit',
                element: <EditTeacher />
            },
            {
                path: "/admin-dashboard/teachers/add",
                element: <AddTeacher />
            },
            {
                path: "/admin-dashboard/students",
                element: <Students />
            },
            {
                path: "/admin-dashboard/students/add",
                element: <AddStudent />
            },
            {
                path: "/admin-dashboard/students/view",
                element: <Student />
            },
            {
                path: "/admin-dashboard/students/1/edit",
                element: <EditStudent />
            },
            {
                path: "/admin-dashboard/payments",
                element: <Payments />
            },
            {
                path: "/admin-dashboard/payments/add",
                element: <AddPayment />
            },
            {
                path: "/admin-dashboard/payments/1/edit",
                element: <EditPayment />
            },
            {
                path: "/admin-dashboard/notices",
                element: <Notices />
            },
            {
                path: "/admin-dashboard/notices/add",
                element: <AddNotice />
            },
            {
                path: "/admin-dashboard/notices/1/edit",
                element: <EditNotice />
            },
            {
                path: "/admin-dashboard/notices/1/view",
                element: <Complaint />
            },
            {
                path: "/admin-dashboard/complaints",
                element: <Complaints />
            },
            {
                path: "/admin-dashboard/routines",
                element: <Routines />
            },
            {
                path: "/admin-dashboard/routines/BCA",
                element: <Routine />
            },
           {
            path: "/admin-dashboard/routines/BCA/add-class",
            element: <AddClass />
           },
           {
            path: "/admin-dashboard/routines/BCA/edit-class",
            element: <EditClass />
           },
           {
            path: "/admin-dashboard/routines/class-times",
            element: <ClassTimes />
           }
        ],
    },
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
