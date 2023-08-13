import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashBoardAction, dashBoardLoader } from "./pages/Dashboard";
import Main, { mainLoader } from "./layouts/Main";
import Error from "./pages/Error";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./components/ExpensesPage";

import { logoutAction } from "./components/Nav";
import BudgetPage, {
  budgetAction,
  budgetLoader,
} from "./components/BudgetPage";

import LogIn, { logInAction } from "./components/LogIn";
import Register, { registerAction } from "./components/Register";
import ExpensesHistoryPage, { historyLoader } from "./components/ExpensesHistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/:id",
        element: <Dashboard />,
        loader: dashBoardLoader,
        action: dashBoardAction,
        errorElement: <Error />,
      },
      {
        path: "login",
        element: <LogIn />,
        action: logInAction,
        errorElement: <Error />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "/expenses/:id",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "/budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
      },
      {
        path: "/history/:id",
        element: <ExpensesHistoryPage />,
        loader: historyLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
