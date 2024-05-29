import React from 'react';
import { context, Charts, initialValue } from './useCharts';

export const ChartsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [chartState, setChartState] = React.useState<Charts>(initialValue);

  const changeHandler = React.useCallback((key: keyof Charts) => {
    setChartState((prev) => {
      const isOneLeft = Object.keys(prev).reduce(
        (a, b) => (prev[b as keyof Charts] ? a + 1 : a),
        0
      );
      if (isOneLeft === 1 && prev[key]) return prev;
      return { ...prev, [key]: !prev[key] };
    });
  }, []);

  return (
    <context.Provider value={{ chartState, changeHandler }}>
      {children}
    </context.Provider>
  );
};
