
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorRoute from '../pages/Error';
import StudentsList from '../pages/Students/List';
import StudentForm from '../pages/Students/Form';

const router = createBrowserRouter([
    {
        path: "/",
        element: <StudentsList />,
        errorElement: <ErrorRoute />
    },
    {
        path: "/alunos/:id",
        element: <StudentForm />
    },
    {
        path: "/alunos",
        element: <StudentForm />
    }
]);

export default () => <RouterProvider router={router} />