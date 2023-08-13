import React from 'react'
import { deleteItemHandler, getAllMatchingItems } from '../helpers'
import { Link, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import ExpensesTable from './ExpensesTable'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

export const historyLoader = ({params}) => {
    const expenses = getAllMatchingItems({category: 'history', key: 'userId', value: params.id})
    return {expenses}
}

export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === 'deleteExpense') {
        try {
            deleteItemHandler({category: 'expenses', key: 'id', value: values.expenseId})
            return toast.success(`Expense was deleted!`)
        } catch (error) {
            throw new Error("There was a problem deleting your expense")
        }
    }

    // if (_action === 'returnExpense'){
    //     try {
    //         returnExpense({category: 'history', key: 'id', value: values.expenseId})
    //         return toast.success(`Expense was returned back!`)
    //     } catch (error) {
    //         throw new Error("There was a problem returning your expense")
    //     }
    // }
}

const ExpensesHistoryPage = () => {

    const {expenses} = useLoaderData()
    
    return (
        <div className='grid-lg'>
            <h1>All deleted expenses</h1>
            {
                expenses && expenses.length > 0
                    ?
                    (
                        <div className='grid-md'>
                            <h2>History <small>({expenses.length} expeneses total)</small></h2>
                            <ExpensesTable expenses={expenses} showHistory={true}/>
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

export default ExpensesHistoryPage