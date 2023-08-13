import React from 'react'
import { fetchData } from '../helpers'
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

import wave from '../assets/wave.svg'

import Nav from '../components/Nav';


export function mainLoader() {
    const user = fetchData("currentUser");
    return { user }
}

const Main = () => {
    const { user } = useLoaderData()

    if (window.location.pathname === '/' && !user){
        return <Navigate to={'/login'} />
    }
    else if (window.location.pathname === '/' && user){
        return <Navigate to={`/${user.id}`} />
    }

    return (
        <div className='layout'>
            <Nav user={user}/>
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="wave" />
        </div>
    )
}

export default Main