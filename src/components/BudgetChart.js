// src/components/BudgetChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Import and register Chart.js components
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetChart = ({ transactions, budget }) => {
  // Calculate total expenses
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ['Budget', 'Expenses'],
    datasets: [
      {
        label: 'Budget vs. Expenses',
        data: [budget, totalExpenses],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(budget, totalExpenses) + 100,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BudgetChart;
