import React from 'react'
import SignInForm from '@/app/auth/sign-in/SignInForm'
import { getSession } from '@/lib/session'
import SignInAction from '@/app/auth/SigninAction'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MainTitle from '@/components/main-title'
import SignupForm from '@/app/auth/sign-up/SignupForm'

export default async function SignInPage() {
  const session = await getSession()
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <MainTitle>Sign in</MainTitle>
          <form action={SignInAction} method="post">
            <SignInForm />
          </form>
        </Col>
      </Row>
    </Container>
  )
}
