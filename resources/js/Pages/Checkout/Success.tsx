import { ContentLayout } from '@/components/layout/ContentLayout'
import { Link } from '@inertiajs/react'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

export default function Success() {
  const breadcrumbData = [
    { href: "/checkout/index", label: "Plans" },
    { href: "/checkout/success", label: "Payment Successful" },
  ];
  
  return (
    <ContentLayout items={breadcrumbData}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Thank you for your purchase. Your subscription has been activated successfully.
        </p>
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </ContentLayout>
  )
}
