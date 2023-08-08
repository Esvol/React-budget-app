import React from 'react'
import logomark from '../assets/logomark.svg'

import { NavLink, redirect, useFetcher } from 'react-router-dom'

import {TrashIcon} from '@heroicons/react/24/solid' 
import { deleteItem } from '../helpers'
import { toast } from 'react-toastify'

export async function logoutAction(){
    deleteItem(["userName", "budgets", "expenses"]);

    toast.success("You`ve deleted your account!")
    
    return redirect("/")
}


const Nav = ({ userName }) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === 'submitting'

    const checkLogout = (event) => {
        if(!window.confirm("Delete user and all data?")){
            event.preventDefault();
        }
    }

    return (
        <nav>
            <NavLink to={'/'} aria-label='Go to home'>
                <img src={logomark} alt="logo" height={30} />
                <p>HomeBudget</p>
            </NavLink>
            {
                userName && (
                    <fetcher.Form
                    method='post'
                    action='/logout'
                    onSubmit={(e) => {checkLogout(e)}}>
                        <button type='submit' className='btn btn--warning' disabled={isSubmitting}>
                            <span>Delete User</span>
                            <TrashIcon width={20}/>
                        </button>
                    </fetcher.Form>
                )
            }
        </nav>
    )
}

export default Nav