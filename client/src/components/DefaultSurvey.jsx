import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function DefaultSurvey() {
  const [savedDefault, setSavedDefault] = useState(false)

  const [voting, setVoting] = useState(true)
  const [extendedPage, setExtendedPage] = useState(false)
  const [thankYouPage, setThankYouPage] = useState(false)

  const [defaultName, setDefaultName] = useState({})
  const [defaultVotingValues, setDefaultVotingValues] = useState({
    thumbsHeadline: 'Was it useful? Help us to improve!',
    thumbsParagraph:
      'With your feedback, we can improve the letter. Click on a link to vote:',
    thumbsup: '😀 That helped me. Thanks',
    thumbsok: '😐 Meh - was ok.',
    thumbsdown: '🙁 Not interesting to me.',
  })
  const [defaultExtendedValues, setDefaultExtendedValues] = useState({
    thankYouLine: 'Thank you. Your feedback was successfully shared.',
    thumbsokReasonHeader: '😐 Meh - was ok.',
    thumbsdownReasonHeader: '😐 you didn’t enjoy this email 😐',
    efpWhyBoxText: 'Why',
    efpWhyBoxPlaceholder: 'Listen to your gut :-)',
    efpReaderNamePlaceholder:
      'Enter your name or leave it blank to stay anonymous',
    efpReaderEmailPlaceholder:
      'Enter your email if you want a reply from me',
    efpButtonText: 'Send your message',
  })
  const [defaultThanksValues, setDefaultThanksValues] = useState({
    typHeadline: 'Thank you for sharing your thoughts',
    typSubHeadline: 'We wish you a wonderful day and stay safe!',
    typShareTwitterHandle: '',
    typShareButtonTwitter: 'Share your feedback on Twitter',
    typRedirect: 'https://mydomain.com/myredirect',
  })

  useEffect(() => {
    const defaultSurvey = JSON.parse(
      localStorage.getItem('defaultSurvey')
    )

    if (defaultSurvey) {
      setDefaultName(defaultSurvey?.defaultName || {})
      setDefaultVotingValues(defaultSurvey?.defaultVotingValues || {})
      setDefaultExtendedValues(
        defaultSurvey?.defaultExtendedValues || {}
      )
      setDefaultThanksValues(defaultSurvey?.defaultThanksValues || {})
    }
  }, [])

  const handleClickSaveDefaultSurvey = () => {
    localStorage.setItem(
      'defaultSurvey',
      JSON.stringify({
        defaultName,
        defaultVotingValues,
        defaultExtendedValues,
        defaultThanksValues,
      })
    )

    setSavedDefault(true)

    setTimeout(() => {
      setSavedDefault(false)
    }, 3000)
  }

  return (
    <>
      <div className="bg-[#f1f1f1]">
        <section className="block py-36 px-6">
          <div className="container grow w-auto relative my-0 mx-auto">
            <h1 className="title mb-6">Newsletter Survey Defaults</h1>

            <div className="flex items-stretch justify-between overflow-hidden whitespace-nowrap mb-0">
              <ul className="flex items-center justify-start border-b border-[#dbdbdb] grow shrink-0 list-none ">
                <li className="block p-o m-0">
                  <a
                    className={'feedbackLinksActive feedbackLinks'}
                    // onClick={() => {
                    //   setAnalytics(true)
                    //   setEdit(false)
                    //   setCode(false)
                    // }}
                  >
                    Newsletter Survey Defaults
                  </a>
                </li>
              </ul>
            </div>

            <div className="border border-[#dbdbdb] border-t-transparent bg-white rounded-b-md p-5">
              <div>
                <p className="text-[#4a4a4a] text-base mb-6">
                  Set default values for new Newsletter Surveys.
                </p>
                <p className="relative bg-[#eef6fc] text-[#1d72aa] rounded-md pr-10 pl-6 py-6 mb-6">
                  Changes are only valid for new Newsletter Survey.
                  Existing surveys will not be updated automatically.
                  You can update those under{' '}
                  <Link to="/feedbacks" className="underline">
                    All Surveys
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap -m-3">
                  <div className="column">
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="block text-base text-[#363636] font-semibold mb-2"
                      >
                        Your Name
                      </label>
                      <div className="text-base box-border relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name that can be used in a placeholder on the extended feedback page"
                          required
                          value={defaultName.name}
                          className="max-w-full w-full bg-white border border-[#dbdbdb] rounded-md input-shadow text[#363636]"
                          onChange={(e) =>
                            setDefaultName((prevValue) => ({
                              ...prevValue,
                              name: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
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
                            <div className="flex flex-wrap -my-3 -mx-8">
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
                                        defaultVotingValues.thumbsHeadline
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultVotingValues(
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
                                        defaultVotingValues.thumbsParagraph
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultVotingValues(
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
                                        defaultVotingValues.thumbsup
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultVotingValues(
                                          (prevValue) => ({
                                            ...prevValue,
                                            thumbsup: e.target.value,
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
                                        defaultVotingValues.thumbsok
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultVotingValues(
                                          (prevValue) => ({
                                            ...prevValue,
                                            thumbsok: e.target.value,
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
                                        defaultVotingValues.thumbsdown
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultVotingValues(
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
                                      {!defaultVotingValues.thumbsHeadline
                                        ? 'Was it useful? Help us to improve!'
                                        : defaultVotingValues.thumbsHeadline}
                                    </strong>
                                  </p>
                                  <p className="text-xl mb-4">
                                    {!defaultVotingValues.thumbsParagraph
                                      ? 'With your feedback, we can improve the letter. Click on a link to vote:'
                                      : defaultVotingValues.thumbsParagraph}
                                  </p>
                                  <ul className="list-disc mt-8 ml-4">
                                    <li>
                                      <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                                        {!defaultVotingValues.thumbsup
                                          ? '😀 That helped me. Thanks'
                                          : defaultVotingValues.thumbsup}
                                      </a>
                                    </li>
                                    <li className="mt-1">
                                      <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                                        {!defaultVotingValues.thumbsok
                                          ? '😐 Meh - was ok.'
                                          : defaultVotingValues.thumbsok}
                                      </a>
                                    </li>
                                    <li className="mt-1">
                                      <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                                        {!defaultVotingValues.thumbsdown
                                          ? '🙁 Not interesting to me.'
                                          : defaultVotingValues.thumbsdown}
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
                                      {!defaultVotingValues.thumbsHeadline
                                        ? 'Was it useful? Help us to improve!'
                                        : defaultVotingValues.thumbsHeadline}
                                    </strong>
                                  </p>
                                  <p className="text-xls mb-4">
                                    {!defaultVotingValues.thumbsParagraph
                                      ? 'With your feedback, we can improve the letter. Click on a link to vote:'
                                      : defaultVotingValues.thumbsParagraph}
                                  </p>
                                  <p className="">
                                    <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                                      {!defaultVotingValues.thumbsup
                                        ? '😀 That helped me. Thanks'
                                        : defaultVotingValues.thumbsup}
                                    </a>{' '}
                                    -{' '}
                                    <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                                      {!defaultVotingValues.thumbsok
                                        ? '😐 Meh - was ok.'
                                        : defaultVotingValues.thumbsok}
                                    </a>{' '}
                                    -{' '}
                                    <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                                      {!defaultVotingValues.thumbsdown
                                        ? '🙁 Not interesting to me.'
                                        : defaultVotingValues.thumbsdown}
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {extendedPage && (
                          <div>
                            <div className="flex flex-wrap -my-3 -mx-8">
                              <div className="block basis-0 grow shrink py-3 px-8">
                                <p className="text-[#4a4a4a] mb-4">
                                  The Extended Feedback Page is shown
                                  when the reader clicks on a link in
                                  the voting section. The vote is
                                  already registered, and you can
                                  collect additional input from the
                                  user.
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
                                        defaultExtendedValues.thankYouLine
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                        defaultExtendedValues.thumbsupReasonHeader ||
                                        '😀 you did enjoy your NAME email 😀'
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                        defaultExtendedValues.thumbsokReasonHeader
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                        defaultExtendedValues.thumbsdownReasonHeader
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                        defaultExtendedValues.efpWhyBoxText
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                        defaultExtendedValues.efpWhyBoxPlaceholder
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                        defaultExtendedValues.efpReaderNamePlaceholder
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                        defaultExtendedValues.efpReaderEmailPlaceholder
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                    {' '}
                                    Leave the field empty to hide the
                                    input box on the extended feedback
                                    page.{' '}
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
                                        defaultExtendedValues.efpButtonText
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultExtendedValues(
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
                                              {!defaultExtendedValues.thankYouLine
                                                ? 'Thank you for sharing your thoughts'
                                                : defaultExtendedValues.thankYouLine}
                                            </p>
                                            <h2 className="text-3xl font-semibold text-center text-[#363636] mb-6">
                                              {!defaultExtendedValues.thumbsupReasonHeader
                                                ? `😀 you did enjoy ${
                                                    !defaultName.name
                                                      ? 'this'
                                                      : `${defaultName.name}'s`
                                                  } email 😀`
                                                : defaultExtendedValues.thumbsupReasonHeader}
                                            </h2>
                                            <form className="block">
                                              <div className="field !mb-8">
                                                <label className="block text-lg text-[#363636] font-semibold mb-2">
                                                  {!defaultExtendedValues.efpWhyBoxText
                                                    ? 'Why'
                                                    : defaultExtendedValues.efpWhyBoxText}
                                                </label>
                                                <div className="relative text-base">
                                                  <textarea
                                                    className="h-40 max-h-[40rem] min-h-[8rem] text-lg  input-shadow rounded-md border border-[#dbdbdb]"
                                                    placeholder={
                                                      !defaultExtendedValues.efpWhyBoxPlaceholder
                                                        ? 'Listen to your gut :-)'
                                                        : defaultExtendedValues.efpWhyBoxPlaceholder
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
                                                      !defaultExtendedValues.efpReaderNamePlaceholder
                                                        ? 'Enter your name or leave it blank to stay anonymous'
                                                        : defaultExtendedValues.efpReaderNamePlaceholder
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
                                                      !defaultExtendedValues.efpReaderEmailPlaceholder
                                                        ? 'Enter your email if you want a reply from me'
                                                        : defaultExtendedValues.efpReaderEmailPlaceholder
                                                    }
                                                  ></input>
                                                </div>
                                              </div>
                                              <div className="relative text-base">
                                                <button className="button w-full text-xl mainBgColor border border-transparent rounded-md !text-white hover:bg- [#307af1]">
                                                  {!defaultExtendedValues.efpButtonText
                                                    ? 'Send your message'
                                                    : defaultExtendedValues.efpButtonText}
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
                            <div className="flex flex-wrap -my-3 -mx-8">
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
                                        defaultThanksValues.typHeadline
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultThanksValues(
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
                                        defaultThanksValues.typSubHeadline
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultThanksValues(
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
                                        defaultThanksValues.typShareTwitterHandle
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultThanksValues(
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
                                        defaultThanksValues.typShareButtonTwitter
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultThanksValues(
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
                                        defaultThanksValues.typRedirect
                                      }
                                      className="max-w-full w-full bg-white border border-[#dbdbdb] input-shadow text[#363636]"
                                      onChange={(e) =>
                                        setDefaultThanksValues(
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
                                        {!defaultThanksValues.typHeadline
                                          ? 'Thank you for sharing your thoughts'
                                          : defaultThanksValues.typHeadline}
                                      </h1>
                                      <h2 className="text-xl font-normal text-center grow shrink-0 -mt-5 mb-6">
                                        {!defaultThanksValues.typSubHeadline
                                          ? 'We wish you a wonderful day and stay safe!'
                                          : defaultThanksValues.typSubHeadline}
                                      </h2>
                                      {defaultThanksValues.typShareTwitterHandle ? (
                                        <p className="block text-center m-0 p-0">
                                          <a
                                            href={
                                              defaultThanksValues.typShareTwitterHandle
                                            }
                                            className="button !bg-[#3298dc] rounded-md !border-transparent !text-white"
                                          >
                                            {!defaultThanksValues.typShareButtonTwitter
                                              ? 'Share your feedback on Twitter'
                                              : defaultThanksValues.typShareButtonTwitter}
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
                          className="
                        button rounded-md !border !border-[#4bbf73] !text-[#4bbf73] hover:bg-[#4bbf73] hover:!text-white"
                          onClick={handleClickSaveDefaultSurvey}
                        >
                          Save Default
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {savedDefault ? (
        <div className="notices flex-col">
          <div
            role="alert"
            className="toast self-center text-white bg-[#4bbf73]"
          >
            <div>{`Default feedback form successfully saved.`}</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
