import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'

import {setToken} from '../store/tokenReducer'

export default function Header({
  path,
  dashPath,
  surveyCreatePath,
  surveysPath,
  defaultSurveyPath,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userToken, setUserToken] = useState('')
  const [isActive, setIsActive] = useState(false)

  function getScreenSize() {
    const screenWidth = window.innerWidth

    if (screenWidth > 1023) {
      setIsActive(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', getScreenSize)

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

  const handleLogOut = () => {
    localStorage.removeItem('token')

    const token = localStorage.getItem('token')

    dispatch(setToken(token))

    navigate('/')
  }

  return (
    <>
      <nav
        className={`navbar relative z-30 ${
          path === '/' ||
          path === '/register' ||
          path === '/login' ||
          path === '/faq'
            ? 'bg-white'
            : 'bg-[#f1f1f1]'
        } py-4 px-8`}
      >
        <div className="flex items-center shrink-0">
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
          <a
            className={`navbar-burger ${
              !isActive ? '' : 'is-active'
            } block relative w-12 h-12 text-[#4a4a4a] cursor-pointer ml-auto`}
            onClick={() => setIsActive(!isActive)}
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </a>
        </div>

        <div className="flex items-stretch grow shrink-0">
          {userToken && (
            <>
              {!isActive ? (
                <div className="navbar-menu flex items-stretch shrink-0 grow">
                  <div className="navbar-start flex items-center justify-start mr-auto">
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
                  <div className="navbar-end flex items-center justify-end ml-auto">
                    <Link
                      to="/faq"
                      className={`${
                        !(path === '/faq')
                          ? 'headerRightLink'
                          : 'headerRightLinkActive !bg-[#f1f1f1]'
                      }`}
                    >
                      FAQ
                    </Link>

                    <Link
                      to="/feedbacks"
                      className={`${
                        !(surveysPath === '/feedbacks')
                          ? 'headerRightLink'
                          : 'headerRightLinkActive'
                      }`}
                    >
                      All Surveys
                    </Link>
                    <Link
                      to="/account/default"
                      className={`${
                        !(defaultSurveyPath === '/account/default')
                          ? 'headerRightLink'
                          : 'headerRightLinkActive'
                      }`}
                    >
                      Default survey
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
                        <Link to="/account/default">
                          Default Survey
                        </Link>
                        <hr className="block bg-[#f5f5f5] h-0.5 my-1 mx-0"></hr>
                        <Link to="/" onClick={handleLogOut}>
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="navbar-menu is-active flex items-stretch shrink-0 grow">
                  <div>
                    <div className="block shrink-0 grow-0 py-2 px-3">
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
                  <div>
                    <Link
                      to="/faq"
                      className={`${
                        !(path === '/faq')
                          ? 'headerRightLink'
                          : 'headerRightLinkActive !bg-[#f1f1f1]'
                      } !block !text-left grow-0 shrink-0 relative text-[#4a4a4a] py-2 px-3`}
                    >
                      FAQ
                    </Link>
                    <Link
                      to="/feedbacks"
                      className={`${
                        !(surveysPath === '/feedbacks')
                          ? 'headerRightLink'
                          : 'headerRightLinkActive'
                      } !block !text-left grow-0 shrink-0 relative text-[#4a4a4a] py-2 px-3`}
                    >
                      All Surveys
                    </Link>
                    <Link
                      to="/account/default"
                      className={`${
                        !(defaultSurveyPath === '/account/default')
                          ? 'headerRightLink'
                          : 'headerRightLinkActive'
                      } !block !text-left grow-0 shrink-0 relative text-[#4a4a4a] !py-2 !px-3`}
                    >
                      Default survey
                    </Link>
                    <div className="block grow-0 shrink-0 relative text-[#4a4a4a]">
                      <Link
                        to="#"
                        className="headerRightLink !text-left block grow-0 shrink-0 relative text-[#4a4a4a] cursor-pointer py-2 px-3"
                      >
                        My Account
                      </Link>
                      <div className="text-sm py-2">
                        <Link
                          to="/feedbacks"
                          className={`${
                            !(surveysPath === '/feedbacks')
                              ? 'headerRightLink'
                              : 'headerRightLinkActive'
                          } !block !text-left grow-0 shrink-0 relative !px-6 !py-2`}
                        >
                          All Surveys
                        </Link>
                        <Link
                          to="/account/default"
                          className={`${
                            !(
                              defaultSurveyPath === '/account/default'
                            )
                              ? 'headerRightLink'
                              : 'headerRightLinkActive'
                          } !block !text-left grow-0 shrink-0 relative text-[#4a4a4a] !py-2 !px-6`}
                        >
                          Default Survey
                        </Link>
                        <Link
                          to="/"
                          className="block grow-0 shrink-0 relative cursor-pointer px-6 py-2"
                          onClick={handleLogOut}
                        >
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="navbar-end flex items-center justify-end ml-auto">
            {!userToken && (
              <>
                <Link
                  to="/login"
                  className="flex items-center text-#4a4a4a rounded-md py-2 px-3 hover:bg-[#f1f1f1] hover:text-[#4185f3]"
                >
                  Login
                </Link>
                <div className="flex items-center py-2 px-3">
                  <Link
                    to="/login"
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
            )}
          </div>
        </div>
      </nav>
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
  surveysPath: PropTypes.string,
}

Header.propTypes = {
  defaultSurveyPath: PropTypes.string,
}
