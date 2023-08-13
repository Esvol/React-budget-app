import React from 'react'
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../helpers'
import { Link, useFetcher } from 'react-router-dom'
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

const ExpenseItem = ({ expense, showBudget, showHistory = false }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: 'budgets',
    key: "id",
    value: expense.budgetId,
  })[0]

  const onCheckDelete = (e) => {
    if (!window.confirm("Do you really want to completely delete this expense?")){
      e.preventDefault();
    }
  }

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {
        showBudget && <td>
          <Link to={`/budget/${budget.id}`} style={{ "--accent": budget.color }}>
            {budget.name}
          </Link>
        </td>
      }
      <td>
          {
            showHistory ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <fetcher.Form method='post' style={{ marginRight: '10px' }}>
                <input type="hidden" name='_action' value="returnExpense" />
                <input type="hidden" name='expenseId' value={expense.id} />
                <button type='submit' className='btn btn--green' aria-label={`Return ${expense.name} expense`}>
                  <ArrowPathIcon width={20} />
                </button>
              </fetcher.Form>

              <fetcher.Form method='post' onSubmit={onCheckDelete}>
                <input type="hidden" name='_action' value="deleteHistoryExpense" />
                <input type="hidden" name='expenseId' value={expense.id} />
                <button type='submit' className='btn btn--warning' aria-label={`Fully delete ${expense.name} expense`}>
                  <TrashIcon width={20} />
                </button>
              </fetcher.Form>
            </div>
          :
          <fetcher.Form method='post'>
            <input type="hidden" name='_action' value="deleteExpense" />
            <input type="hidden" name='expenseId' value={expense.id} />
            <button type='submit' className='btn btn--warning' aria-label={`Delete ${expense.name} expense`}>
              <TrashIcon width={20} />
            </button>
          </fetcher.Form>
          }
      </td>
    </>
  )
}

export default ExpenseItem