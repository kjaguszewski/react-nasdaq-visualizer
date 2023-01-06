import React from 'react'
import { TimeSeries } from '../../types/TimeSeries'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: TimeSeries;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  pointRadius: 0,
  lineBorderColor: 'rgb(53, 162, 235)'
};

const TimeSeriesChart = ({ data }: Props) => {
  return (
    <Line options={options} data={data} />
  )
}

export default TimeSeriesChart