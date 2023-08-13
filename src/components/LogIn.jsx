import { UserIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef, useState } from 'react'
import { redirect, useFetcher } from 'react-router-dom'
import illustration from '../assets/illustration.jpg'
import { findUser } from '../helpers'
import { toast } from 'react-toastify'

export async function logInAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    console.log(Object.fromEntries(data));

    if (_action === 'logUser') {
        try {
            const currentUser = findUser(values.userName, values.password)
            console.log(currentUser);
            if (currentUser) {
                localStorage.removeItem('currentUser');
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                toast.success(`Welcome, ${values.userName}`)
                return redirect(`/${currentUser.id}`)
            }
            else{
                throw new Error("This account is not existed")
            }
        } catch (error) {
            console.log(error);
            return redirect('/login')
        }
    }
}

const LogIn = () => {
    const fetcher = useFetcher()
    const formRef = useRef();
    const inputForm = useRef();
    const isSubmitting = fetcher.state === 'submitting'

    const [error, setError] = useState(false)

    useEffect(() => {
        formRef.current.reset();
        inputForm.current.focus();
        if (isSubmitting) setError(true)
    }, [isSubmitting])

    return (
        <div className='intro'>
            <div>
                <h1>
                    Take Control of <span className="accent">Your money</span>
                </h1>
                <p>
                    Personal budgeting is the secret to financial freedom.
                    Start your journey today.
                </p>
                <h1 className='h3'>
                    Log in if you already have account.
                </h1>
                <fetcher.Form ref={formRef}
                    method="post"
                >
                    <input ref={inputForm}
                        type="text"
                        name='userName'
                        required
                        placeholder='Name'
                        aria-label='Your Name'
                        autoComplete='given-name' />

                    <input
                        type="password"
                        name='password'
                        required
                        placeholder='Password'
                        aria-label='Your password'
                        autoComplete='given-password' />

                    <input type="hidden" name='_action' value="logUser" />

                    <button className="btn btn--dark">
                        <span>Log in your account</span>
                        <UserIcon width={20} />
                    </button>
                </fetcher.Form>
                {
                    error && <p className='h4' style={{textDecoration: 'underline'}}>Login or password might be wrong</p>
                }
            </div>

            <img src={illustration} alt="Person With Money" width={600} />
        </div>
    )
}

export default LogIn