import React from 'react'
import PropTypes from 'prop-types'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function DashboardChart({
  surveys,
  greatFeedbacks,
  okFeedbacks,
  badFeedbacks,
}) {
  const formNames = surveys.map((survey) => survey.names.formName)
  const surveyIds = surveys.map(({id}) => id)

  const great = surveyIds.map((uniqueId) => {
    return greatFeedbacks.filter(({id}) => {
      if (uniqueId === id) {
        return id
      }
    }).length
  })

  const ok = surveyIds.map((uniqueId) => {
    return okFeedbacks.filter(({id}) => {
      if (uniqueId === id) {
        return id
      }
    }).length
  })

  const bad = surveyIds.map((uniqueId) => {
    return badFeedbacks.filter(({id}) => {
      if (uniqueId === id) {
        return id
      }
    }).length
  })

  const data = {
    labels: formNames,
    datasets: [
      {
        label: '😀',
        data: great,
        backgroundColor: '#2acd6d',
        barThickness: 20,
      },
      {
        label: '😐',
        data: ok,
        backgroundColor: '#fff34f',
        barThickness: 20,
      },
      {
        label: '🙁',
        data: bad,
        backgroundColor: '#ed5756',
        barThickness: 20,
      },
    ],
  }

  const verticalChart = (
    <Bar
      className="canvas"
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            stacked: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
      }}
      data={data}
    />
  )

  return verticalChart
}

DashboardChart.propTypes = {
  surveys: PropTypes.array,
}

DashboardChart.propTypes = {
  greatFeedbacks: PropTypes.array,
}

DashboardChart.propTypes = {
  okFeedbacks: PropTypes.array,
}

DashboardChart.propTypes = {
  badFeedbacks: PropTypes.array,
}
