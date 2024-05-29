import React from 'react';
import { useCharts } from '@/cotext/useCharts';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { useQueryClient } from '@tanstack/react-query';
import { getHours } from '@/lib/utils';
import { Datum } from '@/types/hourlyModel';

const Filters = () => {
  const { chartState, changeHandler } = useCharts();
  const queryClient = useQueryClient();
  const [data, setData] = React.useState<Datum[]>();
  React.useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      const query: Datum[] | undefined = queryClient.getQueryData(['hourly']);
      setData(query);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-lg font-bold">Indexes</h2>
        <div className="flex justify-between p-5">
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="higher"
                defaultChecked={chartState.higher}
                onCheckedChange={changeHandler.bind(null, 'higher')}
                className="data-[state=checked]:bg-[#11B89B] data-[state=checked]:text-primary-foreground"
              />
              <label
                htmlFor="higher"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Higher
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="average"
                defaultChecked={chartState.average}
                onCheckedChange={changeHandler.bind(null, 'average')}
                className="data-[state=checked]:bg-[#FFD966] data-[state=checked]:text-primary-foreground"
              />
              <label
                htmlFor="average"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Average
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lower"
                defaultChecked={chartState.lower}
                className="data-[state=checked]:bg-[#F24B4B] data-[state=checked]:text-primary-foreground"
                onCheckedChange={changeHandler.bind(null, 'lower')}
              />
              <label
                htmlFor="lower"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lower
              </label>
            </div>
          </div>
          {data && (
            <div className="flex justify-around flex-grow font-semibold">
              <div className="text-[#11B89B]">
                <p>
                  Maximum Range: {Math.min(...data.map((item) => item.high))} to{' '}
                  {Math.max(...data.map((item) => item.high))}
                </p>
                <p>
                  <b>{getHours(data[0].time)}</b> to
                  <b>{getHours(data[data.length - 1].time)}</b>
                </p>
              </div>
              <div className="text-[#F24B4B]">
                <p>
                  Minimum Range: {Math.min(...data.map((item) => item.low))} to{' '}
                  {Math.max(...data.map((item) => item.low))}
                </p>
                <p>
                  <b>{getHours(data[0].time)}</b> to
                  <b>{getHours(data[data.length - 1].time)}</b>
                </p>
              </div>
            </div>
          )}
          {/* <button onClick={() => changeHandler('higher')}>Higher</button>
          <button onClick={() => changeHandler('average')}>Average</button>
          <button onClick={() => changeHandler('lower')}>Lower</button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default Filters;
