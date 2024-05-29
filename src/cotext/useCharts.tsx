import React from 'react';

export interface Charts {
  higher: boolean;
  average: boolean;
  lower: boolean;
}
export const initialValue = {
  higher: true,
  average: true,
  lower: true,
};

type ContextType = {
  chartState: Charts;
  changeHandler: (key: keyof Charts) => void;
};

export const context = React.createContext<ContextType>({
  chartState: initialValue,
  changeHandler: () => {},
});

export const useCharts = () => React.useContext(context);
