import React from 'react'
import { createExpense, deleteBudget, deleteExpense, getAllMatchingItems } from '../helpers'
import { redirect, useLoaderData } from 'react-router-dom'
import BudgetItem from './BudgetItem';
import AddExpenseForm from './AddExpenseForm';
import ExpensesTable from './ExpensesTable';
import { toast } from 'react-toastify';

export async function budgetLoader({params}){
    const budget = await getAllMatchingItems({
        category: 'budgets',
        key: 'id',
        value: params.id,
    })[0]

    const expenses = await getAllMatchingItems({
        category: 'expenses',
        key: 'budgetId',
        value: params.id,
    })

    console.log(expenses);

    if(!budget || !expenses){
        throw new Error("This budget is not exist")
    }

    return {budget, expenses}
}

export async function budgetAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if (_action === 'createExpense') {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
            return toast.success(`Expense "${values.newExpense}" was created!`)

        } catch (error) {
            throw new Error("There was a problem creating a new expense")
        }
    }

    if (_action === 'deleteExpense') {
        try {
            deleteExpense(values.expenseId)
            return toast.success(`Expense was deleted!`)
        } catch (error) {
            throw new Error("There was a problem deleting your expense")
        }
    }

    if (_action === 'deleteBudget') {
        try {
            deleteBudget(values.budgetId)
            toast.success(`Budget was deleted!`)
            return redirect('/')
        } catch (error) {
            throw new Error("There was a problem deleting your budget")
        }
    }
}


const BudgetPage = () => {
    const {budget, expenses} = useLoaderData();

  return (
    <div className='grid-lg' style={{'--accent': budget.color}}>
        <h1 className='h2'>
            <span className='accent'>
                {budget.name}
            </span> {" "}
            Overview
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDeleteButton={true}/>
            <AddExpenseForm budgets={[budget]}/>
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name}</span>
                        {" "} Expenses
                    </h2>
                    <ExpensesTable expenses={expenses} showBudget={false}/>
                </div>
            )
        }
    </div>
  )
}

export default BudgetPage