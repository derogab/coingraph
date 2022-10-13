import React from 'react';

export const TIME = {
  HOUR: '1h',
  DAY: '1d',
  WEEK: '1w',
  MONTH: '1m',
};

const TimeChartContext = React.createContext({
  theme: TIME.WEEK
});

export default TimeChartContext;
