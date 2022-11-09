import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

const replaceWord = /NAME/

export default function GiveFeedback() {
  const {num, id} = useParams()

  const [submited, setSubmited] = useState(false)

  const [givenFeedbacks, setGivenFeedbacks] = useState([])
  const [givenFeedback, setGivenFeedback] = useState({})
  const [extendedValues, setExtendedValues] = useState({})
  const [nameValues, setNameValues] = useState({})
  const [thanksValues, setThanksValues] = useState({})

  const getSurvey = async () => {
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

      const [survey] = surveys.filter((survey) => survey.id === id)

      setNameValues(survey.names || '')
      setExtendedValues(survey.extendedValues || '')
      setThanksValues(survey.thanksValues || '')
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
    getSurvey()
    getGivenFeedbacks()
  }, [])

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
      setGivenFeedback(givenFeedback)
    } else {
      return data.error
    }
  }

  const handleSubmitGiveFeedback = (event) => {
    event.preventDefault()

    const date = new Date()

    const newGivenFeedback = Object.assign(
      {},
      {
        id: id,
      },
      {num: num},
      {date: date},
      givenFeedback
    )

    let newGivenFeedbacks = []

    if (givenFeedbacks) {
      newGivenFeedbacks = [...givenFeedbacks, ...[newGivenFeedback]]
    } else {
      newGivenFeedbacks = [newGivenFeedback]
    }

    setGivenFeedbacks(newGivenFeedbacks)

    updateGivenFeedbacks(newGivenFeedbacks)

    setSubmited(true)
  }

  return (
    <div className="bg-[#f1f1f1]">
      <section className="flex flex-col items-center justify-between min-h-screen">
        <div className="flex w-full items-center grow shrink-0 py-12 px-6">
          <div className="container grow w-auto relative my-0 mx-auto">
            {!submited ? (
              <div className="flex justify-center -m-3">
                <div className="column is-6-desktop p-3">
                  <p className="!text-center mb-3">
                    Thank you. Your feedback was successfully shared.
                  </p>
                  <h2 className="title text-center mb-6">
                    {num === '1'
                      ? !nameValues.name
                        ? extendedValues.thumbsupReasonHeader?.replace(
                            replaceWord,
                            'this'
                          )
                        : extendedValues.thumbsupReasonHeader?.replace(
                            replaceWord,
                            `${nameValues.name}'s`
                          )
                      : ''}
                    {num === '2'
                      ? !nameValues.name
                        ? extendedValues.thumbsokReasonHeader?.replace(
                            replaceWord,
                            'this'
                          )
                        : extendedValues.thumbsokReasonHeader?.replace(
                            replaceWord,
                            `${nameValues.name}'s`
                          )
                      : ''}
                    {num === '3'
                      ? !nameValues.name
                        ? extendedValues.thumbsdownReasonHeader?.replace(
                            replaceWord,
                            'this'
                          )
                        : extendedValues.thumbsdownReasonHeader?.replace(
                            replaceWord,
                            `${nameValues.name}'s`
                          )
                      : ''}
                  </h2>

                  <form
                    className="block"
                    onSubmit={handleSubmitGiveFeedback}
                  >
                    <div className="field !mb-3">
                      <label className="block text-lg text-[#363636] font-semibold mb-2">
                        {extendedValues.efpWhyBoxText || 'Why'}
                      </label>
                      <div className="relative text-base">
                        <textarea
                          className="h-40 max-h-[40rem] min-h-[8rem] text-lg  input-shadow rounded-md border border-[#dbdbdb]"
                          name="feedback-reason"
                          required
                          placeholder={
                            extendedValues.efpWhyBoxPlaceholder || ''
                          }
                          onChange={(e) =>
                            setGivenFeedback((prevValue) => ({
                              ...prevValue,
                              feedbackReason: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>
                    </div>

                    {extendedValues.efpReaderNamePlaceholder && (
                      <div className="mb-3">
                        <div className="text-base box-border relative">
                          <input
                            id="efpReaderNamePlaceholder"
                            name="efpReaderNamePlaceholder"
                            type="text"
                            placeholder={
                              extendedValues.efpReaderNamePlaceholder ||
                              ''
                            }
                            className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                            onChange={(e) =>
                              setGivenFeedback((prevValue) => ({
                                ...prevValue,
                                efpReaderNamePlaceholder:
                                  e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                      </div>
                    )}

                    {extendedValues.efpReaderEmailPlaceholder && (
                      <div className="mb-3">
                        <div className="text-base box-border relative">
                          <input
                            id="efpReaderEmailPlaceholder"
                            name="efpReaderEmailPlaceholder"
                            type="text"
                            placeholder={
                              extendedValues.efpReaderEmailPlaceholder ||
                              ''
                            }
                            className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                            onChange={(e) =>
                              setGivenFeedback((prevValue) => ({
                                ...prevValue,
                                efpReaderEmailPlaceholder:
                                  e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                      </div>
                    )}

                    <div className="relative text-base">
                      <button
                        name="submitBtn"
                        type="submit"
                        className="button w-full text-xl mainBgColor cursor-pointer border border-transparent rounded-md !text-white hover:bg-[#307af1]"
                      >
                        {extendedValues.efpButtonText || ''}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-semibold text-center text-[#363636] mb-6">
                  {!thanksValues.typHeadline
                    ? ''
                    : thanksValues.typHeadline}
                </h1>
                <h2 className="text-xl font-normal text-center grow shrink-0 -mt-5 mb-6">
                  {!thanksValues.typSubHeadline
                    ? ''
                    : thanksValues.typSubHeadline}
                </h2>
                {thanksValues.typShareTwitterHandle ? (
                  <p className="block text-center m-0 p-0">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={
                        thanksValues.typRedirect +
                        '/' +
                        thanksValues.typShareTwitterHandle
                      }
                      className="button !bg-[#3298dc] rounded-md !border-transparent !text-white"
                    >
                      {!thanksValues.typShareButtonTwitter
                        ? ''
                        : thanksValues.typShareButtonTwitter}
                    </a>
                  </p>
                ) : (
                  ''
                )}
              </>
            )}
          </div>
        </div>
        <div className="container text-center !grow-0 !mb-4 ">
          <p>
            Build your own? 👉{' '}
            <Link
              to="/"
              className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
            >
              Feed↔Back.com
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
