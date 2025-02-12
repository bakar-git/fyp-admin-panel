import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import moment from "moment";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export interface EarningsChartData { 
  date: string;
  earnings: number;
}

export default function EarningsChart({ earningsChartData } : { earningsChartData: EarningsChartData[] }) {
  const [timeRange, setTimeRange] = React.useState("currentMonth")

  const filteredData = earningsChartData.filter((item) => {
    const date = moment(item.date)
    const now = moment()
    const currentYear = now.year()
    const currentMonth = now.month()

    switch (timeRange) {
      case "currentMonth":
        return date.year() === currentYear && date.month() === currentMonth
      case "lastMonth":
        const lastMonth = now.clone().subtract(1, 'month')
        return date.year() === lastMonth.year() && date.month() === lastMonth.month()
      case "currentYear":
        return date.year() === currentYear
      case "lastYear":
        return date.year() === currentYear - 1
      default:
        return true
    }
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>
            Showing total earnings over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Current Month" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="currentMonth" className="rounded-lg">
              Current Month
            </SelectItem>
            <SelectItem value="lastMonth" className="rounded-lg">
              Last Month
            </SelectItem>
            <SelectItem value="currentYear" className="rounded-lg">
              Current Year
            </SelectItem>
            <SelectItem value="lastYear" className="rounded-lg">
              Last Year
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-earnings)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-earnings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="earnings"
              type="natural"
              fill="url(#fillEarnings)"
              stroke="var(--color-earnings)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
