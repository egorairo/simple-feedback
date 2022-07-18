import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {nanoid} from 'nanoid'
import {decodeToken} from 'react-jwt'

import {setVotingValues} from '../store/votingReducer'
import {setExtendedValues} from '../store/extendedReducer'
import {setNames} from '../store/namesReducer'
import {setThanksValues} from '../store/thanksReducer'
import {setId} from '../store/idReducer'

function removeDuplicates(array) {
  let uniq = {}
  return array.filter((obj) => {
    return !uniq[obj.id] && (uniq[obj.id] = true)
  })
}

export default function NewsletterSurveyCreate() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const surveyId = nanoid()

  const survey = useSelector((state) => state)

  // const [survey, setSurvey] = useState({})
  const [surveys, setSurveys] = useState([])
  const [defaultSurvey, setDefaultSurvey] = useState([])

  const [defaultIsNotCreated, setDefaultIsNotCreated] =
    useState(false)

  const [voting, setVoting] = useState(true)
  const [extendedPage, setExtendedPage] = useState(false)
  const [thankYouPage, setThankYouPage] = useState(false)

  const [nameValues, setNameValues] = useState({
    formName: '',
    name: '',
  })
  const [customizeVotingFormValues, setCustomizeVotingFormValues] =
    useState({
      thumbsHeadline: 'Was it useful? Help us to improve!',
      thumbsParagraph:
        'With your feedback, we can improve the letter. Click on a link to vote:',
      thumbsup: '😀 That helped me. Thanks',
      thumbsok: '😐 Meh - was ok.',
      thumbsdown: '🙁 Not interesting to me.',
    })
  const [
    customizeExtendedFormValues,
    setCustomizeExtendedFormValues,
  ] = useState({
    thankYouLine: 'Thank you. Your feedback was successfully shared.',
    thumbsupReasonHeader: '😀 you did enjoy your NAME email 😀',
    thumbsokReasonHeader:
      '😐 you are not sure what to think about NAME email 😐',
    thumbsdownReasonHeader: '🙁 you didn’t enjoy NAME email 🙁',
    efpWhyBoxText: 'Why',
    efpWhyBoxPlaceholder: 'Listen to your gut :-)',
    efpReaderNamePlaceholder:
      'Enter your name or leave it blank to stay anonymous',
    efpReaderEmailPlaceholder:
      'Enter your email if you want a reply from me',
    efpButtonText: 'Send your message',
  })
  const [customizeThanksFormValues, setCustomizeThanksFormValues] =
    useState({
      typHeadline: 'Thank you for sharing your thoughts',
      typSubHeadline: 'We wish you a wonderful day and stay safe!',
      typShareTwitterHandle: '',
      typShareButtonTwitter: 'Share your feedback on Twitter',
      typRedirect: 'https://twitter.com/',
    })

  async function getSurveys() {
    const req = await fetch('http://localhost:1337/api/surveys', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()

    if (data.status === 'ok') {
      setSurveys(data.surveys)
    } else {
      alert(data.error)
    }
  }

  async function getDefaultSurvey() {
    const req = await fetch(
      'http://localhost:1337/api/defaultSurvey',
      {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      }
    )

    const data = await req.json()

    if (data.status === 'ok') {
      const [defaultSurvey] = data.defaultSurvey

      setDefaultSurvey(defaultSurvey)
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
        getDefaultSurvey()
      }
    }

    dispatch(setNames(nameValues))
    dispatch(setVotingValues(customizeVotingFormValues))
    dispatch(setExtendedValues(customizeExtendedFormValues))
    dispatch(setThanksValues(customizeThanksFormValues))
    dispatch(setId(surveyId))
  }, [
    nameValues,
    customizeVotingFormValues,
    customizeExtendedFormValues,
    customizeThanksFormValues,
  ])

  const updateSurveys = async (surveys) => {
    const req = await fetch('http://localhost:1337/api/surveys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        surveys: surveys,
      }),
    })

    const data = await req.json()

    if (data.status === 'ok') {
      setSurveys(surveys)
    } else {
      return data.error
    }
  }

  const handleCreateSurvey = () => {
    const id = survey.id

    const newSurveys = [...surveys, ...[survey]]

    const surveysWithoutDuplicates = removeDuplicates(newSurveys)

    setSurveys(surveysWithoutDuplicates)

    updateSurveys(surveysWithoutDuplicates)

    navigate(`/feedback/${id}?created=true`)
  }

  const handleCreateUsingDefaultSurvey = async () => {
    if (defaultSurvey) {
      getDefaultSurvey()

      const newNames = Object.assign(
        {},
        nameValues,
        defaultSurvey.names
      )

      const newSurvey = {
        id: surveyId,
        names: newNames,
        votingValues: defaultSurvey.votingValues,
        extendedValues: defaultSurvey.extendedValues,
        thanksValues: defaultSurvey.thanksValues,
      }

      const id = newSurvey.id

      const newSurveys = [...surveys, ...[newSurvey]]
      console.log(newSurveys)

      const surveysWithoutDuplicates = removeDuplicates(newSurveys)

      setSurveys(surveysWithoutDuplicates)

      updateSurveys(surveysWithoutDuplicates)

      navigate(`/feedback/${id}?created=true`)
    } else {
      console.log('ewe')
      setDefaultIsNotCreated(true)

      setTimeout(() => {
        setDefaultIsNotCreated(false)
      }, 3000)
    }
  }

  return (
    <>
      <div>
        <section className="flex items-center bg-[#f1f1f1] py-36 px-6">
          <div className="container grow w-auto relative my-0 mx-auto">
            <div className="columns flex-wrap justify-center bg-white rounded-md feedbackBlockShadow text-[#4a4a4a] p-5 -m-3">
              <div className="column is-half p-3">
                <h1 className="text-[##363636] font-medium text-3xl mb-6">
                  Create Newsletter Survey
                </h1>
                <p className="p-0 m-0">
                  The intended use is one form per email sent on your
                  newsletter to get the most out of the tool. More in
                  the <a href="/faq">FAQ</a>
                </p>
                <hr className="h-0.5 my-6"></hr>
                <fieldset className="mb-12">
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
                        className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                        onChange={(e) => {
                          setNameValues((prevValue) => ({
                            ...prevValue,
                            formName: e.target.value,
                          }))
                        }}
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
                        value={nameValues.name}
                        className="max-w-full w-full bg-white border border-[#dbdbdb] rounded-md input-shadow text[#363636]"
                        onChange={(e) =>
                          setNameValues((prevValue) => ({
                            ...prevValue,
                            name: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <p className="text-xs mt-1">
                      The name you enter will be used on the extended
                      feedback page with the default texts. Enter a
                      name your readers recognize, e.g. your name or
                      the name of your newsletter.
                    </p>
                  </div>
                  <div>
                    <div className="text-base box-border relative">
                      <button
                        disabled={!nameValues.formName ? true : false}
                        className={`${
                          !nameValues.formName
                            ? `createUsingDefaultDisabled`
                            : 'createUsingDefault'
                        }`}
                        onClick={handleCreateUsingDefaultSurvey}
                      >
                        Create using defaults
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
              {/* Customize */}
              <div className="w-full p-3">
                <div className="my-5">
                  <h2 className="text-center text-[#4a4a4a] text-lg font-normal mb-6">
                    Customize
                  </h2>
                  <div className="flex justify-between overflow-hidden overflow-x-auto text-base mb-6">
                    <ul className="flex justify-center items-center grow shrink-0 border-b border-[#dbdbdb]">
                      <li>
                        <a
                          className={`${
                            voting ? 'active' : 'customizeLinkHover'
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
                              The voting section is the part you copy
                              and paste into your email.
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
                                    customizeVotingFormValues.thumbsHeadline ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeVotingFormValues(
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
                                    customizeVotingFormValues.thumbsParagraph ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeVotingFormValues(
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
                                    customizeVotingFormValues.thumbsup ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeVotingFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        thumbsup: e.target.value,
                                      })
                                    )
                                  }
                                ></input>
                              </div>
                              <p className="block text-xs mt-1">
                                First emoji is used as the label in
                                the Admin UI
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
                                    customizeVotingFormValues.thumbsok ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeVotingFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        thumbsok: e.target.value,
                                      })
                                    )
                                  }
                                ></input>
                              </div>
                              <p className="block text-xs mt-1">
                                First emoji is used as the label in
                                the Admin UI
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
                                    customizeVotingFormValues.thumbsdown ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeVotingFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        thumbsdown: e.target.value,
                                      })
                                    )
                                  }
                                ></input>
                              </div>
                              <p className="block text-xs mt-1">
                                First emoji is used as the label in
                                the Admin UI
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
                                  {!customizeVotingFormValues.thumbsHeadline
                                    ? ''
                                    : customizeVotingFormValues.thumbsHeadline}
                                </strong>
                              </p>
                              <p className="text-xl mb-4">
                                {!customizeVotingFormValues.thumbsParagraph
                                  ? ''
                                  : customizeVotingFormValues.thumbsParagraph}
                              </p>
                              <ul className="list-disc mt-8 ml-4">
                                <li>
                                  <a className="text-xl cursor-pointer text-[#4185f3] no-underline">
                                    {!customizeVotingFormValues.thumbsup
                                      ? ''
                                      : customizeVotingFormValues.thumbsup}
                                  </a>
                                </li>
                                <li className="mt-1">
                                  <a className="text-xl cursor-pointer text-[#4185f3] no-underline">
                                    {!customizeVotingFormValues.thumbsok
                                      ? ''
                                      : customizeVotingFormValues.thumbsok}
                                  </a>
                                </li>
                                <li className="mt-1">
                                  <a className="text-xl cursor-pointer text-[#4185f3] no-underline">
                                    {!customizeVotingFormValues.thumbsdown
                                      ? ''
                                      : customizeVotingFormValues.thumbsdown}
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
                                  {!customizeVotingFormValues.thumbsHeadline
                                    ? ''
                                    : customizeVotingFormValues.thumbsHeadline}
                                </strong>
                              </p>
                              <p className="text-xls mb-4">
                                {!customizeVotingFormValues.thumbsParagraph
                                  ? ''
                                  : customizeVotingFormValues.thumbsParagraph}
                              </p>
                              <p className="">
                                <a className="text-xl cursor-pointer text-[#4185f3] no-underline">
                                  {!customizeVotingFormValues.thumbsup
                                    ? ''
                                    : customizeVotingFormValues.thumbsup}
                                </a>{' '}
                                -{' '}
                                <a className="text-xl cursor-pointer text-[#4185f3] no-underline">
                                  {!customizeVotingFormValues.thumbsok
                                    ? ''
                                    : customizeVotingFormValues.thumbsok}
                                </a>{' '}
                                -{' '}
                                <a className="text-xl cursor-pointer text-[#4185f3] no-underline">
                                  {!customizeVotingFormValues.thumbsdown
                                    ? ''
                                    : customizeVotingFormValues.thumbsdown}
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
                              The Extended Feedback Page is shown when
                              the reader clicks on a link in the
                              voting section. The vote is already
                              registered, and you can collect
                              additional input from the user.
                            </p>
                            <p className="text-[#4a4a4a] mb-4">
                              Your NAME is placeholder and replaced
                              with your name plus appending &#39;s.
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
                                    customizeExtendedFormValues.thankYouLine ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        thankYouLine: e.target.value,
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
                                    customizeExtendedFormValues.thumbsupReasonHeader ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
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
                                  value={
                                    customizeExtendedFormValues.thumbsokReasonHeader ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
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
                                  value={
                                    customizeExtendedFormValues.thumbsdownReasonHeader ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
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
                                    customizeExtendedFormValues.efpWhyBoxText ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        efpWhyBoxText: e.target.value,
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
                                    customizeExtendedFormValues.efpWhyBoxPlaceholder ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
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
                                Gather Reader&#39;s Name Placeholder
                              </label>
                              <div className="text-base box-border relative">
                                <input
                                  id="efpReaderNamePlaceholder"
                                  name="efpReaderNamePlaceholder"
                                  type="text"
                                  placeholder=""
                                  required
                                  value={
                                    customizeExtendedFormValues.efpReaderNamePlaceholder ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
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
                                Gather Reader&#39;s Email Address
                                Placeholder
                              </label>
                              <div className="text-base box-border relative">
                                <input
                                  id="efpReaderEmailPlaceholder"
                                  name="efpReaderEmailPlaceholder"
                                  type="text"
                                  placeholder=""
                                  required
                                  value={
                                    customizeExtendedFormValues.efpReaderEmailPlaceholder ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
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
                                Leave the field empty to hide the
                                input box on the extended feedback
                                page.
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
                                    customizeExtendedFormValues.efpButtonText ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeExtendedFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        efpButtonText: e.target.value,
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
                                    <div className="flex justify-center -m-3">
                                      <div className="block basis-0 grow shrink p-3">
                                        <p className="text-base font-normal text-center text-[#363636] mb-3">
                                          {!customizeExtendedFormValues.thankYouLine
                                            ? ''
                                            : customizeExtendedFormValues.thankYouLine}
                                        </p>
                                        <h2 className="text-3xl font-semibold text-center text-[#363636] mb-6">
                                          {!customizeExtendedFormValues.thumbsupReasonHeader
                                            ? `😀 you did enjoy ${
                                                !nameValues.name
                                                  ? 'this'
                                                  : `${nameValues.name}'s`
                                              } email 😀`
                                            : customizeExtendedFormValues.thumbsupReasonHeader}
                                        </h2>
                                        <form className="block">
                                          <div className="field !mb-8">
                                            <label className="block text-lg text-[#363636] font-semibold mb-2">
                                              {!customizeExtendedFormValues.efpWhyBoxText
                                                ? 'Why'
                                                : customizeExtendedFormValues.efpWhyBoxText}
                                            </label>
                                            <div className="relative text-base">
                                              <textarea
                                                className="h-40 max-h-[40rem] min-h-[8rem] text-lg  input-shadow rounded-md border border-[#dbdbdb]"
                                                placeholder={
                                                  !customizeExtendedFormValues.efpWhyBoxPlaceholder
                                                    ? ''
                                                    : customizeExtendedFormValues.efpWhyBoxPlaceholder
                                                }
                                              ></textarea>
                                            </div>
                                          </div>

                                          <div className="field">
                                            <div className="relative text-base">
                                              <input
                                                id="efpReaderNamePlaceholder"
                                                name="name"
                                                type="text"
                                                className="block input-shadow bg-white border border-[#dbdbdb] rounded-md color-[#363636]"
                                                placeholder={
                                                  !customizeExtendedFormValues.efpReaderNamePlaceholder
                                                    ? ''
                                                    : customizeExtendedFormValues.efpReaderNamePlaceholder
                                                }
                                              ></input>
                                            </div>
                                          </div>
                                          <div className="field">
                                            <div className="relative text-base">
                                              <input
                                                id="efpReaderEmailPlaceholder"
                                                name="name"
                                                type="text"
                                                className="block input-shadow bg-white border border-[#dbdbdb] rounded-md color-[#363636]"
                                                placeholder={
                                                  !customizeExtendedFormValues.efpReaderEmailPlaceholder
                                                    ? ''
                                                    : customizeExtendedFormValues.efpReaderEmailPlaceholder
                                                }
                                              ></input>
                                            </div>
                                          </div>
                                          <div className="relative text-base">
                                            <button className="button w-full text-xl mainBgColor border border-transparent rounded-md !text-white hover:bg-[#307af1]">
                                              {!customizeExtendedFormValues.efpButtonText
                                                ? ''
                                                : customizeExtendedFormValues.efpButtonText}
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
                              reader after they gave feedback on the
                              Extended Feedback Page. user.
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
                                    customizeThanksFormValues.typHeadline ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeThanksFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        typHeadline: e.target.value,
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
                                    customizeThanksFormValues.typSubHeadline ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeThanksFormValues(
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
                                    customizeThanksFormValues.typShareTwitterHandle ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeThanksFormValues(
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
                                Enter your twitter handle to activate
                                the share button.
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
                                    customizeThanksFormValues.typShareButtonTwitter ||
                                    ''
                                  }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeThanksFormValues(
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
                                  placeholder={
                                    customizeThanksFormValues.typRedirect
                                  }
                                  required
                                  // value={
                                  //   customizeThanksFormValues.typRedirect
                                  // }
                                  className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                  onChange={(e) =>
                                    setCustomizeThanksFormValues(
                                      (prevValue) => ({
                                        ...prevValue,
                                        typRedirect: e.target.value,
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
                                    {!customizeThanksFormValues.typHeadline
                                      ? ''
                                      : customizeThanksFormValues.typHeadline}
                                  </h1>
                                  <h2 className="text-xl font-normal text-center grow shrink-0 -mt-5 mb-6">
                                    {!customizeThanksFormValues.typSubHeadline
                                      ? ''
                                      : customizeThanksFormValues.typSubHeadline}
                                  </h2>
                                  {customizeThanksFormValues.typShareTwitterHandle ? (
                                    <p className="block text-center m-0 p-0">
                                      <a
                                        href={
                                          customizeThanksFormValues.typShareTwitterHandle
                                        }
                                        className="button !bg-[#3298dc] rounded-md !border-transparent !text-white"
                                      >
                                        {!customizeThanksFormValues.typShareButtonTwitter
                                          ? ''
                                          : customizeThanksFormValues.typShareButtonTwitter}
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
                <fieldset className="mb-12">
                  <div className="flex justify-start">
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        disabled={!nameValues.formName ? true : false}
                        className={`${
                          !nameValues.formName
                            ? 'disabledMainBgColor !cursor-default'
                            : 'mainBgColor hover:bg-[#307af1]'
                        } !text-white text-base button mainBgColor rounded-md`}
                        onClick={handleCreateSurvey}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </section>
      </div>
      {defaultIsNotCreated && (
        <div className="notices flex-col">
          <div
            role="alert"
            className="toast self-center text-white mainBgColor"
          >
            <div>{`You don't have default survey. Created it in 'Default survey' at header`}</div>
          </div>
        </div>
      )}
    </>
  )
}
