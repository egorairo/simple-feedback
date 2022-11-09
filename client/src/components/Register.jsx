import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegisterUser(event) {
    event.preventDefault()

    const response = await fetch(
      'https://env-production.up.railway.app/api/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/login')

      setEmail('')
      setPassword('')
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex items-center py-12 px-6 grow">
        <div className="grow shrink text-center max-w-6xl mx-auto">
          <div className="flex flex-col w-1/3 ml-third p-3">
            <h3 className="text-3xl mb-6 font-semibold">
              Create Account
            </h3>
            <p className="text-xl font-normal text-[#4a4a4a] mt-[-20px] mb-6">
              Start now and it&#39;s will be always free <br></br> for
              you!
            </p>
            <div className=" border border-white p-6 form-shadow rounded-md mb-6">
              <form onSubmit={handleRegisterUser}>
                <div className="mb-3">
                  <input
                    name="email"
                    type="email"
                    className="w-full max-w-full py-2 px-3 rounded-md border border-[#dbdbdb] input-shadow"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <input
                    name="password"
                    type="password"
                    className="w-full max-w-full py-2 px-3 rounded-md border border-[#dbdbdb] input-shadow"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <button
                  type="submit"
                  className="loginButton w-full max-w-ful"
                >
                  Register
                </button>
              </form>
            </div>
            <p className="text-base	">
              <Link
                to="/login"
                className="text-[#4185f3] pointer no-underline hover:text-[#0f66f3]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
