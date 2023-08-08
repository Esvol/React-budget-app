import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { deleteExpense, fetchData } from '../helpers'
import ExpensesTable from './ExpensesTable'
import { toast } from 'react-toastify'

export function expensesLoader() {
    const expenses = fetchData("expenses")
    return { expenses }
}

export async function expenseAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if (_action === 'deleteExpense') {
        try {
            deleteExpense(values.expenseId)
            return toast.success(`Expense was deleted!`)
        } catch (error) {
            throw new Error("There was a problem deleting your expense")
        }
    }
}

const ExpensesPage = () => {

    const { expenses } = useLoaderData()

    return (
        <div className='grid-lg'>
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0 
                ?
                (
                    <div className='grid-md'>
                        <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                        <ExpensesTable expenses={expenses}/>
                    </div>
                )
                :
                (
                    <p>No expenses to show.</p>
                )
            }
        </div>
    )
}

export default ExpensesPage