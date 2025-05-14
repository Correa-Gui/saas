import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// Páginas de Apostas
const NovaAposta = Loadable(lazy(() => import('pages/apostas/NovaAposta')));

// Páginas de Bancas
const BancaList = Loadable(lazy(() => import('pages/bancas/BancaList')));
const BancaForm = Loadable(lazy(() => import('pages/bancas/BancaForm')));

// Páginas de Transações
const TransactionList = Loadable(lazy(() => import('pages/bancas/TransactionList')));
const CreateTransaction = Loadable(lazy(() => import('pages/bancas/CreateTransaction')))

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
 // Rotas de Apostas
    { path: 'apostas', element: <NovaAposta /> },



     // Rotas de Bancas
    { path: 'bancas', element: <BancaList /> },
    { path: 'bancas/add', element: <BancaForm /> },
    { path: 'bancas/:id/edit', element: <BancaForm /> },

    // Rotas de Transações
    { path: 'transactions', element: <TransactionList /> },
    { path: 'transactions/create', element: <CreateTransaction /> },
    { path: 'bancas/:id/transactions', element: <TransactionList /> },

    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
