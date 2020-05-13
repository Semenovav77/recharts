import React, { Component } from "react";
import "./styles.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const findDot = nameDot => {
  let sum = 0;
  data.forEach(el => {
    sum += el[nameDot];
    console.log(sum);
  });
  let avg = sum / data.length;
  console.log(avg);
  let powSum = 0;
  data.forEach(el => {
    powSum += Math.pow(el[nameDot] - avg, 2);
  });
  let stddev = Math.sqrt(powSum / (data.length - 1));
  console.log(stddev);
  const newData = data.map(item => {
    return (
      (item[nameDot] < avg - stddev || item[nameDot] > avg + stddev) &&
      item[nameDot]
    );
  });
  return newData;
};
const dotUv = findDot("uv");
console.log(dotUv);
const dotPv = findDot("pv");
console.log(dotPv);

class SimpleLineChart extends Component {
  render() {
    return (
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          dot={<CustomizedDot />}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          dot={<CustomizedDot />}
        />
      </LineChart>
    );
  }
}
class CustomizedDot extends Component {
  render() {
    const { cx, cy, value } = this.props;

    if (dotPv.indexOf(value) !== -1) {
      return <circle cx={cx} cy={cy} r={8} strokeWidth={3} fill="red" />;
    }
    if (dotUv.indexOf(value) !== -1) {
      return <circle cx={cx} cy={cy} r={7} strokeWidth={3} fill="#d21502" />;
    }
    return <div />;
  }
}

export default function App() {
  return <SimpleLineChart />;
}
