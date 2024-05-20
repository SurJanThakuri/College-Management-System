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
// import Complaints from './pages/Complaints.jsx'
// import Complaint from './pages/Complaint.jsx'
import Payments from './pages/Payments.jsx'
import AddPayment from './pages/AddPayment.jsx'
import EditPayment from './pages/EditPayment.jsx'
import Routines from './pages/Routines.jsx'
import Routine from './pages/Routine.jsx'
import EditAdmin from './pages/EditAdmin.jsx'
import store from './store/store.js'
import AuthLayout from './components/AuthLayout.jsx'
import AddRoutine from './pages/AddRoutine.jsx'
import EditRoutine from './pages/EditRoutine.jsx'

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
                element: (
                    <AuthLayout authentication={false}>
                        <AdminLogin />
                    </AuthLayout>
                ),
            },
            {
                path: "/teacher-login",
                element: (
                    <AuthLayout authentication={false}>
                        <TeacherLogin />
                    </AuthLayout>
                ),
            },
            {
                path: "/student-login",
                element: (
                    <AuthLayout authentication={false}>
                        <StudentLogin />
                    </AuthLayout>
                ),
            },
            {
                path: "/admin-dashboard",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AdminDashboard />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/edit",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditAdmin />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/faculties",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Faculties />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/faculties/:id",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Faculty />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/faculties/add-faculty",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddFaculty />
                    </AuthLayout>
                )
            },
            {
                path: "admin-dashboard/faculties/:id/edit",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditFaculty />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/teachers",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Teachers />
                    </AuthLayout>
                )
            },
            {
                path: '/admin-dashboard/teachers/:id',
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Teacher />
                    </AuthLayout>
                )
            },
            {
                path: '/admin-dashboard/teachers/:id/edit',
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditTeacher />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/teachers/add",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddTeacher />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/students",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Students />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/students/add",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddStudent />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/students/:id",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Student />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/students/:id/edit",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditStudent />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/payments",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Payments />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/payments/add",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddPayment />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/payments/:id/edit",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditPayment />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/notices",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Notices />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/notices/add",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddNotice />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/notices/:id/edit",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditNotice />
                    </AuthLayout>
                )
            },
            // {
            //     path: "/admin-dashboard/complaints",
            //     element: (
            //         <AuthLayout authentication>
            //             {" "}
            //             <Complaints />
            //         </AuthLayout>
            //     )
            // },
            {
                path: "/admin-dashboard/routines",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Routines />
                    </AuthLayout>
                )
            },
            {
                path: "/admin-dashboard/routines/:id",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <Routine />
                    </AuthLayout>
                )
            },
           {
            path: "/admin-dashboard/routines/add-routine",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddRoutine />
                </AuthLayout>
            )
           },
           {
            path: "/admin-dashboard/routines/:id/edit",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditRoutine />
                </AuthLayout>
            )
           },
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
