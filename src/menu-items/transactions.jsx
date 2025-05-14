// src/menu-items/transactions.jsx
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

const transactions = {
  id: 'transactions-group',
  title: 'Transações',
  type: 'group',
  children: [
    {
      id: 'transactions-create',
      title: 'Nova Transação',
      type: 'item',
      url: '/transactions/create',
      icon: ListAltOutlinedIcon,
      breadcrumbs: true
    }
  ]
};

export default transactions;
