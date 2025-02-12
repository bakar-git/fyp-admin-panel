<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $subscribed = $user->subscribed(config('cashier.product_id'));
        
        $subscriptionData = null;
        $invoicesData = $user->invoices()->map(function ($invoice) {
            return [
                'id' => $invoice->id,
                'total' => $invoice->total(),
                'date' => $invoice->date()->toFormattedDateString(),
                'downloadUrl' => $invoice->hosted_invoice_url,
            ];
        });

        if ($subscribed) {
            $subscription = $user->subscription(config('cashier.product_id'));
            $subscriptionData = [
                'status' => $subscription->stripe_status,
                'current_period_end' => $subscription->asStripeSubscription()->current_period_end,
                'start_date' => $subscription->created_at->format('M d, Y'),
            ];
        }

        return Inertia::render('Checkout/Index', [
            'subscribed' => $subscribed,
            'subscriptionData' => $subscriptionData,
            'invoices' => $invoicesData,
            'isCurrentUser' => true
        ]);
    }

    public function checkout()
    {
        if (Auth::user()->subscribed(config('cashier.product_id'))) {
            return redirect()->route('checkout.index');
        }
        return Auth::user()
        ->newSubscription(config('cashier.product_id'), config('cashier.price_id'))
        ->checkout([
            'success_url' => route('checkout.success'),
            'cancel_url' => route('checkout.cancel'),
        ]);
    }

    public function success()
    {
        return Inertia::render('Checkout/Success');
    }


    public function cancel()
    {
        return Inertia::render('Checkout/Cancel');
    }
}
