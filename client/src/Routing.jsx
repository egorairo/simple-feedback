import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import NewsletterSurveyCreatePage from './pages/NewsletterSurveyCreatePage'
import FeedbackPage from './pages/FeedbackPage'
import GiveFeedbackPage from './pages/GiveFeedbackPage'
import FeedbacksPage from './pages/FeedbacksPage'
import DefaultSurveyPage from './pages/DefaultSurveyPage'
import FAQPage from './pages/FAQPage'

export default function Routing() {
  const location = useLocation()

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage path={location.pathname} />}
      />
      <Route
        path="/login"
        element={<LoginPage path={location.pathname} />}
      />
      <Route
        path="/register"
        element={<RegisterPage path={location.pathname} />}
      />
      <Route
        path="/dashboard"
        element={<DashboardPage path={location.pathname} />}
      />
      <Route
        path="/feedback/create"
        element={
          <NewsletterSurveyCreatePage path={location.pathname} />
        }
      />
      <Route
        path="/feedbacks"
        element={<FeedbacksPage path={location.pathname} />}
      />
      <Route
        path="/feedback/:id"
        element={<FeedbackPage path={location.pathname} />}
      />
      <Route
        path="/feedback/give/:num/:id"
        element={<GiveFeedbackPage path={location.pathname} />}
      />
      <Route
        path="/account/default"
        element={<DefaultSurveyPage path={location.pathname} />}
      />
      <Route
        path="/faq"
        element={<FAQPage path={location.pathname} />}
      />
    </Routes>
  )
}
