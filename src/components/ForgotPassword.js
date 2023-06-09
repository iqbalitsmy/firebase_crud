import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [ error, setError ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        setError('');
        setMessage('');
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setMessage('Please check your inbox to reset password');
      } catch (error) {
        setError("Failed to reset");
      }

      setLoading(false);
    }
  return (
    <>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />-
                </Form.Group>
                <Button type='submit' disabled={loading} className='w-100 mt-2'>Reset Password</Button>
            </Form>
            <div className='w-100 text-center mt-2'>
                <Link to="/login">Login</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Create Account <Link to="/signup">Signup</Link>
      </div>
    </>
  )
}
