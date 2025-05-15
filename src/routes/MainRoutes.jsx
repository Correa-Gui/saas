 import { lazy } from 'react';
 import Loadable from 'components/Loadable';
 import DashboardLayout from 'layout/Dashboard';

 // …outras páginas…
const FornecedoresList = Loadable(lazy(() => import('pages/fornecedores/FornecedoresList')));
const FornecedorForm   = Loadable(lazy(() => import('pages/fornecedores/FornecedorForm')));

 const MainRoutes = {
   path: '/',
   element: <DashboardLayout />,
   children: [
     { path: '/', element: <DashboardDefault /> },
    { path: 'fornecedores',        element: <FornecedoresList /> },
    { path: 'fornecedores/add',    element: <FornecedorForm /> },
    { path: 'fornecedores/:id',    element: <FornecedorForm /> },
     // …outras rotas…
   ]
 };

 export default MainRoutes;
