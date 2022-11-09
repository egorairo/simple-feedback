import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {decodeToken} from 'react-jwt'
import {useNavigate} from 'react-router-dom'

import FeedbacksCharts from './FeedbacksChart'
import EyeSvg from '../../public/img/eye.svg?component'

export default function Feedbacks() {
  const navigate = useNavigate()

  const [surveys, setSurveys] = useState([])
  const [displayedSurveys, setDisplayedSurveys] = useState([])
  const [givenFeedbacks, setGivenFeedbacks] = useState([])

  const [searchedFormValue, setSearchedFormValue] = useState('')

  const getSurveys = async () => {
    const req = await fetch(
      'https://env-production.up.railway.app/api/surveys',
      {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      }
    )

    const data = await req.json()

    if (data.status === 'ok') {
      setSurveys(data.surveys)
      setDisplayedSurveys(data.surveys)
    } else {
      alert(data.error)
    }
  }

  const getGivenFeedbacks = async () => {
    const req = await fetch(
      'https://env-production.up.railway.app/api/giveFeedback',
      {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      }
    )

    const data = await req.json()

    if (data.status === 'ok') {
      const givenFeedbacks = data.givenFeedback

      setGivenFeedbacks(givenFeedbacks)
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = decodeToken(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate('/')
      } else {
        getSurveys()
        getGivenFeedbacks()
      }
    }
  }, [])

  const handleSubmitSearchForm = (e) => {
    e.preventDefault()

    let displayedSurveys = surveys.filter((survey) => {
      return survey.names.formName
        .toLowerCase()
        .includes(searchedFormValue.toLowerCase())
    })

    if (!searchedFormValue) {
      displayedSurveys = surveys
    }

    setDisplayedSurveys(displayedSurveys)
  }

  return (
    <div className="w-full bg-[#f1f1f1]">
      <section className="block py-12 px-6">
        <div className="container grow w-auto relative my-0 mx-auto">
          <div className="flex justify-center -m-3">
            <div className="column is-6-desktop">
              <div>
                <form
                  className="flex justify-start items-center"
                  onSubmit={handleSubmitSearchForm}
                >
                  <div className="flex grow shrink -m-[1px] relative">
                    <input
                      type="text"
                      placeholder="Search your survey"
                      className="input input-shadow max-w-full rounded-l-md rounded-r-none !border-[#dbdbdb] focus:!outline-none focus:!border focus:!border-[#4185f3]"
                      onChange={(e) =>
                        setSearchedFormValue(e.target.value)
                      }
                    ></input>
                  </div>
                  <div className="relative items-centers">
                    <button
                      type="submit"
                      className="button rounded-md rounded-l-none !bg-[#222] border-transparent !text-white"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              {displayedSurveys.length !== 0 ? (
                <>
                  {displayedSurveys?.map((survey) => {
                    const greatFeedbacks = givenFeedbacks.filter(
                      (givenFeedback) => {
                        if (givenFeedback.id === survey.id) {
                          return givenFeedback.num === '1'
                        }
                      }
                    )
                    const okFeedbacks = givenFeedbacks.filter(
                      (givenFeedback) => {
                        if (givenFeedback.id === survey.id) {
                          return givenFeedback.num === '2'
                        }
                      }
                    )
                    const badFeedbacks = givenFeedbacks.filter(
                      (givenFeedback) => {
                        if (givenFeedback.id === survey.id) {
                          return givenFeedback.num === '3'
                        }
                      }
                    )

                    return (
                      <div
                        className="relative bg-[#222] text-white rounded card-shadow max-w-full mt-12"
                        key={survey.id}
                      >
                        <div className="flex items-stretch bg-transparent card-header-shadow border-tl-rounded border-tr-rounded">
                          <p className="flex grow items-center font-semibold text-[#363636] py-3 px-4">
                            <Link
                              to={`/feedback/${survey.id}`}
                              className="mainColor cursor-pointer no-underline hover:text-[#2c64be]"
                            >
                              {`${survey.names.formName} (${
                                greatFeedbacks.length +
                                okFeedbacks.length +
                                badFeedbacks.length
                              })`}
                            </Link>
                          </p>
                        </div>
                        <div className="bg-transparent p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex justify-center text-center grow shrink-0 basis-auto">
                              <div>
                                {!(
                                  greatFeedbacks.length === 0 &&
                                  okFeedbacks.length === 0 &&
                                  badFeedbacks.length === 0
                                ) ? (
                                  <FeedbacksCharts
                                    great={greatFeedbacks.length}
                                    ok={okFeedbacks.length}
                                    bad={badFeedbacks.length}
                                  />
                                ) : (
                                  <p>
                                    No feedbacks from <br></br> your
                                    readers
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-center text-center grow shrink-0 basis-auto">
                              <div>
                                <p className="text-base">😀</p>
                                <p className="text-4xl text-[#2acd6d] font-normal">
                                  {greatFeedbacks.length}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-center text-center grow">
                              <div>
                                <p className="text-base">😐</p>
                                <p className="text-4xl text-[#fff44f] font-normal">
                                  {okFeedbacks.length}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-center text-center grow">
                              <div>
                                <p className="text-base">🙁</p>
                                <p className="text-4xl text-[#ec5757] font-normal">
                                  {badFeedbacks.length}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <footer className="flex items-stretch bg-transparent footer-top-border rounded-b p-3">
                          <Link
                            to={`/feedback/${survey.id}`}
                            className="flex basis-0 grow shrink-0 justify-center items-center mainColor cursor-pointer no-underline hover:text-[#2c64be]"
                          >
                            <span className="flex w-4 h-4">
                              <EyeSvg />
                            </span>
                          </Link>
                        </footer>
                      </div>
                    )
                  })}
                </>
              ) : (
                <p className="text-center mt-12">
                  No feedbacks form found
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
