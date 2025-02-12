import { ContentLayout } from '@/components/layout/ContentLayout'
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react'
import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'

export default function Cancel() {
  const breadcrumbData = [
    { href: "/checkout/index", label: "Plans" },
    { href: "/checkout/cancel", label: "Payment Canceled" },
  ];
  
  return (
    <ContentLayout items={breadcrumbData}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FaTimesCircle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Canceled</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Your payment was canceled. No charges were made to your account.
        </p>
        <div className="space-x-4">
          <Link
            href="/checkout"
          >
            <Button variant={'default'} size={'lg'}>Try Again</Button>
          </Link>
          <Link
            href="/plans"
          >
            <Button variant={'secondary'} size={'lg'}>View Plans</Button>
          </Link>
        </div>
      </div>
    </ContentLayout>
  )
}
