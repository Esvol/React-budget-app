import React, { useEffect, useRef } from 'react'
import { Link, redirect, useFetcher } from 'react-router-dom'

import illustration from '../assets/illustration.jpg'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { fetchData } from '../helpers'
import { toast } from 'react-toastify'

export async function registerAction ({request}) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "newUser") {
        try {
            const users = fetchData('users') ?? []
            users.forEach(user => {
                if (user.name === values.userName && user.password === values.password) {
                    alert("This user is already exist!")
                    throw new Error('This user is already exist!')
                }
            })

            const userId = crypto.randomUUID()
            localStorage.setItem("users", JSON.stringify([...users, { name: values.userName, password: values.password, id: userId }]))
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify({ name: values.userName, password: values.password, id: userId }))
            toast.success(`Welcome, ${values.userName}`)
            return redirect(`/${userId}`);

        } catch (error) {
            console.log(error);
            return redirect('/register');
        }
    }
}

const Intro = () => {
    const fetcher = useFetcher()
    const formRef = useRef()
    const inputNameRef = useRef()
    const isSubmitting = fetcher.state === "submitting"


    useEffect(() => {
        formRef.current.reset();
        inputNameRef.current.focus();
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
                <fetcher.Form ref={formRef}
                    method="post"
                >
                    <input ref={inputNameRef}
                    type="text" 
                    name='userName' 
                    required 
                    placeholder='What is your name?' 
                    aria-label='Your Name' 
                    autoComplete='given-name'/>

                    <input 
                    type="password" 
                    name='password' 
                    required 
                    placeholder='Write password' 
                    aria-label='Your password' 
                    autoComplete='given-password'/>

                    <input type="hidden" name='_action' value="newUser"/>

                    <button className="btn btn--dark">
                        <span>Create account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </fetcher.Form>
                <p>Already have an account? <Link to={'/login'} className='linka'>Click here</Link></p>
            </div>
            
            <img src={illustration} alt="Person With Money" width={600}/>
        </div>
    )
}

export default Intro