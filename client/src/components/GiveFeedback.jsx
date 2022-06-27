import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

export default function GiveFeedback() {
  const {num, id} = useParams()
  const survey = JSON.parse(localStorage.getItem(id))
  console.log(survey)

  const [submited, setSubmited] = useState(false)
  const [giveFeedbackValues, setGiveFeedbackValues] = useState({})
  const [extendedValues, setExtendedValues] = useState({})
  const [nameValues, setNameValues] = useState({})
  const [thanksValues, setThanksValues] = useState({})
  console.log(extendedValues, nameValues)

  useEffect(() => {
    console.log('effect')
    const survey = JSON.parse(localStorage.getItem(id))
    console.log(survey)

    setExtendedValues(survey.editExtendedValues)
    setNameValues(survey.editNameValues)
    setThanksValues(survey.editThanksValues)
  }, [])

  const handleSubmitGiveFeedbackForm = (event) => {
    event.preventDefault()
    // navigate(`/feedback/${id}`)
    setSubmited(true)
  }
  console.log(extendedValues)
  return (
    <div className="bg-[#f1f1f1]">
      <section className="flex flex-col items-center justify-between min-h-screen">
        <div className="flex w-full items-center grow shrink-0 py-12 px-6">
          <div className="container grow w-auto relative my-0 mx-auto">
            {!submited ? (
              <div className="flex justify-center -m-3">
                <div className="column is-6-desktop is-8-desktop p-3">
                  <p className="!text-center mb-3">
                    Thank you. Your feedback was successfully shared.
                  </p>
                  <h2 className="title text-center mb-6">
                    {num === '1'
                      ? !extendedValues.thumbsupReasonHeader
                        ? `😀 you did enjoy ${
                            !nameValues.name
                              ? 'this'
                              : `${nameValues.name}'s`
                          } email 😀`
                        : extendedValues.thumbsupReasonHeader
                      : ''}

                    {num === '2'
                      ? !extendedValues.thumbsupReasonHeader
                        ? `😐 you are not sure what to think about ${
                            !nameValues.name
                              ? 'this'
                              : `${nameValues.name}'s`
                          } email 😐`
                        : extendedValues.thumbsupReasonHeader
                      : ''}

                    {num === '3'
                      ? !extendedValues.thumbsupReasonHeader
                        ? `😐 you didn’t enjoy ${
                            !nameValues.name
                              ? 'this'
                              : `${nameValues.name}'s`
                          } email 😐`
                        : extendedValues.thumbsupReasonHeader
                      : ''}
                  </h2>

                  <form
                    className="block"
                    onSubmit={handleSubmitGiveFeedbackForm}
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
                            extendedValues.efpWhyBoxPlaceholder ||
                            'Listen to your gut :-)'
                          }
                          onChange={(e) =>
                            setGiveFeedbackValues((prevValue) => ({
                              ...prevValue,
                              feedbackReason: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-base box-border relative">
                        <input
                          id="efpReaderNamePlaceholder"
                          name="efpReaderNamePlaceholder"
                          type="text"
                          placeholder={
                            extendedValues.efpReaderNamePlaceholder
                          }
                          className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                          onChange={(e) =>
                            setGiveFeedbackValues((prevValue) => ({
                              ...prevValue,
                              efpReaderNamePlaceholder:
                                e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-base box-border relative">
                        <input
                          id="efpReaderEmailPlaceholder"
                          name="efpReaderEmailPlaceholder"
                          type="text"
                          placeholder={
                            extendedValues.efpReaderEmailPlaceholder
                          }
                          className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                          onChange={(e) =>
                            setGiveFeedbackValues((prevValue) => ({
                              ...prevValue,
                              efpReaderEmailPlaceholder:
                                e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="relative text-base">
                      <button
                        name="submitBtn"
                        type="submit"
                        className="button w-full text-xl mainBgColor border border-transparent rounded-md !text-white hover:bg- [#307af1]"
                      >
                        {`${
                          extendedValues.efpButtonText ||
                          'Send your message'
                        }`}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-semibold text-center text-[#363636] mb-6">
                  {!thanksValues.typHeadline
                    ? 'Thank you for sharing your thoughts'
                    : thanksValues.typHeadline}
                </h1>
                <h2 className="text-xl font-normal text-center grow shrink-0 -mt-5 mb-6">
                  {!thanksValues.typSubHeadline
                    ? 'We wish you a wonderful day and stay safe!'
                    : thanksValues.typSubHeadline}
                </h2>
                {thanksValues.typShareTwitterHandle ? (
                  <p className="block text-center m-0 p-0">
                    <a
                      href={thanksValues.typShareTwitterHandle}
                      className="button !bg-[#3298dc] rounded-md !border-transparent !text-white"
                    >
                      {!thanksValues.typShareButtonTwitter
                        ? 'Share your feedback on Twitter'
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
            Build your own? 👉
            <a
              href="#"
              className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]"
            >
              Feed↔Back.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
