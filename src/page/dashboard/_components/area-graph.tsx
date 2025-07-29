'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
  { month: 'January', VehicleMaintenance: 186, fixed: 80 },
  { month: 'February', VehicleMaintenance: 305, fixed: 200 },
  { month: 'March', VehicleMaintenance: 237, fixed: 120 },
  { month: 'April', VehicleMaintenance: 73, fixed: 190 },
  { month: 'May', VehicleMaintenance: 209, fixed: 130 },
  { month: 'June', VehicleMaintenance: 214, fixed: 140 },
];

const chartConfig = {
  VehicleMaintenance: {
    label: 'Maintenance',
    color: 'hsl(var(--chart-1))',
  },
  fixed: {
    label: 'Fixed',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Maintenance and Fixed Vehicles</CardTitle>
        <CardDescription>Showing total Vehicles states for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[310px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="fixed" type="natural" fill="var(--color-fixed)" fillOpacity={0.4} stroke="var(--color-fixed)" stackId="a" />
            <Area dataKey="VehicleMaintenance" type="natural" fill="var(--color-VehicleMaintenance)" fillOpacity={0.4} stroke="var(--color-VehicleMaintenance)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Increased up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
