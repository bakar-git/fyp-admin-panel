<x-mail::message>
# Payment Confirmation

Dear {{ $name }},

Thank you for your payment! Your transaction has been successfully processed.

<x-mail::panel>
Your invoice is now available for download. Click the button below to view and download your invoice.
</x-mail::panel>

<x-mail::button :url="$url">
View Invoice
</x-mail::button>

If you have any questions about your payment, please don't hesitate to contact our support team.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
