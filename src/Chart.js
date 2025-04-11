import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#A28DD0', 
  '#4B0082'  
];

const renderCustomizedLabel = ({ name, percent }) => {

  const labels = {
    'USD': 'Dólar',
    'BTC': 'Bitcoin'
  };
  
  return `${labels[name] || name}: ${(percent * 100).toFixed(2)}%`;
};

const Chart = ({ dataBarChart }) => (
  <div className="chart-container">
    <PieChart width={600} height={400}>
      <Legend layout="horizontal" verticalAlign="top" align="center" />
      <Pie
        data={dataBarChart}
        dataKey="valor"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label={renderCustomizedLabel}
      >
        {dataBarChart.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
    </PieChart>
  </div>
);

export default Chart;