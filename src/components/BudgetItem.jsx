import React from 'react'
import { calculateSpentByBudgets, formatCurrency, formatPercentage } from '../helpers';
import { Link, useFetcher } from 'react-router-dom';
import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/solid';

const BudgetItem = ({ budget, showDeleteButton = false }) => {
    const fetcher = useFetcher();

    const { id, name, amount, color } = budget;

    const spent = calculateSpentByBudgets(id);

    const onCheckDelete = (e) => {
        if (!window.confirm("You sure you want delete this budget and all it expenses?")) {
            e.preventDefault();
        }
    }

    return (
        <div className='budget' style={{ "--accent": color }}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            {
                showDeleteButton
                    ? (
                        <div className="flex-sm">
                            <fetcher.Form method="post" onSubmit={(e) => onCheckDelete(e)}>
                                <input type="hidden" name='_action' value="deleteBudget" />
                                <input type="hidden" name='budgetId' value={id} />
                                <button type="submit" className='btn'>
                                    Delete budget
                                    <TrashIcon width={20} />
                                </button>
                            </fetcher.Form>
                        </div>
                    )
                    : (
                        <div className="flex-sm">
                            <Link to={`/budget/${id}`} className='btn'>
                                <span>View Details</span>
                                <BanknotesIcon width={20} />
                            </Link>
                        </div>
                    )
            }
        </div>
    )
}

export default BudgetItem