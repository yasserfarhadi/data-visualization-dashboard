import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Daily as DailyModel } from '@/types/dailyModel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Dots,
  WrapperWithIndex,
} from '@/components/ui/carousel';
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

import { Card, CardContent } from '@/components/ui/card';

const loading = (
  <div
    role="status"
    className="relative w-full p-4 rounded animate-pulse md:p-6"
  >
    <div className="flex justify-center mt-4">
      <div className="w-8 h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
    </div>
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 text-black ">
      Loading Data...
    </div>
  </div>
);

const Daily = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['Daily'],
    queryFn: async () => {
      // await new Promise((r) => setTimeout(r, 2000));
      return axios
        .get<DailyModel>(
          'https://min-api.cryptocompare.com/data/exchange/histohour?tsym=BTC&limit=10'
        )
        .then((data) => data.data.Data);
    },
  });

  const yAxisDomain = React.useMemo(() => {
    const fileteredData = data?.map((d) => d.volume) || [];
    const domain = [Math.min(...fileteredData), Math.max(...fileteredData)];
    const step = (domain[1] - domain[0]) / (5 - 1);
    return {
      domain,
      ticks: Array.from(
        { length: 5 },
        (v, i) => Math.round(+(domain[0] + i * step).toFixed(0) / 1000) * 1000
      ),
    };
  }, [data]);

  return (
    <div className="h-full w-72">
      <Card>
        <CardContent>
          {isLoading ? (
            loading
          ) : (
            <Carousel className="w-full pt-0 h-72">
              <CarouselContent className="w-full h-64">
                {data?.map((item) => (
                  <CarouselItem
                    key={item.time + item.volume}
                    className="flex flex-col items-center justify-center h-full p-0"
                  >
                    <WrapperWithIndex>
                      {(index) => {
                        return (
                          <div>
                            <h2 className="font-bold text-center ml-7">
                              Market volume of
                            </h2>
                            <h2 className="font-bold text-center ml-7">
                              {new Date(
                                data[index].time * 1000
                              ).toLocaleTimeString()}
                            </h2>
                          </div>
                        );
                      }}
                    </WrapperWithIndex>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={300}
                        height={200}
                        data={[item]}
                        margin={{
                          top: 0,
                          right: 30,
                          left: 10,
                          bottom: -15,
                        }}
                      >
                        <XAxis
                          dataKey=""
                          tickLine={false}
                          className="dont-show"
                        />
                        <YAxis
                          tickCount={5}
                          domain={yAxisDomain.domain}
                          ticks={yAxisDomain.ticks.slice(0, 5)}
                        />
                        <Tooltip />
                        <Bar
                          dataKey="volume"
                          fill="#11B89B"
                          activeBar={<Rectangle fill="#11B89B" stroke="blue" />}
                          barSize={15}
                          radius={4}
                        />
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={true}
                          vertical={false}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <Dots />
            </Carousel>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Daily;
Daily;
