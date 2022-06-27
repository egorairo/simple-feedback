import React from 'react'

import DeleteSvg from '../../public/img/delete.svg?component'

export default function Dashboard() {
  return (
    <div className="bg-[#f1f1f1]">
      <section className="flex items-center">
        <div className="grow shrink-0 pt-12 px-6 pb-0">
          <div className="container grow w-auto relative my-0 mx-auto">
            <h1 className="text-3xl text-[#363636] font-medium mb-6">
              Dashboard
            </h1>
            <div className="flex flex-1 mb-3 -mx-3 -mt-3">
              <div className="flex flex-1 p-3">
                <div className="flex-1 bg-[#222] feedbackBlockShadow rounded-md p-5">
                  <p className="text-white text-center text-xl w-full mb-6">
                    All Time
                  </p>
                  <div className="flex items-center justify-between grow">
                    <div className="flex justify-center text-center grow mr-3">
                      <div>
                        <p className="text-base">😀</p>
                        <p className="text-3xl text-[#2acd6d] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center text-center grow mr-3">
                      <div>
                        <p className="text-base">😐</p>
                        <p className="text-3xl text-[#fff44f] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center text-center grow mr-3">
                      <div>
                        <p className="text-base">🙁</p>
                        <p className="text-3xl text-[#ec5757] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 p-3">
                <div className="flex-1 bg-[#222] feedbackBlockShadow rounded-md p-5">
                  <p className="text-white text-center text-xl w-full mb-6">
                    This Month
                  </p>
                  <div className="flex items-center justify-between grow">
                    <div className="flex justify-center grow text-center mr-3">
                      <div>
                        <p className="text-base">😀</p>
                        <p className="text-3xl text-[#2acd6d] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center grow text-center mr-3">
                      <div>
                        <p className="text-base">😐</p>
                        <p className="text-3xl text-[#fff44f] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center grow text-center mr-3">
                      <div>
                        <p className="text-base">🙁</p>
                        <p className="text-3xl text-[#ec5757] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 p-3">
                <div className="flex-1 bg-[#222] feedbackBlockShadow rounded-md p-5">
                  <p className="text-white text-center text-xl w-full mb-6">
                    Last Month
                  </p>
                  <div className="flex items-center justify-between grow">
                    <div className="flex justify-center grow text-center mr-3">
                      <div>
                        <p className="text-base">😀</p>
                        <p className="text-3xl text-[#2acd6d] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center grow text-center mr-3">
                      <div>
                        <p className="text-base">😐</p>
                        <p className="text-3xl text-[#fff44f] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center grow text-center mr-3">
                      <div>
                        <p className="text-base">🙁</p>
                        <p className="text-3xl text-[#ec5757] font-normal">
                          0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* bottom part */}
            <div className="flex flex-1 mb-3 -mx-3 -mt-3">
              <div className="flex flex-1 p-3">
                <div className="flex-1 bg-white feedbackBlockShadow rounded-md text-center p-5">
                  <p className="text-xl text-[#4a4a4a] mb-2">
                    Most 😀 on
                  </p>
                  <p className="text-3xl text-[#4a4a4a] font-medium">
                    Monday
                  </p>
                </div>
              </div>

              <div className="flex flex-1 p-3">
                <div className="flex-1 bg-white feedbackBlockShadow rounded-md text-center p-5">
                  <p className="text-xl text-[#4a4a4a] mb-2">
                    Most 😐 on
                  </p>
                  <p className="text-3xl text-[#4a4a4a] font-medium">
                    Day
                  </p>
                </div>
              </div>

              <div className="flex flex-1 p-3">
                <div className="flex-1 bg-white feedbackBlockShadow rounded-md text-center p-5">
                  <p className="text-xl text-[#4a4a4a] mb-2">
                    Most 🙁 on
                  </p>
                  <p className="text-3xl text-[#4a4a4a] font-medium">
                    Day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center">
        <div className="grow shrink-0 py-12 px-6">
          <div className="container grow w-auto relative my-0 mx-auto">
            <h2 className="text-xl text-[#363636] font-normal mb-6">
              Dashboard
            </h2>
            <div className="flex flex-wrap -m-3">
              <div className="w-1/3 p-3">
                <div className="text[#4a4a4a] bg-white rounded-md feedbackBlockShadow p-5">
                  <div className="flex items-baseline">
                    <div className="mr-4">
                      <p className="p-0 m-0">
                        <span>😀</span>
                      </p>
                    </div>
                    <div className="grow">
                      <p className="p-0 m-0">feedback</p>
                      <p className="text-right text-xs mt-2">
                        <a
                          href=""
                          className="text-[#4185f3] cursor-pointer no-underline"
                        >
                          Feedback name
                        </a>
                      </p>
                    </div>
                    <div className="ml-4">
                      <p className="p-0 m-0">
                        <span>
                          <DeleteSvg />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
