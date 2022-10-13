import React from 'react';

export const TIME = {
  HOUR: '1h',
  DAY: '1d',
  WEEK: '1W',
  MONTH: '1M',
};

const TimeChartContext = React.createContext({
  theme: TIME.WEEK
});

export default TimeChartContext;
