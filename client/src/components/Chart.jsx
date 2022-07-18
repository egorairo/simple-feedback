import React from 'react'
import PropTypes from 'prop-types'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Chart({great, ok, bad}) {
  const pieChartData = {
    labels: ['😀', '😐', '🙁'],
    datasets: [
      {
        data: [great, ok, bad],
        label: 'Feedbacks People',
        backgroundColor: ['#2acd6d', '#fff34f', '#ed5756'],
        borderWidth: 0,
      },
    ],
  }

  const pieChart = (
    <Pie
      type="pie"
      width={100}
      height={30}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        title: {
          display: true,
          text: 'Feedbacks People',
          defaultFontSize: 20,
          responsive: true,
          maintainAspectRatio: false,
        },
        legend: {
          display: true,
        },
      }}
      data={pieChartData}
    />
  )
  return pieChart
}

Chart.propTypes = {
  great: PropTypes.number,
}

Chart.propTypes = {
  ok: PropTypes.number,
}

Chart.propTypes = {
  bad: PropTypes.number,
}
