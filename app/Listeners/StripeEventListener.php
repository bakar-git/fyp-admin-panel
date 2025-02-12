<?php

namespace App\Listeners;

use App\Mail\PaymentReceived;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Events\WebhookReceived;

class StripeEventListener
{
    /**
     * Handle the event.
     */
    public function handle(WebhookReceived $event): void
    {
        Log::info('Stripe event received: ' . $event->payload['type']);
        if ($event->payload['type'] === 'invoice.payment_succeeded') {
            $payloadData = $event->payload['data']['object'];
            $email = $payloadData['customer_email'];
            $name = $payloadData['customer_name'];
            $invoice_url = $payloadData['hosted_invoice_url'];

            // Send email to admin
            Mail::to(User::find(1)->email)->send(new PaymentReceived($email, $name, $invoice_url));
            try {
                // Send email to customer
                Mail::to($email)->send(new PaymentReceived($email, $name, $invoice_url));
            } catch (\Exception $e) {
            }
        }
    }
}
