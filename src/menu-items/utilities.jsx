// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  BankOutlined,
  
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  BankOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/typography',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.BgColorsOutlined
    },
    
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'cadastro-bancas',
      type: 'item',
      title: 'Bancas',
      url: '/bancas',
      icon: icons.BankOutlined,
      breadcrumbs: true
    },
    {
      id: 'transacoes',
      title: 'Transações',
      type: 'item',
      url: '/transactions/create',
      icon: icons.ListAltOutlined,
      breadcrumbs: true
    },
     {
      id: 'cadastro-apostas',
      type: 'item',
      title: 'Apostas',
      url: '/apostas',
      icon: icons.AppstoreAddOutlined,
      breadcrumbs: true
    }
  ]
};

export default utilities;
