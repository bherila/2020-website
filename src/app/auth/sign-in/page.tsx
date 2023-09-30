'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { redirect } from 'next/navigation'

interface EmailPassword {
  email?: string
  password?: string
}

const Form = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailPassword>()
  const [loggedIn, setLoggedIn] = useState(false)

  function login(formData: EmailPassword) {
    setLoggedIn(true)
    redirect('/')
    return null
  }

  return (
    <div className="section is-fullheight">
      {loggedIn && redirect('/')}
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(login)} noValidate>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    className={`input ${errors.email && "is-danger"}`}
                    type="email"
                    required
                    {...register('email', { required: true })}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${errors.password && 'is-danger'}`}
                    type="password"
                    {...register('password', { required: true })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
