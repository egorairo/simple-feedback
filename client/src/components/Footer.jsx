import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="block bg-[#fafafa] px-6 pt-12 pb-24">
      <div className="container grow w-auto relative my-0 mx-auto">
        <div className="columns justify-center">
          <div className="column">
            <div className="text-left text-base text-[#4a4a4a]">
              <p className="mb-4">
                Made by{' '}
                <a
                  href="https://github.com/egorairo"
                  className="mainColor cursor-pointer no-underline hover:text-[#466caa]"
                >
                  Egor
                </a>
              </p>
              <p>
                <strong>Have questions?</strong> <br></br>Email me at{' '}
                <br></br> egor.kryzhanouski@gmail.com
              </p>
            </div>
          </div>
          <div className="column">
            <div className="text-right text-base text-[#4a4a4a]">
              <p>
                Features: <br></br>{' '}
                <a
                  href="/#howItWorks"
                  className="mainColor cursor-pointer no-underline hover:text-[#466caa]"
                >
                  Newsletter survey
                </a>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="text-right text-base text-[#4a4a4a]">
              <p>
                Resources: <br></br>{' '}
                <Link
                  to="/faq"
                  className="mainColor cursor-pointer no-underline hover:text-[#466caa]"
                >
                  FAQ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
