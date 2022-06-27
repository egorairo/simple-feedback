import React, {useState, useLayoutEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'

import {setToken} from '../store/tokenReducer'

export default function Header({
  path,
  dashPath,
  surveyCreatePath,
  feedbacksPath,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userToken, setUserToken] = useState('')

  const handleLogOut = () => {
    localStorage.removeItem('token')

    const token = localStorage.getItem('token')

    dispatch(setToken(token))

    navigate('/')
  }

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setUserToken(token)
      // const user = jwt.decode(token);
      // if (!user) {
      //   localStorage.removeItem('token');
      // } else {
      //   populateQuote();
      // }
    }
  }, [])

  return (
    <>
      <div
        className={`flex relative z-30 ${
          path === '/' || path === '/register' || path === '/login'
            ? 'bg-white'
            : 'bg-[#f1f1f1]'
        } py-4 px-8`}
      >
        <div className="flex items-stretch shrink-0">
          <Link
            to="/"
            className="flex items-center text-2xl cursor-pointer py-2 px-3"
          >
            <img
              src="/img/feedback.png"
              className=" h-auto w-12 mr-4"
            ></img>
            Feed↔Back
          </Link>
        </div>
        <div className="flex items-stretch shrink-0 grow">
          {userToken && (
            <div className="flex items-center justify-start mr-auto">
              <div className="flex items-center shrink-0 grow py-2 px-3">
                <Link
                  to="/dashboard"
                  className={`${
                    !(dashPath === '/dashboard')
                      ? 'dashboardLink'
                      : 'dashboardLinkActive'
                  }`}
                >
                  Dashboard
                </Link>
              </div>
              <div className="flex items-center shrink-0 grow py-2 px-3">
                <Link
                  to="/feedback/create"
                  className={`${
                    !(surveyCreatePath === '/feedback/create')
                      ? 'userCreateSurveyLink'
                      : 'userCreateSurveyActive'
                  }`}
                >
                  Create Newsletter Survey
                </Link>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end ml-auto">
            <Link
              to="/faq"
              className="flex items-center text-#4a4a4a rounded-md  py-2 px-3 hover:bg-[#fafafa] hover:text-[#4185f3]"
            >
              FAQ
            </Link>
            {!userToken ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center text-#4a4a4a rounded-md py-2 px-3 hover:bg-[#f1f1f1] hover:text-[#4185f3]"
                >
                  Login
                </Link>
                <div className="flex items-center py-2 px-3">
                  <Link
                    to="/survey"
                    className={`${
                      !(path === '/feedback/create')
                        ? 'notUserCreateSurveyLink'
                        : 'feedbackLinksActive'
                    }`}
                  >
                    Create Survey
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/feedbacks"
                  className={`${
                    !(feedbacksPath === '/feedbacks')
                      ? 'headerRightLink'
                      : 'headerRightLinkActive'
                  }`}
                >
                  All Surveys
                </Link>
                <div className="dropdown items-center">
                  <Link
                    to="#"
                    className="dropdown-btn flex items-center text-#4a4a4a rounded-md py-2 px-3 hover:bg-[#fafafa] hover:text-[#4185f3] focus:bg-[#fafafa] focus:text-[#4185f3]"
                  >
                    My Account
                  </Link>
                  <div className="dropdown-content">
                    <Link to="/feedbacks">All Surveys</Link>
                    <Link to="/account/default">Default Survey</Link>
                    <hr className="block bg-[#f5f5f5] h-0.5 my-1 mx-0"></hr>
                    <Link to="/" onClick={handleLogOut}>
                      Log Out
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

Header.propTypes = {
  path: PropTypes.string,
}

Header.propTypes = {
  dashPath: PropTypes.string,
}

Header.propTypes = {
  surveyCreatePath: PropTypes.string,
}

Header.propTypes = {
  feedbackPath: PropTypes.string,
}

Header.propTypes = {
  feedbacksPath: PropTypes.string,
}
