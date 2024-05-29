import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Hourly as HourlyModel } from '@/types/hourlyModel';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getHours } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useCharts } from '@/cotext/useCharts';

const loading = (
  <div
    role="status"
    className="relative w-full p-4 rounded animate-pulse md:p-6"
  >
    <div className="flex items-baseline mt-4">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={`w-full bg-gray-200 rounded-t-lg h-${
            [36, 56, 40, 44, 56, 20, 40][Math.floor(Math.random() * 7)]
          } ms-6 dark:bg-gray-700`}
        ></div>
      ))}
    </div>
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 text-black ">
      Loading Data...
    </div>
  </div>
);

const Hourly = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['hourly'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 2000));
      return axios
        .get<HourlyModel>(
          'https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10'
        )
        .then((data) => data.data.Data.Data)
        .then((data) =>
          data.map((item) => ({
            ...item,
            average: ((item.high + item.low) / 2).toFixed(2),
            hour: getHours(item.time),
          }))
        );
    },
  });
  const { chartState } = useCharts();
  return (
    <div className="w-full h-72">
      <Card>
        <CardContent>
          {isLoading
            ? loading
            : data && (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="hour" tickLine={false} />
                      <YAxis
                        // tickLine={false}
                        tickCount={5}
                        // ticks={(ticks: string | any[]) => ticks.slice(1, -1)}
                        // tickFormatter={(tick) => {
                        //   console.log(tick);
                        //   return tick === 0 || tick === 80000 ? null : tick;
                        // }}
                        // domain={['dataMin', 'dataMax']}
                        // ticks={[]}
                      />
                      <Tooltip />
                      {chartState.higher && (
                        <Bar
                          dataKey="high"
                          fill="#11B89B"
                          activeBar={<Rectangle fill="#11B89B" stroke="blue" />}
                          barSize={10}
                          radius={3}
                        />
                      )}
                      {chartState.average && (
                        <Bar
                          dataKey="average"
                          fill="#FFD966"
                          activeBar={<Rectangle fill="#FFD966" stroke="blue" />}
                          barSize={10}
                          radius={3}
                        />
                      )}
                      {chartState.lower && (
                        <Bar
                          dataKey="low"
                          fill="#F24B4B"
                          activeBar={
                            <Rectangle fill="#F24B4B" stroke="purple" />
                          }
                          barSize={10}
                          radius={3}
                        />
                      )}
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Hourly;
