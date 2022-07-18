import React from 'react'
import {Link} from 'react-router-dom'

export default function Main() {
  return (
    <div>
      <div>
        <section className="flex items-center">
          <div className="grow shrink-0 pt-12 px-6 pb-0">
            <div className="container grow w-auto relative my-0 mx-auto">
              <div className="flex items-center mb-3">
                <div className="flex flex-col w-1/2 p-3">
                  <h1 className="text-3xl font-extrabold mb-5">
                    Simple feedback tool for newsletters, websites &
                    blog
                  </h1>
                  <h2 className="text-xl font-normal text-[#4a4a4a] mb-6">
                    Make it easy for your readers to tell you exactly
                    what they think of your newsletter, website or
                    blog with anonymous and instant feedback.
                  </h2>
                  <p>
                    <Link
                      to="/register"
                      className="createSurveyFree text-xl"
                    >
                      <span>Create Your Survey &#8594;</span>
                    </Link>
                  </p>
                </div>
                <div className="w-1/2 p-3 flex justify-center">
                  <img
                    src="/img/image.svg"
                    className="w-full h-auto"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center bg-[#f9f9f9] mt-32">
          <div className="grow shrink-0 py-36 px-6 pt-20">
            <div className="container grow w-auto relative my-0 mx-auto">
              <h2 className="text-3xl text-center text-[#000000b3] font-extrabold mb-6">
                Happy Readers Make Successful Creators
              </h2>
              <h3 className="text-xl text-center font-normal mb-6">
                To create a newsletter that’s loved by readers, you
                need to listen to what they have to say about it.
                <br></br> Here&#39;s how it works:
              </h3>
              <p className="text-xl text-center font-normal mb-6">
                &#8595;
              </p>
              <p className="text-xl text-center font-normal mb-6">
                Readers share honest feedback 📬
              </p>
              <p className="text-xl text-center font-normal mb-6">
                &#8595;
              </p>

              <p className="text-xl text-center font-normal mb-6">
                You improve your newsletter with every issue 💌
              </p>
              <p className="text-xl text-center font-normal mb-6">
                &#8595;
              </p>

              <p className="text-xl text-center font-normal mb-6">
                They appreciate your efforts and share your newsletter
                with their friends 🌎
              </p>
              <p className="text-xl text-center font-normal mb-6">
                &#8595;
              </p>

              <p className="text-xl text-center font-normal mb-6">
                Your newsletter gains more engaged readers ❣️
              </p>
              <p className="text-xl text-center font-normal mb-6">
                &#8595;
              </p>

              <p className="text-xl text-center font-normal mb-6">
                Feed↔Back puts you on the path to <b>scale</b> and{' '}
                <b>monetize</b> your newsletter with more involved
                readers.
              </p>
            </div>
          </div>
        </section>
        <section id="howItWorks" className="bg-white">
          <div className="py-36 px-6">
            <div className="container grow w-auto relative my-0 mx-auto">
              <h2 className="text-3xl text-center text-[#363636] font-extrabold mb-6">
                How does Feed↔Back work?
              </h2>
              <h3 className="text-xl mb-12">
                It takes less than 2 minutes to set up your first
                feedback form with our 2-step process and smooth
                integration.
              </h3>
              <div className="flex justify-center items-center -mt-3 mb-3 -mx-8">
                <div className="column is-half !px-8">
                  <h2 className="text-2xl font-extrabold text-[#363636] mb-6">
                    Step 1: Frictionless rating
                  </h2>
                  <p className="text-xl text-[#4a4a4a]">
                    Your readers can rate your email by clicking on a
                    simple link inside the newsletter. That&#39;s
                    really easy. Even your grandparents can do it.
                  </p>
                </div>
                <div className="column is-half !px-8">
                  <div className="block flex-1 bg-white feedbackBlockShadow rounded-md p-5">
                    <p className="text-xl mb-4">
                      <strong>Was it useful? Help us improve!</strong>
                    </p>
                    <p className="text-xl mb-4">
                      With your feedback, we can improve the letter.
                      Click on a link to vote:
                    </p>
                    <ul className="list-disc mt-4 ml-8">
                      <li>
                        <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                          😀 That helped me. Thanks
                        </a>
                      </li>
                      <li className="mt-1">
                        <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                          😐 Meh - was ok.
                        </a>
                      </li>
                      <li className="mt-1">
                        <a className="text-xl cursor-pointer text-[#4185f3] no-underline hover:text-[#1c6def]">
                          🙁 Not interesting to me.
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center -mb-3 mt-6 -mx-8">
                <div className="column is-half !px-8">
                  <div className="block flex-1 bg-white feedbackBlockShadow rounded-md p-5">
                    <img
                      src="/img/feedbackExample.png"
                      alt="step 2 of the simple feedback system"
                      className="h-auto max-w-full"
                    ></img>
                  </div>
                </div>
                <div className="column is-half !px-8">
                  <h2 className="text-2xl font-extrabold text-[#363636] mb-6">
                    Step 2: Incentivise concrete feedback
                  </h2>
                  <p className="text-xl text-[#4a4a4a]">
                    After your reader votes, they can write a comment
                    or add a voice note to give you more details about
                    what worked and what didn’t. This is your{' '}
                    <strong>GOLDMINE</strong> of insightful nuggets!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
