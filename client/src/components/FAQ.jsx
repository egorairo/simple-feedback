import React from 'react'
import {Link} from 'react-router-dom'

export default function FAQ() {
  return (
    <div>
      <div>
        <section className="block py-36 px-6">
          <div className="container grow w-auto relative my-0 mx-auto">
            <div className="flex justify-center -mb-3">
              <div className="is-8-tablet column">
                <div className="text-xl	">
                  <h1 className="text-[40px] leading-[1.25em] text-[#363636] font-medium mb-1">
                    Frequently Asked Questions (FAQ)
                  </h1>
                  <h2
                    id="one-form-per-email-sent-vs-one-form-per-newsletter"
                    className="text-4xl text-[#363636] font-medium mb-5 mt-10"
                  >
                    Correct Use: One Form per Email Sent vs One Form
                    per Newsletter
                  </h2>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    I got asked a couple of times now how to use
                    FeedLetter - is it one form per email or one form
                    per newsletter.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    The intended use was one form per email you send
                    out. So, if you write twice a week, you create 2
                    forms a week, for each email one.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    <strong>Why?</strong> Because you get feedback on
                    the individual emails and learn which topics work
                    and which not. Also, the extended feedback is more
                    specific. The UI is designed for that with the
                    least clicks possible :-)
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    <strong>However</strong>, I know a couple of
                    customers use it differently with only one form
                    per newsletter. They still get their insights from
                    votes and extended feedback.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    I focus development on the intended use but will
                    not force you to use it. If the other way works
                    for you, go with it. I&#39;ll even support that
                    way as much as possible without breaking the
                    experience. Why? Because it&#39;s about you and I
                    want you to get the most out of FeedLetter.
                  </p>
                  <h2
                    id="how-do-i-know-who-downvoted"
                    className="text-4xl text-[#363636] font-medium mb-5 mt-10"
                  >
                    How Do I Know Who Downvoted?
                  </h2>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    It&#39;s tempting to know who downvoted or
                    dislikes your emails but know it might not help
                    you at all. If people don&#39;t tell you via an
                    anonymous form, something they feel safe, they
                    won&#39;t tell you when you email them.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    FeedLetter is driven by privacy, and I do not
                    track your or my readers. And readers love that.
                    They can tell you and me anonymously what they
                    liked or disliked and why. And some of them even
                    tell you who they are by filling out the optional
                    name field on the extended feedback page.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    Some even go so far and give you their email
                    address in the comment field. So, if they really
                    want to tell you who they are, they will do it.
                    Either via FeedLetter or simply by sending you an
                    email.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    You could try to track them via your email
                    provider&#39;s analytics, but that has some flaws
                    as those analytics cannot track everyone. And no,
                    they don&#39;t send along with an external link
                    who clicked on it. So, FeedLetter has no way to
                    know which user it was.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    Anyway, I encourage you to experiment with the
                    wording to get them to tell you their reasons.
                    It&#39;s all about trust, feeling safe, and
                    genuinely being heard.
                  </p>
                  <p className="mb-[1em] text-[#4a4a4a]">
                    You can customize all reader facing text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="block bg-[#fafafa] px-6 pt-12 pb-24">
        <div className="container grow w-auto relative my-0 mx-auto">
          <div className="flex justify-center -m-3">
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
                  <strong>Have questions?</strong> <br></br>Email me
                  at <br></br> egor.kryzhanouski@gmail.com
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
            <div className="column">
              <div className="text-right text-base text-[#4a4a4a]">
                <p>
                  Features: <br></br>{' '}
                  <a
                    href="#howItWorks"
                    className="mainColor cursor-pointer no-underline hover:text-[#466caa]"
                  >
                    Newsletter survey
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
