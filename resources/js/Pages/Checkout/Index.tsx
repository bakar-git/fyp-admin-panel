import { ContentLayout } from '@/components/layout/ContentLayout';
import { Head } from '@inertiajs/react';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import moment from 'moment';
import { CalendarDays, DollarSign, Clock, Activity } from "lucide-react"
import { PageProps } from '@/types';

interface SubscriptionData {
  status: string;
  current_period_end: number;
}
interface InvoiceData {
  id: string;
  total: string;
  date: string;
  downloadUrl: string;
}

export default function Index({ subscribed, subscriptionData, invoices }: PageProps<{ 
  subscribed: boolean,
  subscriptionData: SubscriptionData | null,
  invoices: InvoiceData[] | null
}>) {
  // Add calculations
  const calculateDaysRemaining = () => {
    if (!subscriptionData?.current_period_end) return 0;
    const now = moment();
    const endDate = moment.unix(subscriptionData.current_period_end);
    return Math.max(0, endDate.diff(now, 'days'));
  };

  const calculateTotalSpent = () => {
    if (!invoices) return 0;
    return invoices.reduce((total, invoice) => {
      const amount = parseFloat(invoice.total.replace('$', ''));
      return total + amount;
    }, 0).toFixed(2);
  };

  const calculateSubscriptionAge = () => {
    if (!invoices?.length) return 0;
    return invoices.length;
  };

  const breadcrumbData = [
    { href: "/checkout/index", label: "Plans" },
  ];

  return (
    <ContentLayout items={breadcrumbData}>
      <div className='space-y-4'>
        <Head title="Subscription" />
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Pricing Card - spans 2 rows */}
          <div className="lg:row-span-2">
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Premium Plan</CardTitle>
                <CardDescription className="text-4xl font-bold">
                  $5<span className="text-lg text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Unlimited access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">24/7 Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Premium Features</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {subscribed ? (
                  <div className="w-full space-y-2">
                    <div className="bg-accent text-accent-foreground px-3 py-2 rounded-lg font-medium text-center">
                      Subscribed - {subscriptionData?.status || 'Active'}
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      Next billing: {subscriptionData ? moment.unix(subscriptionData.current_period_end).format("DD MMM YYYY") : '-'}
                    </div>
                  </div>
                ) : (
                  <a href="/checkout" className='w-full'>
                    <Button className="w-full" variant={'default'}>Subscribe Now</Button>
                  </a>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* Stats Cards - first row */}
          <div className="lg:col-start-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribed ? calculateDaysRemaining() : '-'}</div>
                <p className="text-xs text-muted-foreground">days until next billing</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-start-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribed ? `$${calculateTotalSpent()}` : '$0'}</div>
                <p className="text-xs text-muted-foreground">lifetime value</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-start-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscription Age</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribed ? calculateSubscriptionAge() : '0'}</div>
                <p className="text-xs text-muted-foreground">months as member</p>
              </CardContent>
            </Card>
          </div>

          {/* Billing History - spans 3 columns in second row */}
          <div className="lg:col-start-2 lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Your past invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribed && invoices ? (
                      invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.total}</TableCell>
                          <TableCell className="text-right">
                            <a 
                              href={invoice.downloadUrl}
                              target="_blank"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Download
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No billing history available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
