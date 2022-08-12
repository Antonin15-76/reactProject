import React from 'react'
import HighchartsReact from 'highcharts-react-official'

const BarChart = ({ options, highcharts }) => <HighchartsReact
  highcharts={highcharts}
  constructorType={'chart'}
  options={options}
/>
export default BarChart