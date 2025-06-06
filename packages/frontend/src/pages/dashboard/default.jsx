// src/pages/dashboard/default.jsx
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';



// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  alignSelf: 'flex-start',
  position: 'relative',
  transform: 'none'
};

// tipo -> ícone e cor
const typeMap = {
  deposit: { icon: <GiftOutlined />, color: 'success.main', bg: 'success.lighter' },
  withdrawal: { icon: <SettingOutlined />, color: 'error.main', bg: 'error.lighter' }
};

export default function DashboardDefault() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllTransactions();
        setTransactions(data.slice(0, 3));
      } catch (err) {
        console.error('Erro ao carregar transações', err);
      }
    })();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* row 1 */}
      <Grid item xs={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
      </Grid>
      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <UniqueVisitorCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Typography variant="h5">Income Overview</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Typography variant="h5">Recent Orders</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Typography variant="h5">Analytics Report</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1.5, px: 2, '& .MuiAvatar-root': avatarSX, '& .MuiListItemSecondaryAction-root': actionSX } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>
      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <SaleReportCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Typography variant="h5">Transaction History</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1.5, px: 2, '& .MuiAvatar-root': avatarSX, '& .MuiListItemSecondaryAction-root': actionSX } }}>
            {transactions.map((tx, idx) => {
              const isLast = idx === transactions.length - 1;
              const { icon, color, bg } = typeMap[tx.type] || {};
              return (
                <ListItemButton key={tx.id} divider={!isLast}>
                  <ListItemAvatar>
                    <Avatar sx={{ color, bgcolor: bg }}>{icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Transação #${tx.id}`} secondary={new Date(tx.created_at).toLocaleString('pt-BR')} />
                  <Box sx={{ ...actionSX, textAlign: 'right' }}>
                    <Typography variant="subtitle1" noWrap>
                      {tx.amount >= 0 ? '+' : '-'} R$ {Math.abs(tx.amount).toFixed(2)}
                    </Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Stack>
                <Typography variant="h5" noWrap>Help & Support Chat</Typography>
                <Typography variant="caption" color="secondary" noWrap>Typical reply within 5 min</Typography>
              </Stack>
              <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                <Avatar alt="Remy Sharp" src={avatar1} />
                <Avatar alt="Travis Howard" src={avatar2} />
                <Avatar alt="Cindy Baker" src={avatar3} />
                <Avatar alt="Agnes Walker" src={avatar4} />
              </AvatarGroup>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>Need Help?</Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
