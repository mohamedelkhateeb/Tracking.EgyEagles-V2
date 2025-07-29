'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', distance: 222, fuel: 150 },
  { date: '2024-04-02', distance: 97, fuel: 180 },
  { date: '2024-04-03', distance: 167, fuel: 120 },
  { date: '2024-04-04', distance: 242, fuel: 260 },
  { date: '2024-04-05', distance: 373, fuel: 290 },
  { date: '2024-04-06', distance: 301, fuel: 340 },
  { date: '2024-04-07', distance: 245, fuel: 180 },
  { date: '2024-04-08', distance: 409, fuel: 320 },
  { date: '2024-04-09', distance: 59, fuel: 110 },
  { date: '2024-04-10', distance: 261, fuel: 190 },
  { date: '2024-04-11', distance: 327, fuel: 350 },
  { date: '2024-04-12', distance: 292, fuel: 210 },
  { date: '2024-04-13', distance: 342, fuel: 380 },
  { date: '2024-04-14', distance: 137, fuel: 220 },
  { date: '2024-04-15', distance: 120, fuel: 170 },
  { date: '2024-04-16', distance: 138, fuel: 190 },
  { date: '2024-04-17', distance: 446, fuel: 360 },
  { date: '2024-04-18', distance: 364, fuel: 410 },
  { date: '2024-04-19', distance: 243, fuel: 180 },
  { date: '2024-04-20', distance: 89, fuel: 150 },
  { date: '2024-04-21', distance: 137, fuel: 200 },
  { date: '2024-04-22', distance: 224, fuel: 170 },
  { date: '2024-04-23', distance: 138, fuel: 230 },
  { date: '2024-04-24', distance: 387, fuel: 290 },
  { date: '2024-04-25', distance: 215, fuel: 250 },
  { date: '2024-04-26', distance: 75, fuel: 130 },
  { date: '2024-04-27', distance: 383, fuel: 420 },
  { date: '2024-04-28', distance: 122, fuel: 180 },
  { date: '2024-04-29', distance: 315, fuel: 240 },
  { date: '2024-04-30', distance: 454, fuel: 380 },
  { date: '2024-05-01', distance: 165, fuel: 220 },
  { date: '2024-05-02', distance: 293, fuel: 310 },
  { date: '2024-05-03', distance: 247, fuel: 190 },
  { date: '2024-05-04', distance: 385, fuel: 420 },
  { date: '2024-05-05', distance: 481, fuel: 390 },
  { date: '2024-05-06', distance: 498, fuel: 520 },
  { date: '2024-05-07', distance: 388, fuel: 300 },
  { date: '2024-05-08', distance: 149, fuel: 210 },
  { date: '2024-05-09', distance: 227, fuel: 180 },
  { date: '2024-05-10', distance: 293, fuel: 330 },
  { date: '2024-05-11', distance: 335, fuel: 270 },
  { date: '2024-05-12', distance: 197, fuel: 240 },
  { date: '2024-05-13', distance: 197, fuel: 160 },
  { date: '2024-05-14', distance: 448, fuel: 490 },
  { date: '2024-05-15', distance: 473, fuel: 380 },
  { date: '2024-05-16', distance: 338, fuel: 400 },
  { date: '2024-05-17', distance: 499, fuel: 420 },
  { date: '2024-05-18', distance: 315, fuel: 350 },
  { date: '2024-05-19', distance: 235, fuel: 180 },
  { date: '2024-05-20', distance: 177, fuel: 230 },
  { date: '2024-05-21', distance: 82, fuel: 140 },
  { date: '2024-05-22', distance: 81, fuel: 120 },
  { date: '2024-05-23', distance: 252, fuel: 290 },
  { date: '2024-05-24', distance: 294, fuel: 220 },
  { date: '2024-05-25', distance: 201, fuel: 250 },
  { date: '2024-05-26', distance: 213, fuel: 170 },
  { date: '2024-05-27', distance: 420, fuel: 460 },
  { date: '2024-05-28', distance: 233, fuel: 190 },
  { date: '2024-05-29', distance: 78, fuel: 130 },
  { date: '2024-05-30', distance: 340, fuel: 280 },
  { date: '2024-05-31', distance: 178, fuel: 230 },
  { date: '2024-06-01', distance: 178, fuel: 200 },
  { date: '2024-06-02', distance: 470, fuel: 410 },
  { date: '2024-06-03', distance: 103, fuel: 160 },
  { date: '2024-06-04', distance: 439, fuel: 380 },
  { date: '2024-06-05', distance: 88, fuel: 140 },
  { date: '2024-06-06', distance: 294, fuel: 250 },
  { date: '2024-06-07', distance: 323, fuel: 370 },
  { date: '2024-06-08', distance: 385, fuel: 320 },
  { date: '2024-06-09', distance: 438, fuel: 480 },
  { date: '2024-06-10', distance: 155, fuel: 200 },
  { date: '2024-06-11', distance: 92, fuel: 150 },
  { date: '2024-06-12', distance: 492, fuel: 420 },
  { date: '2024-06-13', distance: 81, fuel: 130 },
  { date: '2024-06-14', distance: 426, fuel: 380 },
  { date: '2024-06-15', distance: 307, fuel: 350 },
  { date: '2024-06-16', distance: 371, fuel: 310 },
  { date: '2024-06-17', distance: 475, fuel: 520 },
  { date: '2024-06-18', distance: 107, fuel: 170 },
  { date: '2024-06-19', distance: 341, fuel: 290 },
  { date: '2024-06-20', distance: 408, fuel: 450 },
  { date: '2024-06-21', distance: 169, fuel: 210 },
  { date: '2024-06-22', distance: 317, fuel: 270 },
  { date: '2024-06-23', distance: 480, fuel: 530 },
  { date: '2024-06-24', distance: 132, fuel: 180 },
  { date: '2024-06-25', distance: 141, fuel: 190 },
  { date: '2024-06-26', distance: 434, fuel: 380 },
  { date: '2024-06-27', distance: 448, fuel: 490 },
  { date: '2024-06-28', distance: 149, fuel: 200 },
  { date: '2024-06-29', distance: 103, fuel: 160 },
  { date: '2024-06-30', distance: 446, fuel: 400 },
];

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  distance: {
    label: 'Distence',
    color: 'hsl(var(--chart-1))',
  },
  fuel: {
    label: ' Fuel Consumption',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('distance');

  const total = React.useMemo(
    () => ({
      distance: chartData.reduce((acc, curr) => acc + curr.distance, 0),
      fuel: chartData.reduce((acc, curr) => acc + curr.fuel, 0),
    }),
    [],
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Interactive Vehicles Bar Chart</CardTitle>
          <CardDescription>Showing total Vehiles for the last 1 months</CardDescription>
        </div>
        <div className="flex">
          {['distance', 'fuel'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">{total[key as keyof typeof total].toLocaleString()}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
