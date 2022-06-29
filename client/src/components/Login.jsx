import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {setToken} from '../store/tokenReducer'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogIn(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)

      const token = localStorage.getItem('token')

      dispatch(setToken(token))

      setEmail('')
      setPassword('')

      navigate('/dashboard')
    } else {
      alert('Please check your email or password')
    }
  }
  return (
    <div className="flex min-h-screen">
      <div className="flex items-center py-12 px-6 grow">
        <div className="grow shrink text-center max-w-6xl mx-auto">
          <div className="flex flex-col w-1/3 ml-third p-3">
            <h3 className="text-3xl mb-6 font-semibold">Login</h3>
            <div className=" border border-white p-6 form-shadow rounded-md mb-6">
              <form onSubmit={handleLogIn}>
                <div className="mb-3">
                  <input
                    className="w-full max-w-full py-2 px-3 rounded-md border border-[#dbdbdb] input-shadow"
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <input
                    className="w-full max-w-full py-2 px-3 rounded-md border border-[#dbdbdb] input-shadow"
                    placeholder="Your password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <button
                  type="submit"
                  className="loginButton w-full max-w-ful"
                >
                  Login
                </button>
              </form>
            </div>
            <p className="text-base	">
              <Link
                to="/register"
                className="text-[#4185f3] pointer no-underline hover:text-[#0f66f3]"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
