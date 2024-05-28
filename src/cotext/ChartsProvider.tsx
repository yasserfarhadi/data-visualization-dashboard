import React from 'react';

interface Charts {
  higher: boolean;
  average: boolean;
  lower: boolean;
}

const initialValue = {
  higher: true,
  average: true,
  lower: true,
};

type ContextType = {
  chartState: Charts;
  changeHandler: (key: keyof Charts, value: boolean) => void;
};

const context = React.createContext<ContextType | null>(null);

export const useCharts = () => React.useContext(context);

export const ChartsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [chartState, setChartState] = React.useState<Charts>(initialValue);

  const changeHandler = React.useCallback(
    (key: keyof Charts, value: boolean) => {
      setChartState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <context.Provider value={{ chartState, changeHandler }}>
      {children}
    </context.Provider>
  );
};
