<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Subscription;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('id', '!=', auth()->user()->id)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'email_verified_at' => $user->email_verified_at,
                    'payment_status' => $user->subscribed(config('cashier.product_id')) ? 'active' : 'inactive',
                    'subscription_end' => $user->subscription(config('cashier.product_id')) ? 
                        $user->subscription(config('cashier.product_id'))->asStripeSubscription()->current_period_end : null
                ];
            });

        return Inertia::render('User/Index', [
            'allUsers' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        $validated['password'] = bcrypt($validated['password']);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        if (!$user){
            return inertia_location(route('users.index'));
        }
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
            'isCurrentUser' => false
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:8',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if (isset($validated['password'])) {
            $updateData['password'] = bcrypt($validated['password']);
        }

        $user->update($updateData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}
