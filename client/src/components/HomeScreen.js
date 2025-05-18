import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/UserAction';
import { useNavigate } from 'react-router-dom';
import Profile from './user/Profile';
import Dashboard from '../scenes/Dashboard';
import AddIncome from './Income/AddIncome';
import AddExpense from './Expense/AddExpense';
import IncomeSummary from './Income/IncomeSummary';
import ExpenseSummary from './Expense/ExpenseSummary';
import SendReportButton from './report/Email';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountBoxIcon />,
  },
  {
    segment: 'income',
    title: 'Income',
    icon: <AttachMoneyIcon />,
  },
  {
    segment: 'expense',
    title: 'Expense',
    icon: <MoneyOffIcon />,
  },
  {
    segment: 'incomesum',
    title: 'Income-Summary',
    icon: <AttachMoneyIcon />,
  },
  {
    segment: 'expensesum',
    title: 'Expense-Summary',
    icon: <MoneyOffIcon />,
  },
  {
    segment: 'reportsummary',
    title: 'Report Summary',
    icon: <MoneyOffIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function HomeScreen(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access user data from Redux store
  const { user } = useSelector((state) => state.authState);

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const handleSignOut = () => {
    dispatch(logout);
    navigate("/");
  };

  const renderContent = () => {
    switch (pathname) {
      case '/dashboard':
        return <Dashboard />;
      case '/profile':
        return <Profile />;
      case '/income':
        return <AddIncome />;
      case '/expense':
        return <AddExpense />;
      case '/incomesum':
        return <IncomeSummary />;
      case '/expensesum':
        return <ExpenseSummary />;
      case '/reportsummary':
        return <SendReportButton />;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };


  return (
    <AppProvider
      session={{
         user: {
          name: user?.name || '',
          email: user?.email || '',
          image: user?.avatar || '',
        },
      }}
      authentication={{
        signIn: () => {
          // Handle sign in logic
        },
        signOut: handleSignOut,
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {/* <DemoPageContent pathname={pathname} user={user} /> */}
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}

HomeScreen.propTypes = {
  window: PropTypes.func,
};

export default HomeScreen;
  