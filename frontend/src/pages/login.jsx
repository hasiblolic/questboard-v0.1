import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/auth-slice'
import Spinner from '../components/spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message
  } = useSelector((state) => state.auth);


  useEffect(() => {
    //
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          
        </h1>
        <p>Already have an account? Login and start setting goals</p>
      </section>

      <section className='form row'>
        <form onSubmit={onSubmit}>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='example@email.com'
              onChange={onChange}
            />
            <label htmlFor='email'>Email Address</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />
            <label htmlFor='password'>Password</label>
          </div>

          <div className='mb-3'>
            <button type='submit' className='btn btn-outline-primary'>
              <FaSignInAlt /> Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login