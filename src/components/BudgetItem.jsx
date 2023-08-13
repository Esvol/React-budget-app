import React, { useState } from 'react'
import { calculateSpentByBudgets, formatCurrency, formatPercentage } from '../helpers';
import { Form, Link, useFetcher } from 'react-router-dom';
import { BanknotesIcon, CheckBadgeIcon, TrashIcon } from '@heroicons/react/24/solid';

const BudgetItem = ({ budget, showDeleteButton = false }) => {
    const fetcher = useFetcher();
    const [isEdit, setIsEdit] = useState(false)

    const { id, name, amount, color, userId } = budget;

    const spent = calculateSpentByBudgets(id);
    

    const onCheckDelete = (e) => {
        if (!window.confirm("You sure you want delete this budget and all it expenses?")) {
            e.preventDefault();
        }
    }

    const editHandler = (e) => {
        setIsEdit(!isEdit)
        e.preventDefault()
    }

    return (
        <div className='budget' style={{ "--accent": color }}>

            {
                isEdit ?
                        <Form method='post' onSubmit={() => setIsEdit(!isEdit)} className='progress-text'>
                            <input type="text" name='editName' style={{ width: '40%' }} />
                            <p>
                                <input type="text" name='editAmount' style={{ width: '25%', marginRight: '5px' }} />
                                USD Budgeted
                            </p>
                            <>
                                <input type="hidden" name='_action' value="editBudget" />
                                <input type="hidden" name='budgetId' value={id} />
                                <button type='submit' className='btn after-item' style={{ "--accent": color, backgroundColor: `hsl(${color}, 0.8)` }}>
                                    <CheckBadgeIcon width={25} />
                                </button>
                            </>
                        </Form>
                    :
                    <div className='progress-text'>
                        <h3>{name}</h3>
                        <p>{formatCurrency(amount)} Budgeted</p>
                        <Form onSubmit={editHandler} method='post' className='after-item'>
                            <button type='submit' className='btn' style={{ "--accent": color, backgroundColor: `hsl(${color}, 0.8)` }}>Edit</button>
                        </Form>
                    </div>
            }


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
                                <input type="hidden" name='userId' value={userId} />
                                <button type="submit" className='btn'>
                                    Delete budget
                                    <TrashIcon width={20} />
                                </button>
                            </fetcher.Form>
                        </div>
                    )
                    : (
                        <div className="flex-sm">
                            {
                                name === "" ?
                                    
                                        <button className='btn' disabled={true}>
                                            <span>View Details</span>
                                            <BanknotesIcon width={20} />
                                        </button>
                                    
                                    :
                    
                                        <Link to={`/budget/${id}`} className='btn'>
                                            <span>View Details</span>
                                            <BanknotesIcon width={20} />
                                        </Link>
                                    
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default BudgetItem