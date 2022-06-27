import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import EyeSvg from '../../public/img/eye.svg?component'

export default function Feedbacks() {
  const [surveys, setSurveys] = useState([])
  const [displayedSurveys, setDisplayedSurveys] = useState([])

  const [searchedFormValue, setSearchedFormValue] = useState('')

  const getSurveys = async () => {
    const req = await fetch('http://localhost:1337/api/surveys', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()

    if (data.status === 'ok') {
      setSurveys(data.surveys)
      setDisplayedSurveys(data.surveys)
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    getSurveys()
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
            <div className="column is-6-desktop is-8-tablet">
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

              {displayedSurveys?.map((survey) => {
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
                          {survey.names.formName} (number of votes)
                        </Link>
                      </p>
                    </div>
                    <div className="bg-transparent p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex justify-center text-center grow shrink-0 basis-auto">
                          <div>Statistic Diagram</div>
                        </div>
                        <div className="flex justify-center text-center grow shrink-0 basis-auto">
                          <div>
                            <p className="text-base">😀</p>
                            <p className="text-4xl text-[#2acd6d] font-normal">
                              0
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center text-center grow">
                          <div>
                            <p className="text-base">😐</p>
                            <p className="text-4xl text-[#fff44f] font-normal">
                              0
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center text-center grow">
                          <div>
                            <p className="text-base">🙁</p>
                            <p className="text-4xl text-[#ec5757] font-normal">
                              0
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
