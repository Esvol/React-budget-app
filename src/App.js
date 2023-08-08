import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard, { dashBoardAction, dashBoardLoader } from './pages/Dashboard';
import Main, { mainLoader } from './layouts/Main';
import Error from './pages/Error';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ExpensesPage, { expenseAction, expensesLoader } from './components/ExpensesPage';
import { logoutAction } from './components/Nav';
import BudgetPage, { budgetAction, budgetLoader } from './components/BudgetPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
        loader: dashBoardLoader,
        action: dashBoardAction,
        errorElement: <Error/>,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "expenses",
        element: <ExpensesPage/>,
        loader: expensesLoader,
        action: expenseAction,
        errorElement: <Error/>,
      },
      {
        path: "budget/:id",
        element: <BudgetPage/>,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error/>,
      }
    ]
  },

]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  );
}

export default App;
