import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className='error'>
      <h1>Uh oh! We`he got a problem</h1>
      <p>There was a problem, please go back.</p>
      <div className="flex-md">
        <button className='btn btn--dark' onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>
        <Link to={'/'}>
          <button className='btn btn--dark'>
            <HomeIcon width={20} />
            <span>Go home</span>
          </button>
        </Link>

      </div>
    </div>
  )
}

export default Error