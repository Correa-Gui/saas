import { lazy } from "react";
import Loadable from "components/Loadable";
import DashboardLayout from "layout/Dashboard";

const FornecedoresList = Loadable(lazy(() => import("pages/fornecedores/FornecedoresList")));
const FornecedorForm = Loadable(lazy(() => import("pages/fornecedores/FornecedorForm")));


const MainRoutes = {
  path: "/",
  element: <DashboardLayout />,
  children: [
    // ... outras rotas
    { path: "fornecedores", element: <FornecedoresList /> },
    { path: "fornecedores/add", element: <FornecedorForm /> },
  
  ]
};

export default MainRoutes;
