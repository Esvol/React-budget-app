import React from 'react'
import logomark from '../assets/logomark.svg'

import { Link, NavLink, redirect, useFetcher } from 'react-router-dom'

import { ArrowLeftCircleIcon, KeyIcon, TrashIcon } from '@heroicons/react/24/solid'
import { deleteItemLocalStorage } from '../helpers'
import { toast } from 'react-toastify'

export async function logoutAction() {
    deleteItemLocalStorage(["currentUser"]);

    toast.success("You`ve log out your account!")

    return redirect("/register")
}


const Nav = ({ user }) => {

    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === 'submitting'

    const checkLogout = (event) => {
        if (!window.confirm("You sure you want to log out?")) {
            event.preventDefault();
        }
    }

    return (
        <nav>
            <NavLink to={`/${user?.id ?? 'register'}`} aria-label='Go to home'>
                <img src={logomark} alt="logo" height={30} />
                <p>HomeBudget</p>
            </NavLink>
            {
                user && (
                    <div style={{width: '300px', display: 'flex', justifyContent: 'space-between'}}>
                        <Link to={`/history/${user?.id}`} className='btn btn--history'>
                            History
                            <TrashIcon width={20}/>
                        </Link>

                        <fetcher.Form
                            method='post'
                            action='/logout'
                            onSubmit={(e) => { checkLogout(e) }}>
                            <button type='submit' className='btn btn--warning' disabled={isSubmitting}>
                                <span>Log Out</span>
                                <KeyIcon width={20} />
                            </button>
                        </fetcher.Form>
                    </div>
                )
            }

            {
                window.location.pathname === "/login" && (
                    <Link to={'/register'} className='btn btn--green'>
                        Registration
                        <ArrowLeftCircleIcon width={20} />
                    </Link>
                )
            }

        </nav>
    )
}

export default Nav