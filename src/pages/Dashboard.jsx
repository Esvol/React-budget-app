import React from 'react'
import { addToHistory, createBudget, createExpense, deleteItemHandler, editBudget, fetchData, getAllMatchingItems, waait } from '../helpers'
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import ExpensesTable from '../components/ExpensesTable';

export function dashBoardLoader({params}) {
    const user = fetchData("currentUser");
    const budgets = getAllMatchingItems({category: "budgets", key: 'userId', value: params.id})
    const expenses = getAllMatchingItems({category: "expenses", key: 'userId', value: params.id})
    return { user, budgets, expenses }
}

export async function dashBoardAction({ request, params }) {
    await waait();
    const data = await request.formData()
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "createBudget") {
        try {
            createBudget({ name: values.newBudget, amount: values.newBudgetAmount, userId: params.id })
            return toast.success(`New budget was created!`)
        } catch (error) {
            throw new Error("There was a problem creating a new budget")
        }
    }

    if(_action === 'editBudget'){
        try {
            editBudget({category: 'budgets', key: 'id', value: values.budgetId, name: values.editName, amount: values.editAmount})
            return toast.success(`Budget was edited!`)
        } catch (error) {
            console.log(error);
            throw new Error("There was a problem editing your budget")
        }
    }

    if (_action === 'createExpense') {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget, userId: params.id })
            return toast.success(`Expense "${values.newExpense}" was created!`)

        } catch (error) {
            throw new Error("There was a problem creating a new expense")
        }
    }

    if (_action === 'deleteExpense') {
        try {
            addToHistory({category: 'expenses', key: 'id', value: values.expenseId})
            deleteItemHandler({category: 'expenses', key: 'id', value: values.expenseId})
            return toast.success(`Expense was deleted!`)

        } catch (error) {
            throw new Error("There was a problem deleting your expense")
        }
    }
}

const Dashboard = () => {
    const { user, budgets, expenses } = useLoaderData()

    if (!user) {
        return <p>No users here</p>
    }

    return (
        <>
            {
                user.name &&
                <div className='dashboard'>
                    <h1>Welcome back, <span className="accent">{user.name}</span></h1>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > 0 && user
                                ? (
                                    <div className="grid-lg">
                                        <div className="flex-lg">
                                            <AddBudgetForm />
                                            <AddExpenseForm budgets={budgets} />
                                        </div>

                                        <h2>Existing Budgets</h2>

                                        <div className="budgets">
                                            {
                                                budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) => <BudgetItem key={budget.id} budget={budget} />)
                                            }
                                        </div>

                                        {
                                            expenses && expenses.length > 0
                                                &&
                                                <div className='grid-xs'>
                                                    <h2>Recent Expenses</h2>
                                                    <ExpensesTable
                                                        expenses={expenses
                                                            .sort((a, b) => b.createdAt - a.createdAt)
                                                            .slice(0, 8)} />
                                                    {expenses.length > 8 && (
                                                        <Link to={`/expenses/${user.id}`} className='btn btn--dark'>View all expenses</Link>
                                                    )}
                                                </div>
                                        }
                                    </div>
                                )
                                : (
                                    <div className='grid-sm'>
                                        <p>Personal budgeting is the
                                            secret to financial </p>
                                        <p>Create budget to get started</p>
                                        <AddBudgetForm />
                                    </div>
                                )

                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard