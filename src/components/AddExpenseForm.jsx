import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

const AddExpenseForm = ({ budgets, isBudgetPage = false }) => {
    const fetcher = useFetcher()
    const formRef = useRef()
    const focusRef = useRef()

    const isSubmitting = fetcher.state === 'submitting'

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
        <div className='form-wrapper'>

            <h2 className="h3">Add New
                {" "}
                <span className="accent">{budgets.length === 1 && `${budgets.map(budg => budg.name ?? 'nothing yet')}`}</span>
                {" "} Expense
            </h2>

            <fetcher.Form
                method='post'
                className='grid-sm'
                ref={formRef}>

                <div className='expense-inputs'>
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input ref={focusRef} type="text" name='newExpense' id='newExpense' placeholder='e.g., Coffee' required />
                    </div>

                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input type="number" step={0.01} name='newExpenseAmount' id='newExpenseAmount' placeholder='e.g., $3.50' required inputMode='decimal' />
                    </div>
                </div>

                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>{
                        budgets.sort((a, b) => a.createdAt - b.createdAt)
                        .map((budget) => <option key={budget.id} value={budget.id}>{budget.name ?? 'nothing yet'}</option>)
                    }</select>
                </div>

                <input type="hidden" name='_action' value="createExpense"/>
                {
                    isBudgetPage && <input type="hidden" name='userId' value={budgets[0].userId}/>
                }

                <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
                    {
                        isSubmitting 
                        ?
                             <span> Submitting...</span>
                        :
                            <>
                                <span>Add Expense</span>
                                <PlusCircleIcon width={20} />
                            </>
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm