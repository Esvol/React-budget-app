import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { addToHistory, deleteItemHandler, getAllMatchingItems, returnExpense } from '../helpers'
import ExpensesTable from './ExpensesTable'
import { toast } from 'react-toastify'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

export function expensesLoader({params}) {
    console.log(params);
    const expenses = getAllMatchingItems({category: "expenses", key: 'userId', value: params.id})
    return { expenses }
}

export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === 'deleteExpense') {
        try {
            addToHistory({category: 'expenses', key: 'id', value: values.expenseId})
            deleteItemHandler({category: 'expenses', key: 'id', value: values.expenseId})
            return toast.success(`Expense was deleted!`)
        } catch (error) {
            throw new Error("There was a problem deleting your expense")
        }
    }

    if (_action === 'returnExpense'){
        try {
            returnExpense({category: 'history', key: 'id', value: values.expenseId})
            return toast.success(`Expense was returned back!`)
        } catch (error) {
            throw new Error("There was a problem returning your expense")
        }
    }

    if(_action === 'deleteHistoryExpense'){
        try {
            deleteItemHandler({category: 'history', key: 'id', value: values.expenseId})
            return toast.success(`Expense was returned back!`)
        } catch (error) {
            throw new Error("There was a problem deleting your history expense")
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
                            <ExpensesTable expenses={expenses} />
                            <div className='flex-sm'>
                                <Link to={`/${expenses[0].userId}`} className='btn btn--dark'>
                                    Go back
                                    <ArrowUturnLeftIcon width={20} />
                                </Link>
                            </div>
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