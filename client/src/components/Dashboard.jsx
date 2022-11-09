import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {decodeToken} from 'react-jwt'
import {useNavigate} from 'react-router-dom'

import DashboardChart from './DashboardChart'
import DeleteSvg from '../../public/img/delete.svg?component'

const withEmojis = /\p{Extended_Pictographic}/u

function findMostOnDay(arr) {
  const ranks = arr.reduce(function (totals, item) {
    const day = new Date(item).toLocaleString('en-us', {
      weekday: 'long',
    })

    if (!totals[day]) totals[day] = 0
    totals[day]++

    return totals
  }, {})

  let max = 0

  Object.keys(ranks).forEach(function (num) {
    if (ranks[num] > max) {
      max = num
    }
  })

  return max
}

export default function Dashboard() {
  const navigate = useNavigate()

  const dashDate = new Date()

  const [isLoading, setIsLoading] = useState(false)

  const [surveys, setSurveys] = useState([])
  const [givenFeedbacks, setGivenFeedbacks] = useState([])

  const greatFeedbacks = givenFeedbacks?.filter(
    ({num}) => num === '1'
  )
  const okFeedbacks = givenFeedbacks?.filter(({num}) => num === '2')
  const badFeedbacks = givenFeedbacks?.filter(({num}) => num === '3')

  const mostGreatOnDay = greatFeedbacks.map(({date}) => date)
  const mostOkOnDay = okFeedbacks.map(({date}) => date)
  const mostBadOnDay = badFeedbacks.map(({date}) => date)

  const greatFeedbacksThisMonth = givenFeedbacks.filter(
    ({num, date}) => {
      const newDate = new Date(date).getMonth()

      if (newDate === dashDate.getMonth()) {
        return num === '1'
      }
    }
  )
  const okFeedbacksThisMonth = givenFeedbacks.filter(
    ({num, date}) => {
      const newDate = new Date(date).getMonth()

      if (newDate === dashDate.getMonth()) {
        return num === '2'
      }
    }
  )
  const badFeedbacksThisMonth = givenFeedbacks.filter(
    ({num, date}) => {
      const newDate = new Date(date).getMonth()

      if (newDate === dashDate.getMonth()) {
        return num === '3'
      }
    }
  )

  const greatFeedbacksLastMonth = givenFeedbacks.filter(
    ({num, date}) => {
      const newDate = new Date(date).getMonth()

      if (newDate === dashDate.getMonth() - 1) {
        return num === '1'
      }
    }
  )
  const okFeedbacksLastMonth = givenFeedbacks.filter(
    ({num, date}) => {
      const newDate = new Date(date).getMonth()

      if (newDate === dashDate.getMonth() - 1) {
        return num === '2'
      }
    }
  )
  const badFeedbacksLastMonth = givenFeedbacks.filter(
    ({num, date}) => {
      const newDate = new Date(date).getMonth()

      if (newDate === dashDate.getMonth() - 1) {
        return num === '3'
      }
    }
  )

  async function getSurveys() {
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
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

    setIsLoading(true)

    setTimeout(() => setIsLoading(false), 1000)

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

  const updateSurveys = async (surveys) => {
    const req = await fetch(
      'https://env-production.up.railway.app/api/surveys',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          surveys: surveys,
        }),
      }
    )

    const data = await req.json()

    if (data.status === 'ok') {
      setSurveys(surveys)
    } else {
      return data.error
    }
  }

  const updateGivenFeedbacks = async (givenFeedback) => {
    const req = await fetch(
      'https://env-production.up.railway.app/api/giveFeedback',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          givenFeedback: givenFeedback,
        }),
      }
    )

    const data = await req.json()

    if (data.status === 'ok') {
      setGivenFeedbacks(givenFeedback)
    } else {
      return data.error
    }
  }

  const handleDeleteSurvey = (id) => {
    const newSurveys = surveys.filter((survey) => survey.id !== id)
    const newGivenFeedbacks = givenFeedbacks.filter(
      (givenFeedback) => givenFeedback.id !== id
    )

    setSurveys(newSurveys)
    setGivenFeedbacks(newGivenFeedbacks)

    updateSurveys(newSurveys)
    updateGivenFeedbacks(newGivenFeedbacks)
  }
  return (
    <>
      {!isLoading ? (
        <div className="bg-[#f1f1f1]">
          <section className="flex items-center">
            <div className="grow shrink-0 pt-12 px-6 pb-0">
              <div className="container grow w-auto relative my-0 mx-auto">
                <h1 className="text-3xl text-[#363636] font-medium ml-3 mb-6">
                  Dashboard
                </h1>
                <div className="tile flex-1 mb-3 ">
                  <div className="tile flex-1 p-3">
                    <div className="flex-1 bg-[#222] feedbackBlockShadow rounded-md p-5">
                      <p className="text-white text-center text-xl w-full mb-6">
                        All Time
                      </p>
                      <div className="flex items-center justify-between grow">
                        <div className="flex justify-center text-center grow mr-3">
                          <div>
                            <p className="text-base">😀</p>
                            <p className="text-4xl text-[#2acd6d] font-normal">
                              {!greatFeedbacks
                                ? '0'
                                : greatFeedbacks.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center text-center grow mr-3">
                          <div>
                            <p className="text-base">😐</p>
                            <p className="text-4xl text-[#fff44f] font-normal">
                              {!okFeedbacks
                                ? '0'
                                : okFeedbacks.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center text-center grow mr-3">
                          <div>
                            <p className="text-base">🙁</p>
                            <p className="text-4xl text-[#ec5757] font-normal">
                              {!badFeedbacks
                                ? '0'
                                : badFeedbacks.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tile flex-1 p-3">
                    <div className="flex-1 bg-[#222] feedbackBlockShadow rounded-md p-5">
                      <p className="text-white text-center text-xl w-full mb-6">
                        This Month
                      </p>
                      <div className="flex items-center justify-between grow">
                        <div className="flex justify-center grow text-center mr-3">
                          <div>
                            <p className="text-base">😀</p>
                            <p className="text-4xl text-[#2acd6d] font-normal">
                              {!greatFeedbacksThisMonth
                                ? '0'
                                : greatFeedbacksThisMonth.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center grow text-center mr-3">
                          <div>
                            <p className="text-base">😐</p>
                            <p className="text-4xl text-[#fff44f] font-normal">
                              {!okFeedbacksThisMonth
                                ? '0'
                                : okFeedbacksThisMonth.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center grow text-center mr-3">
                          <div>
                            <p className="text-base">🙁</p>
                            <p className="text-4xl text-[#ec5757] font-normal">
                              {!badFeedbacksThisMonth
                                ? '0'
                                : badFeedbacksThisMonth.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tile flex-1 p-3">
                    <div className="flex-1 bg-[#222] feedbackBlockShadow rounded-md p-5">
                      <p className="text-white text-center text-xl w-full mb-6">
                        Last Month
                      </p>
                      <div className="flex items-center justify-between grow">
                        <div className="flex justify-center grow text-center mr-3">
                          <div>
                            <p className="text-base">😀</p>
                            <p className="text-4xl text-[#2acd6d] font-normal">
                              {!greatFeedbacksLastMonth
                                ? '0'
                                : greatFeedbacksLastMonth.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center grow text-center mr-3">
                          <div>
                            <p className="text-base">😐</p>
                            <p className="text-4xl text-[#fff44f] font-normal">
                              {!okFeedbacksLastMonth
                                ? '0'
                                : okFeedbacksLastMonth.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center grow text-center mr-3">
                          <div>
                            <p className="text-base">🙁</p>
                            <p className="text-4xl text-[#ec5757] font-normal">
                              {!badFeedbacksLastMonth
                                ? '0'
                                : badFeedbacksLastMonth.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* most on */}
                <div className="tile flex flex-1 mb-3 ">
                  <div className="tile flex-1 p-3">
                    <div className="block flex-1 bg-white feedbackBlockShadow rounded-md text-center p-5">
                      <p className="text-xl text-[#4a4a4a] mb-2">
                        Most 😀 on
                      </p>
                      <p className="text-3xl text-[#4a4a4a] font-medium">
                        {!findMostOnDay(mostGreatOnDay)
                          ? 'n/a'
                          : findMostOnDay(mostGreatOnDay)}
                      </p>
                    </div>
                  </div>

                  <div className="tile flex-1 p-3">
                    <div className="flex-1 bg-white feedbackBlockShadow rounded-md text-center p-5">
                      <p className="text-xl text-[#4a4a4a] mb-2">
                        Most 😐 on
                      </p>
                      <p className="text-3xl text-[#4a4a4a] font-medium">
                        {!findMostOnDay(mostOkOnDay)
                          ? 'n/a'
                          : findMostOnDay(mostOkOnDay)}
                      </p>
                    </div>
                  </div>

                  <div className="tile flex-1 p-3">
                    <div className="flex-1 bg-white feedbackBlockShadow rounded-md text-center p-5">
                      <p className="text-xl text-[#4a4a4a] mb-2">
                        Most 🙁 on
                      </p>
                      <p className="text-3xl text-[#4a4a4a] font-medium">
                        {!findMostOnDay(mostBadOnDay)
                          ? 'n/a'
                          : findMostOnDay(mostBadOnDay)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="grow shrink-0 pb-12 px-6">
            <div className="container grow w-auto relative my-0 mx-auto">
              <div className="tile">
                <div className="tile flex-1 p-3">
                  <div className="tile h-[360px] !block bg-white feedbackBlockShadow rounded-md p-5 pb-20">
                    <h2 className="text-xl text-[#4a4a4a] mb-6">
                      Recent Newsletter Performance
                    </h2>
                    <DashboardChart
                      givenFeedbacks={givenFeedbacks}
                      surveys={surveys}
                      greatFeedbacks={greatFeedbacks}
                      okFeedbacks={okFeedbacks}
                      badFeedbacks={badFeedbacks}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="flex items-center">
            <div className="grow shrink-0 py-12 px-6">
              <div className="container grow w-auto relative my-0 mx-auto">
                <h2 className="text-xl text-[#363636] text-center font-normal mb-6">
                  Recent Extended Feedback
                </h2>
                <div className="columns flex-wrap">
                  {givenFeedbacks?.map((givenFeedback, index) => {
                    const currentSurvey = surveys.find(
                      (survey) => survey.id === givenFeedback.id
                    )

                    const great = !withEmojis.test(
                      currentSurvey?.extendedValues.thumbsupReasonHeader?.substring(
                        0,
                        2
                      )
                    )
                      ? currentSurvey.extendedValues.thumbsupReasonHeader.split(
                          ' '
                        )[0]
                      : String.fromCodePoint(
                          `0x${currentSurvey?.extendedValues.thumbsupReasonHeader
                            .codePointAt(0)
                            .toString(16)}`
                        )

                    const ok = !withEmojis.test(
                      currentSurvey?.extendedValues?.thumbsokReasonHeader.substring(
                        0,
                        2
                      )
                    )
                      ? currentSurvey.extendedValues.thumbsokReasonHeader.split(
                          ' '
                        )[0]
                      : String.fromCodePoint(
                          `0x${currentSurvey?.extendedValues.thumbsokReasonHeader
                            .codePointAt(0)
                            .toString(16)}`
                        )

                    const bad = !withEmojis.test(
                      currentSurvey?.extendedValues?.thumbsdownReasonHeader.substring(
                        0,
                        2
                      )
                    )
                      ? currentSurvey.extendedValues.thumbsdownReasonHeader.split(
                          ' '
                        )[0]
                      : String.fromCodePoint(
                          `0x${currentSurvey?.extendedValues.thumbsdownReasonHeader
                            .codePointAt(0)
                            .toString(16)}`
                        )

                    return (
                      <div
                        className="column is-6-desktop is-4-desktop p-3"
                        key={index}
                      >
                        <div className="text[#4a4a4a] bg-white rounded-md feedbackBlockShadow p-5">
                          <div className="flex items-baseline">
                            <div className="mr-2">
                              <p className="p-0 m-0">
                                {givenFeedback.num === '1' && (
                                  <span>{!great ? '😀' : great}</span>
                                )}
                                {givenFeedback.num === '2' && (
                                  <span>{!ok ? '😐' : ok}</span>
                                )}
                                {givenFeedback.num === '3' && (
                                  <span>{!bad ? '🙁' : bad}</span>
                                )}
                              </p>
                            </div>
                            <div className="grow">
                              <p className="text-[#4a4a4a] p-0 m-0">
                                {givenFeedback.feedbackReason}
                              </p>
                              {givenFeedback.efpReaderNamePlaceholder ||
                              givenFeedback.efpReaderEmailPlaceholder ? (
                                <p className="text-right text-base text-[#4a4a4a]">{`By ${
                                  !givenFeedback.efpReaderNamePlaceholder
                                    ? ''
                                    : givenFeedback.efpReaderNamePlaceholder
                                } ${
                                  !givenFeedback.efpReaderEmailPlaceholder
                                    ? ''
                                    : `, ${givenFeedback.efpReaderEmailPlaceholder}`
                                }`}</p>
                              ) : (
                                ''
                              )}
                              <p className="text-right text-xs mt-2">
                                <Link
                                  to={`/feedback/${givenFeedback.id}`}
                                  className="text-[#4185f3] cursor-pointer no-underline hover:text-[#2c4f88]"
                                >
                                  {currentSurvey.names.formName}
                                </Link>
                              </p>
                            </div>
                            <div className="ml-4">
                              <p className="p-0 m-0">
                                <button
                                  onClick={() =>
                                    handleDeleteSurvey(
                                      givenFeedback.id
                                    )
                                  }
                                >
                                  <DeleteSvg />
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-[#f1f1f14d] absolute z-50 inset-0">
          <div className="w-16 h-16 absolute top-1/2 left-1/2 border-[10px] border-[#f3f3f3] border-t-[10px] border-t-[#383636] rounded-full animate-spin"></div>
        </div>
      )}
    </>
  )
}
