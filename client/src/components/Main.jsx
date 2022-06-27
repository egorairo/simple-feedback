import React from 'react'
import {Link} from 'react-router-dom'

export default function Main() {
  return (
    <div>
      <section className="flex items-center">
        <div className="grow shrink-0 pt-12 px-6 pb-0">
          <div className="container grow w-auto relative my-0 mx-auto">
            <div className="flex items-center mb-3">
              <div className="flex flex-col w-1/2 p-3">
                <h1 className="text-3xl font-black mb-5">
                  Simple, zero-friction feedback tool for newsletters
                  & websites
                </h1>
                <h2 className="text-xl font-normal text-[#4a4a4a] mb-6">
                  Make it easy for your readers to tell you exactly
                  what they think of your newsletter or website with
                  anonymous and instant feedback.
                </h2>
                <p>
                  <Link
                    to="/register"
                    className="createSurveyFree text-xl"
                  >
                    <span>Create Survey for free &#8594;</span>
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
        <div className="grow shrink-0 pt-12 px-6 pb-0">
          <div className="container grow w-auto relative my-0 mx-auto">
            <h2 className="text-3xl text-center text-[#000000b3] font-black mb-6">
              Happy Readers Make Successful Creators
            </h2>
            <h3 className="text-xl text-center font-normal mb-6">
              To create a newsletter that’s loved by readers, you need
              to listen to what they have to say about it.<br></br>{' '}
              Here&#39;s how it works:
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
      <section></section>
    </div>
  )
}
