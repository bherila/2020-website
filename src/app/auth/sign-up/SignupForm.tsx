'use client'

import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignupType } from '@/app/auth/sign-up/SignupSchema'
import { SignupAction } from '@/app/auth/sign-up/SignupAction'

export default function SignupForm() {
  const [isPending, startTransition] = useTransition()
  const { register, handleSubmit } = useForm<SignupType>()

  // Not ready yet--
  // const [state, formAction] = useFormState(SignupAction, {error: ''})
  return (
    <>
      <form action={SignupAction}>
        <div className="grid lg:grid-cols-2 space-x-4">
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              className="input input-bordered"
              id="username"
              required
              {...register('alias')}
            ></input>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email address</span>
            </label>
            <input
              className="input input-bordered"
              type="email"
              required
              id="email"
              {...register('email')}
            ></input>
          </div>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            className="input input-bordered"
            type="password"
            required
            id="password"
            {...register('password')}
          ></input>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="inviteCode">
            <span className="label-text">Invite code</span>
          </label>
          <input
            className="input input-bordered"
            id="inviteCode"
            {...register('inviteCode')}
          ></input>
        </div>
        <button className="btn btn-block btn-primary" type="submit">
          Create account
        </button>
      </form>
    </>
  )
}
