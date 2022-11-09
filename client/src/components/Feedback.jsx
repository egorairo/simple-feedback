import React, {useCallback, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {decodeToken} from 'react-jwt'

import Chart from './Chart'
import {setNames} from '../store/namesReducer'
import {setVotingValues} from '../store/votingReducer'
import {setExtendedValues} from '../store/extendedReducer'
import {setThanksValues} from '../store/thanksReducer'
import DeleteSvg from '../../public/img/delete.svg?component'

const withEmojis = /\p{Extended_Pictographic}/u

function useQuery() {
  const {search} = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const dateFeedbacks = (array, feedbackDate) => {
  return array.filter(({date}) => {
    const newDate = new Date(date)
      .toISOString()
      .replace(/T.*/, '')
      .split('-')
      .join('-')

    if (newDate === feedbackDate) {
      return date
    }
  }).length
}

export default function Feedback() {
  const {id} = useParams()
  const query = useQuery()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [surveys, setSurveys] = useState([])
  const [givenFeedbacks, setGivenFeedbacks] = useState([])
  const [givenFeedback, setGivenFeedback] = useState([])

  const [saved, setSaved] = useState(false)

  const [analytics, setAnalytics] = useState(
    query.get('created') === 'true' ? false : true
  )
  const [edit, setEdit] = useState(false)
  const [code, setCode] = useState(
    query.get('created') === 'true' ? true : false
  )

  const [voting, setVoting] = useState(true)
  const [extendedPage, setExtendedPage] = useState(false)
  const [thankYouPage, setThankYouPage] = useState(false)

  const [inlineCopied, setInlineCopied] = useState(false)
  const [inlineHtmlCopied, setInlineHtmlCopied] = useState(false)
  const [bulletsCopied, setBulletsCopied] = useState(false)
  const [bulletsHtmlCopied, setBulletsHtmlCopied] = useState(false)

  const [editNameValues, setEditNameValues] = useState({})
  const [editVotingValues, setEditVotingValues] = useState({})
  const [editExtendedValues, setEditExtendedValues] = useState({})
  const [editThanksValues, setEditThanksValues] = useState({})

  const nameValues = useSelector((state) => state.names)
  const votingValues = useSelector((state) => state.votingValues)
  const extendedValues = useSelector((state) => state.extendedValues)
  const thanksValues = useSelector((state) => state.thanksValues)

  const greatFeedbacks = givenFeedback.filter((givenFeedback) => {
    if (givenFeedback.id === id) {
      return givenFeedback.num === '1'
    }
  })
  const okFeedbacks = givenFeedback.filter((givenFeedback) => {
    if (givenFeedback.id === id) {
      return givenFeedback.num === '2'
    }
  })
  const badFeedbacks = givenFeedback.filter((givenFeedback) => {
    if (givenFeedback.id === id) {
      return givenFeedback.num === '3'
    }
  })

  const dateGivenFeedback = givenFeedback.map(({date}) => {
    const newDate = new Date(date)
      .toISOString()
      .replace(/T.*/, '')
      .split('-')
      .join('-')

    return newDate
  })

  const uniqDates = dateGivenFeedback.filter(
    (dateGivenFeedback, pos) => {
      return dateGivenFeedback.indexOf(dateGivenFeedback) == pos
    }
  )

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
      const surveys = data.surveys

      setSurveys(surveys)

      const [survey] = surveys.filter((survey) => survey.id === id)

      setEditNameValues(survey.names || nameValues)
      setEditVotingValues(survey.votingValues || votingValues)
      setEditExtendedValues(survey.extendedValues || extendedValues)
      setEditThanksValues(survey.thanksValues || thanksValues)
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
      const givenFeedback = data.givenFeedback.filter(
        (givenFeedback) => givenFeedback.id === id
      )

      setGivenFeedbacks(data.givenFeedback)
      setGivenFeedback(givenFeedback)
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)

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

  const handleSaveSurvey = () => {
    const newSurveys = surveys.map((survey) => {
      if (survey.id === id) {
        survey.names = editNameValues
        survey.votingValues = editVotingValues
        survey.extendedValues = editExtendedValues
        survey.thanksValues = editThanksValues
      }
    })

    setSurveys(newSurveys)

    updateSurveys(surveys)

    dispatch(setNames(editNameValues))
    dispatch(setVotingValues(editVotingValues))
    dispatch(setExtendedValues(editExtendedValues))
    dispatch(setThanksValues(editThanksValues))

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
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

    navigate('/feedbacks')
  }

  // copying logic
  const handleCopyBulletsTheme = useCallback(async () => {
    const copyText = document.querySelector('#bullets-survey')

    const text = copyText,
      range = document.createRange()
    range.selectNodeContents(text),
      window.getSelection().removeAllRanges(),
      window.getSelection().addRange(range),
      document.execCommand('copy'),
      window.getSelection().removeAllRanges()

    setBulletsCopied(true)
  }, [])

  const handleCopyHtmlBulletsTheme = useCallback(() => {
    const copyHtml =
      document.querySelector('#bullets-survey').innerHTML

    navigator.clipboard.writeText(copyHtml).then(() => {
      setBulletsHtmlCopied(true)
    })
  }, [])

  const handleCopyInlineTheme = useCallback(() => {
    const copyText = document.querySelector('#inline-survey')

    const text = copyText,
      range = document.createRange()
    range.selectNodeContents(text),
      window.getSelection().removeAllRanges(),
      window.getSelection().addRange(range),
      document.execCommand('copy'),
      window.getSelection().removeAllRanges()

    setInlineCopied(true)
  }, [])

  const handleCopyHtmlInlineTheme = useCallback(() => {
    const copyHtml =
      document.querySelector('#inline-survey').innerHTML

    navigator.clipboard.writeText(copyHtml).then(() => {
      setInlineHtmlCopied(true)
    })
  }, [])
  //

  const handleClickThumbsUp = useCallback(() => {
    navigate(`/feedback/give/1/${id}`)
  }, [])

  const handleClickThumbsOk = useCallback(() => {
    navigate(`/feedback/give/2/${id}`)
  }, [])

  const handleClickThumbsDown = useCallback(() => {
    navigate(`/feedback/give/3/${id}`)
  }, [])

  return (
    <>
      <div className="bg-[#f1f1f1]">
        <section className="block py-36 px-6">
          <div className="container grow w-auto relative my-0 mx-auto">
            <h1 className="title mb-6">{`Newsletter Feedback: ${
              editNameValues.formName
                ? editNameValues.formName
                : 'No name'
            }`}</h1>
            <hr className="h-0.5 bg-white my-6 mx-0"></hr>
            <div className="flex items-stretch justify-between overflow-hidden whitespace-nowrap mb-0">
              <ul className="flex items-center justify-start border-b border-[#dbdbdb] grow shrink-0 list-none ">
                <li className="block p-o m-0">
                  <a
                    className={`${
                      analytics
                        ? 'feedbackLinksActive'
                        : 'feedbackLinksHover'
                    } feedbackLinks`}
                    onClick={() => {
                      setAnalytics(true)
                      setEdit(false)
                      setCode(false)
                    }}
                  >
                    Analytics
                  </a>
                </li>
                <li className="block p-o m-0">
                  <a
                    className={`${
                      edit
                        ? 'feedbackLinksActive'
                        : 'feedbackLinksHover'
                    } feedbackLinks`}
                    onClick={() => {
                      setAnalytics(false)
                      setEdit(true)
                      setCode(false)
                    }}
                  >
                    Edit
                  </a>
                </li>
                <li className="block p-o m-0">
                  <a
                    className={`${
                      code
                        ? 'feedbackLinksActive'
                        : 'feedbackLinksHover'
                    } feedbackLinks`}
                    onClick={() => {
                      setAnalytics(false)
                      setEdit(false)
                      setCode(true)
                    }}
                  >
                    Code
                  </a>
                </li>
              </ul>
            </div>

            <div className="border border-[#dbdbdb] border-t-transparent bg-white rounded-b-md p-5">
              {analytics && (
                <div>
                  <div className="columns justify-center -m-3">
                    <div className="column is-half p-3">
                      <div className="bg-[#222] text-white rounded-md block p-5 mb-6">
                        <div className="mb-6 m-auto">
                          <h2>{`Total: ${givenFeedback.length}`}</h2>
                          <div className="w-40 h-40 mx-auto">
                            <Chart
                              great={greatFeedbacks.length}
                              ok={okFeedbacks.length}
                              bad={badFeedbacks.length}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between grow">
                          <div className="flex justify-center text-center grow mr-3">
                            <div>
                              <p className="text-xl">😀</p>
                              <p className="text-[40px] text-[#2acd6d] font-normal">
                                {!greatFeedbacks
                                  ? '0'
                                  : greatFeedbacks.length}
                              </p>
                              <p className="text-[#2acd6d] m-0 p-0">{`${
                                greatFeedbacks.length
                                  ? Math.round(
                                      (greatFeedbacks.length * 100) /
                                        givenFeedback.length
                                    )
                                  : '0'
                              }%`}</p>
                            </div>
                          </div>
                          <div className="flex justify-center text-center grow mr-3">
                            <div>
                              <p className="text-xl">😐</p>
                              <p className="text-[40px] text-[#fff44f] font-normal">
                                {!okFeedbacks
                                  ? '0'
                                  : okFeedbacks.length}
                              </p>
                              <p className="text-[#fff44f] m-0 p-0">{`${
                                okFeedbacks.length
                                  ? Math.round(
                                      (okFeedbacks.length * 100) /
                                        givenFeedback.length
                                    )
                                  : '0'
                              }%`}</p>
                            </div>
                          </div>
                          <div className="flex justify-center text-center grow mr-3">
                            <div>
                              <p className="text-xl">🙁</p>
                              <p className="text-[40px] text-[#ec5757] font-normal">
                                {!badFeedbacks
                                  ? '0'
                                  : badFeedbacks.length}
                              </p>
                              <p className="text-[#ec5757] m-0 p-0">{`${
                                badFeedbacks.length
                                  ? Math.round(
                                      (badFeedbacks.length * 100) /
                                        givenFeedback.length
                                    )
                                  : '0'
                              }%`}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <table className="w-full text-[#363636] text-left bg-white border-collapse mt-12">
                        <thead>
                          <tr>
                            <th className="items-left text-[#363636] text-left border-b border-[#dbdbdb] py-2 px-3 align-top">
                              Day
                            </th>
                            <th className="items-left text-[#363636] text-left border-b border-[#dbdbdb] py-2 px-3 align-top">
                              😀
                            </th>
                            <th className="items-left text-[#363636] text-left border-b border-[#dbdbdb] py-2 px-3 align-top">
                              😐
                            </th>
                            <th className="items-left text-[#363636] text-left border-b border-[#dbdbdb] py-2 px-3 align-top">
                              🙁
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {uniqDates.map((uniqDate, index) => {
                            return (
                              <tr key={index}>
                                <td>{uniqDate}</td>
                                <td>
                                  {dateFeedbacks(
                                    greatFeedbacks,
                                    uniqDate
                                  )}
                                </td>
                                <td>
                                  {dateFeedbacks(
                                    okFeedbacks,
                                    uniqDate
                                  )}
                                </td>
                                <td>
                                  {dateFeedbacks(
                                    badFeedbacks,
                                    uniqDate
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="column is-half p-3">
                      <h2 className="text-[#4a4a4a] mb-4 m-0 p-0">
                        Reasons
                      </h2>
                      {givenFeedback.length === 0 ? (
                        <p>
                          No extended feedback reported by your
                          readers.
                        </p>
                      ) : (
                        givenFeedback.map((givenFeedback, index) => {
                          const currentSurvey = surveys.find(
                            (survey) => survey.id === givenFeedback.id
                          )

                          const great = !withEmojis.test(
                            currentSurvey.extendedValues?.thumbsupReasonHeader.substring(
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
                            currentSurvey.extendedValues?.thumbsokReasonHeader.substring(
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
                            currentSurvey.extendedValues?.thumbsdownReasonHeader.substring(
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
                            <div className="w-full p-3" key={index}>
                              <div className="text[#4a4a4a] bg-white rounded-md feedbackBlockShadow p-5">
                                <div className="flex items-baseline">
                                  <div className="mr-2">
                                    <p className="p-0 m-0">
                                      {givenFeedback.num === '1' && (
                                        <span>{great}</span>
                                      )}
                                      {givenFeedback.num === '2' && (
                                        <span>{ok}</span>
                                      )}
                                      {givenFeedback.num === '3' && (
                                        <span>{bad}</span>
                                      )}
                                    </p>
                                  </div>
                                  <div className="grow shrink basis-auto">
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
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}
              {edit && (
                <div>
                  <div className="columns flex-wrap -m-3">
                    <div className="column">
                      <div className="mb-3">
                        <label
                          htmlFor="name"
                          className="block text-base text-[#363636] font-semibold mb-2"
                        >
                          Form Name (Required - Internal use)
                        </label>
                        <div className="text-base box-border relative">
                          <input
                            id="name"
                            name="formName"
                            type="text"
                            placeholder="Give your form a name to find it again"
                            required
                            value={editNameValues.formName}
                            className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                            onChange={(e) =>
                              setEditNameValues((prevValue) => ({
                                ...prevValue,
                                formName: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="name"
                          className="block text-base text-[#363636] font-semibold mb-2"
                        >
                          Your Name (Public)
                        </label>
                        <div className="text-base box-border relative">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name that can be used in a placeholder on the extended feedback page"
                            required
                            value={editNameValues.name || ''}
                            className="max-w-full w-full bg-white border border-[#dbdbdb] rounded-md input-shadow text[#363636]"
                            onChange={(e) =>
                              setEditNameValues((prevValue) => ({
                                ...prevValue,
                                name: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        {/* </div> */}
                      </div>
                      <div className="my-5">
                        <h2 className="text-center text-[#4a4a4a] text-lg font-normal mb-6">
                          Customize
                        </h2>
                        <div className="flex justify-between overflow-hidden overflow-x-auto text-base mb-6">
                          <ul className="flex justify-center items-center grow shrink-0 border-b border-[#dbdbdb]">
                            <li>
                              <a
                                className={`${
                                  voting
                                    ? 'active'
                                    : 'customizeLinkHover'
                                } customizeLink`}
                                onClick={() => {
                                  setVoting(true)
                                  setExtendedPage(false)
                                  setThankYouPage(false)
                                }}
                              >
                                1. Voting
                              </a>
                            </li>
                            <li>
                              <a
                                className={`${
                                  extendedPage
                                    ? 'active'
                                    : 'customizeLinkHover'
                                } customizeLink`}
                                onClick={() => {
                                  setVoting(false)
                                  setExtendedPage(true)
                                  setThankYouPage(false)
                                }}
                              >
                                2. Extended Feedback Page
                              </a>
                            </li>
                            <li>
                              <a
                                className={`${
                                  thankYouPage
                                    ? 'active'
                                    : 'customizeLinkHover'
                                } customizeLink`}
                                onClick={() => {
                                  setVoting(false)
                                  setExtendedPage(false)
                                  setThankYouPage(true)
                                }}
                              >
                                3. Thank You Page
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          {voting && (
                            <div>
                              <div className="columns flex-wrap -my-3 -mx-8">
                                <div className="block basis-0 grow shrink py-3 px-8">
                                  <p className="mb-4">
                                    The voting section is the part you
                                    copy and paste into your email.
                                  </p>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsHeadline"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Introduction Headline
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsHeadline"
                                        name="thumbsHeadline"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editVotingValues.thumbsHeadline ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditVotingValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsHeadline:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsParagraph"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Introduction Text
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsParagraph"
                                        name="thumbsParagraph"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editVotingValues.thumbsParagraph ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditVotingValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsParagraph:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsup"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Text for Thumbs Up
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsup"
                                        name="thumbsup"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editVotingValues.thumbsup ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditVotingValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsup:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                    <p className="block text-xs mt-1">
                                      First emoji is used as the label
                                      in the Admin UI
                                    </p>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsok"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Text for Thumbs Ok
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsok"
                                        name="thumbsok"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editVotingValues.thumbsok ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditVotingValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsok:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                    <p className="block text-xs mt-1">
                                      First emoji is used as the label
                                      in the Admin UI
                                    </p>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsdown"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Text for Thumbs Down
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsdown"
                                        name="thumbsdown"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editVotingValues.thumbsdown ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditVotingValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsdown:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                    <p className="block text-xs mt-1">
                                      First emoji is used as the label
                                      in the Admin UI
                                    </p>
                                  </div>
                                </div>

                                <div className="block basis-0 grow shrink py-3 px-8">
                                  <h2 className="text-[#4a4a4a] text-lg font-normal mb-6">
                                    Preview
                                  </h2>
                                  <h3 className="font-normal text-[#4a4a4a]">
                                    Theme Bullets
                                  </h3>
                                  <div className="bg-white rounded-md block text-lg p-5 mb-6">
                                    <p className="text-xl font-normal mb-4">
                                      <strong className="text-[#363636]">
                                        {editVotingValues.thumbsHeadline ||
                                          ''}
                                      </strong>
                                    </p>
                                    <p className="text-xl mb-4">
                                      {editVotingValues.thumbsParagraph ||
                                        ''}
                                    </p>
                                    <ul className="list-disc mt-8 ml-4">
                                      <li>
                                        <a
                                          className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                                          onClick={
                                            handleClickThumbsUp
                                          }
                                        >
                                          {editVotingValues.thumbsup ||
                                            ''}
                                        </a>
                                      </li>
                                      <li className="mt-1">
                                        <a
                                          className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                                          onClick={
                                            handleClickThumbsOk
                                          }
                                        >
                                          {editVotingValues.thumbsok ||
                                            ''}
                                        </a>
                                      </li>
                                      <li className="mt-1">
                                        <a
                                          className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                                          onClick={
                                            handleClickThumbsDown
                                          }
                                        >
                                          {editVotingValues.thumbsdown ||
                                            ''}
                                        </a>
                                      </li>
                                    </ul>
                                  </div>

                                  <h3 className="font-normal text-[#4a4a4a]">
                                    Theme Inline
                                  </h3>
                                  <div className="bg-white rounded-md block text-lg p-5 mb-6">
                                    <p className="text-xl font-normal mb-4">
                                      <strong className="text-[#363636]">
                                        {editVotingValues.thumbsHeadline ||
                                          ''}
                                      </strong>
                                    </p>
                                    <p className="text-xls mb-4">
                                      {editVotingValues.thumbsParagraph ||
                                        ''}
                                    </p>
                                    <p className="">
                                      <a
                                        className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                                        onClick={handleClickThumbsUp}
                                      >
                                        {editVotingValues.thumbsup ||
                                          ''}
                                      </a>{' '}
                                      -{' '}
                                      <a
                                        className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                                        onClick={handleClickThumbsOk}
                                      >
                                        {editVotingValues.thumbsok ||
                                          ''}
                                      </a>{' '}
                                      -{' '}
                                      <a
                                        className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                                        onClick={
                                          handleClickThumbsDown
                                        }
                                      >
                                        {editVotingValues.thumbsdown ||
                                          ''}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {extendedPage && (
                            <div>
                              <div className="columns flex-wrap -my-3 -mx-8">
                                <div className="block basis-0 grow shrink py-3 px-8">
                                  <p className="text-[#4a4a4a] mb-4">
                                    The Extended Feedback Page is
                                    shown when the reader clicks on a
                                    link in the voting section. The
                                    vote is already registered, and
                                    you can collect additional input
                                    from the user.
                                  </p>
                                  <p className="text-[#4a4a4a] mb-4">
                                    Your NAME is placeholder and
                                    replaced with your name plus
                                    appending &#39;s.
                                  </p>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thankYouLine"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Thank You Text
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thankYouLine"
                                        name="thankYouLine"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.thankYouLine ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thankYouLine:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsupReasonHeader"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Headline For Thumbs Up
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsupReasonHeader"
                                        name="thumbsupReasonHeader"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.thumbsupReasonHeader ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsupReasonHeader:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsokReasonHeader"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Headline For Thumbs Ok
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsokReasonHeader"
                                        name="thumbsokReasonHeader"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.thumbsokReasonHeader ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsokReasonHeader:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="thumbsdownReasonHeader"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Headline For Thumbs Down
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="thumbsdownReasonHeader"
                                        name="thumbsdownReasonHeader"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.thumbsdownReasonHeader ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              thumbsdownReasonHeader:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="efpWhyBoxText"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Reason Box Label
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="efpWhyBoxText"
                                        name="efpWhyBoxText"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.efpWhyBoxText ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              efpWhyBoxText:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="efpWhyBoxPlaceholder"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Reason Box Placeholder
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="efpWhyBoxPlaceholder"
                                        name="efpWhyBoxPlaceholder"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.efpWhyBoxPlaceholder ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              efpWhyBoxPlaceholder:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="efpReaderNamePlaceholder"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Gather Reader&#39;s Name
                                      Placeholder
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="efpReaderNamePlaceholder"
                                        name="efpReaderNamePlaceholder"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.efpReaderNamePlaceholder ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              efpReaderNamePlaceholder:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="efpReaderEmailPlaceholder"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Gather Reader&#39;s Email
                                      Address Placeholder
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="efpReaderEmailPlaceholder"
                                        name="efpReaderEmailPlaceholder"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.efpReaderEmailPlaceholder ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              efpReaderEmailPlaceholder:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                    <p className="block text-xs mt-1">
                                      Leave the field empty to hide
                                      the input box on the extended
                                      feedback page.
                                    </p>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="efpButtonText"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Button Text
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="efpButtonText"
                                        name="efpButtonText"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editExtendedValues.efpButtonText |
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditExtendedValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              efpButtonText:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                                <div className="block basis-0 grow shrink py-3 px-8">
                                  <h2 className="text-[#4a4a4a] text-lg font-normal mb-6">
                                    Preview
                                  </h2>
                                  <div className="bg-[#f1f1f1]">
                                    <section className="h-[900px] flex items-stretch flex-col justify-between">
                                      <div className="flex items-center grow shrink-0 py-12 px-6">
                                        <div className="container grow w-auto relative my-0 mx-auto">
                                          <div className="justify-center -m-3">
                                            <div className="block basis-0 grow shrink p-3">
                                              <p className="text-base font-normal text-center text-[#363636] mb-3">
                                                {editExtendedValues.thankYouLine ||
                                                  ''}
                                              </p>
                                              <h2 className="text-3xl font-semibold text-center text-[#363636] mb-6">
                                                {editExtendedValues.thumbsupReasonHeader
                                                  ? `😀 you did enjoy ${
                                                      !editNameValues.name
                                                        ? 'this'
                                                        : `${editNameValues.name}'s`
                                                    } email 😀`
                                                  : editExtendedValues.thumbsupReasonHeader}
                                              </h2>
                                              <form className="block">
                                                <div className="field !mb-8">
                                                  <label className="block text-lg text-[#363636] font-semibold mb-2">
                                                    {editExtendedValues.efpWhyBoxText ||
                                                      ''}
                                                  </label>
                                                  <div className="relative text-base">
                                                    <textarea
                                                      className="h-40 max-h-[40rem] min-h-[8rem] text-lg  input-shadow rounded-md border border-[#dbdbdb]"
                                                      placeholder={
                                                        editExtendedValues.efpWhyBoxPlaceholder ||
                                                        ''
                                                      }
                                                    ></textarea>
                                                  </div>
                                                </div>

                                                <div className="field">
                                                  <div className="relative text-base">
                                                    {editExtendedValues.efpReaderNamePlaceholder ===
                                                    '' ? (
                                                      ''
                                                    ) : (
                                                      <input
                                                        id="efpReaderNamePlaceholder"
                                                        name="name"
                                                        type="text"
                                                        className="block input-shadow bg-white border border-[#dbdbdb] rounded-md color-[#363636]"
                                                        placeholder={
                                                          editExtendedValues.efpReaderNamePlaceholder ||
                                                          ''
                                                        }
                                                      ></input>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="field">
                                                  <div className="relative text-base">
                                                    {!editExtendedValues.efpReaderEmailPlaceholder ? (
                                                      ''
                                                    ) : (
                                                      <input
                                                        id="efpReaderEmailPlaceholder"
                                                        name="name"
                                                        type="text"
                                                        className="block input-shadow bg-white border border-[#dbdbdb] rounded-md color-[#363636]"
                                                        placeholder={
                                                          editExtendedValues.efpReaderEmailPlaceholder ||
                                                          ''
                                                        }
                                                      ></input>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="relative text-base">
                                                  <button className="button w-full text-xl mainBgColor border border-transparent rounded-md !text-white hover:bg-[#307af1]">
                                                    {editExtendedValues.efpButtonText ||
                                                      ''}
                                                  </button>
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {thankYouPage && (
                            <div>
                              <div className="columns flex-wrap -my-3 -mx-8">
                                <div className="block basis-0 grow shrink py-3 px-8">
                                  <p className="mb-4">
                                    The Thank You Page is shown to the
                                    reader after they gave feedback on
                                    the Extended Feedback Page. user.
                                  </p>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="typHeadline"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Headline
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="typHeadline"
                                        name="typHeadline"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editThanksValues.typHeadline
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditThanksValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              typHeadline:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="typSubHeadline"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Subheadline
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="typSubHeadline"
                                        name="typSubHeadline"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editThanksValues.typSubHeadline
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditThanksValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              typSubHeadline:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="typShareTwitterHandle"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Your Twitter Username Without @
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="typShareTwitterHandle"
                                        name="typShareTwitterHandle"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editThanksValues.typShareTwitterHandle ||
                                          ''
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditThanksValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              typShareTwitterHandle:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                    <p className="block text-xs mt-1">
                                      Enter your twitter handle to
                                      activate the share button.
                                    </p>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="typShareButtonTwitter"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Text of the Twitter Share Button
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="typShareButtonTwitter"
                                        name="typShareButtonTwitter"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editThanksValues.typShareButtonTwitter
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditThanksValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              typShareButtonTwitter:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="typRedirect"
                                      className="block text-base text-[#363636] font-semibold mb-2"
                                    >
                                      Redirect
                                    </label>
                                    <div className="text-base box-border relative">
                                      <input
                                        id="typRedirect"
                                        name="typRedirect"
                                        type="text"
                                        placeholder=""
                                        required
                                        value={
                                          editThanksValues.typRedirect
                                        }
                                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                        onChange={(e) =>
                                          setEditThanksValues(
                                            (prevValue) => ({
                                              ...prevValue,
                                              typRedirect:
                                                e.target.value,
                                            })
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                                <div className="block basis-0 grow shrink py-3 px-8">
                                  <h2 className="text-xl text-[#4a4a4a] font-normal mb-6">
                                    Preview
                                  </h2>
                                  <section className="h-[600px] flex items-stretch flex-col justify-between">
                                    <div className="flex items-center grow shrink-0 py-12 px-6">
                                      <div className="container grow w-auto relative my-0 mx-auto">
                                        <h1 className="text-3xl font-semibold text-center text-[#363636] mb-6">
                                          {editThanksValues.typHeadline ||
                                            ''}
                                        </h1>
                                        <h2 className="text-xl font-normal text-center grow shrink-0 -mt-5 mb-6">
                                          {editThanksValues.typSubHeadline ||
                                            ''}
                                        </h2>
                                        {editThanksValues.typShareTwitterHandle ? (
                                          <p className="block text-center m-0 p-0">
                                            <a
                                              href={
                                                editThanksValues.typShareTwitterHandle
                                              }
                                              className="button !bg-[#3298dc] rounded-md !border-transparent !text-white"
                                            >
                                              {editThanksValues.typShareButtonTwitter ||
                                                ''}
                                            </a>
                                          </p>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="relative shrink-0 mr-3">
                          <button
                            type="button"
                            className={`${
                              !editNameValues.formName
                                ? 'opacity-50 !cursor-default'
                                : 'hover:bg-[#4bbf73] hover:!text-white'
                            } button rounded-md !border !border-[#4bbf73] !text-[#4bbf73]`}
                            disabled={
                              !editNameValues.formName ? true : false
                            }
                            onClick={handleSaveSurvey}
                          >
                            Save
                          </button>
                        </div>
                        <div className="relative shrink-0">
                          <button
                            type="button"
                            className={`button rounded-md !border-[#d9534f] !text-[#d9534f] hover:bg-[#d9534f] hover:!text-white`}
                            onClick={() => handleDeleteSurvey(id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {code && (
                <div>
                  <h2 className="text-xl text-[#4a4a4a] font-normal mb-6">
                    Copy a block and paste it into you email.
                  </h2>

                  <div className="columns flex-wrap -m-3">
                    <div className="column is-half">
                      <h2 className="text-lg text-[#4a4a4a] font-normal m-0 p-0">
                        Theme Bullets
                      </h2>
                      <p className="text-right m-0 p-0">
                        <Link
                          to="#"
                          className={`${
                            !bulletsCopied
                              ? '!border !border-[#dbdbdb]'
                              : 'mainColor !border !border-[#dbdbdb]'
                          } button !bg-white !text-xs rounded hover:!border hover:!border-[#b5b5b5]`}
                          onClick={(e) => handleCopyBulletsTheme(e)}
                        >
                          {!bulletsCopied ? 'Copy' : 'Copied'}
                        </Link>
                        <Link
                          to="#"
                          className={`${
                            !bulletsHtmlCopied
                              ? '!border !border-[#dbdbdb]'
                              : 'mainColor !border !border-[#dbdbdb]'
                          } button !bg-white !text-xs rounded hover:!border hover:!border-[#b5b5b5]`}
                          onClick={handleCopyHtmlBulletsTheme}
                        >
                          {!bulletsHtmlCopied
                            ? 'Copy as HTML'
                            : 'Copied as HTML'}
                        </Link>
                      </p>
                      <div
                        id="bullets-survey"
                        className="block bg-white rounded-md box-shadow text-[#4a4a4a] text-xl p-5"
                      >
                        <p className="mb-4">
                          <strong className="text-[#363636] font-bold">
                            {!editVotingValues.thumbsHeadline
                              ? ''
                              : editVotingValues.thumbsHeadline}
                          </strong>
                        </p>
                        <p className="mb-4">
                          {!editVotingValues.thumbsParagraph
                            ? ''
                            : editVotingValues.thumbsParagraph}
                        </p>
                        <ul className="list-disc my-4 ml-8">
                          <li className="m-0 p-0">
                            <a
                              id="bullet-thumbsup"
                              target="_blank"
                              rel="noreferrer"
                              href={`/feedback/give/1/${id}`}
                              className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                            >
                              {!editVotingValues.thumbsup
                                ? ''
                                : editVotingValues.thumbsup}
                            </a>
                          </li>
                          <li className="mt-1">
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`/feedback/give/2/${id}`}
                              className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                            >
                              {!editVotingValues.thumbsok
                                ? ''
                                : editVotingValues.thumbsok}
                            </a>
                          </li>
                          <li className="mt-1">
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`/feedback/give/3/${id}`}
                              className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                            >
                              {!editVotingValues.thumbsdown
                                ? ''
                                : editVotingValues.thumbsdown}
                            </a>
                          </li>
                        </ul>
                        <p>
                          Build your own? 👉
                          <a
                            href="#"
                            className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                          >
                            Feed↔Back.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="column is-half">
                      <h2 className="text-xl text-[#4a4a4a] font-normal m-0 p-0">
                        Theme Inline
                      </h2>
                      <p className="text-right m-0 p-0">
                        <Link
                          to="#"
                          className={`${
                            !inlineCopied
                              ? '!border !border-[#dbdbdb]'
                              : 'mainColor !border !border-[#dbdbdb]'
                          } button !bg-white !text-xs rounded hover:!border hover:!border-[#b5b5b5]`}
                          onClick={handleCopyInlineTheme}
                        >
                          {!inlineCopied ? 'Copy' : 'Copied'}
                        </Link>
                        <Link
                          to="#"
                          className={`${
                            !inlineHtmlCopied
                              ? '!border !border-[#dbdbdb]'
                              : 'mainColor !border !border-[#dbdbdb]'
                          } button !bg-white !text-xs rounded hover:!border hover:!border-[#b5b5b5]`}
                          onClick={handleCopyHtmlInlineTheme}
                        >
                          {!inlineHtmlCopied
                            ? 'Copy as HTML'
                            : 'Copied as HTML'}
                        </Link>
                      </p>
                      <div
                        id="inline-survey"
                        className="block bg-white rounded-md box-shadow text-[#4a4a4a] text-xl p-5"
                      >
                        <p className="text-xl font-normal mb-4">
                          <strong className="text-[#363636]">
                            {!editVotingValues.thumbsHeadline
                              ? ''
                              : editVotingValues.thumbsHeadline}
                          </strong>
                        </p>

                        <p className="text-xls mb-4">
                          {!editVotingValues.thumbsParagraph
                            ? ''
                            : editVotingValues.thumbsParagraph}
                        </p>
                        <p className="mb-4">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`/feedback/give/1/${id}`}
                            className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                          >
                            {!editVotingValues.thumbsup
                              ? ''
                              : editVotingValues.thumbsup}
                          </a>{' '}
                          -{' '}
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`/feedback/give/2/${id}`}
                            className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                          >
                            {!editVotingValues.thumbsok
                              ? ''
                              : editVotingValues.thumbsok}
                          </a>{' '}
                          -{' '}
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`/feedback/give/3/${id}`}
                            className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                          >
                            {!editVotingValues.thumbsdown
                              ? ''
                              : editVotingValues.thumbsdown}
                          </a>
                        </p>
                        <p>
                          Build your own? 👉
                          <a
                            href="#"
                            className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
                          >
                            Feed↔Back.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {saved ? (
        <div className="notices flex-col">
          <div
            role="alert"
            className="toast self-center text-white bg-[#4bbf73]"
          >
            <div>{`Survey ${editNameValues.formName} was successfully saved.`}</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
