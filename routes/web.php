<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
   return Inertia::render('Welcome');
});

Route::get('terms-of-service', function () {
   return Inertia::render('TermsOfService');
})->name('terms-of-service');


Route::middleware(['auth', 'verified'])->group(function () {

   Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware('can:manage-users');


   Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
   Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
   Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

   Route::group(['middleware' => 'can:manage-users'], function () {
      Route::get('users', [UserController::class, 'index'])->name('users.index');
      Route::get('users/{id}', [UserController::class, 'show'])->name('users.show');
      Route::post('users', [UserController::class, 'store'])->name('users.store');
      Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
      Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
   });


   


   Route::prefix('checkout')->middleware('can:view-plans')->group(function () {
      Route::get('/', [CheckoutController::class, 'checkout'])->name('checkout');
      Route::get('index', [CheckoutController::class, 'index'])->name('checkout.index');
      
      Route::get('success', [CheckoutController::class, 'success'])->name('checkout.success');

      Route::get('cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');
   });
});

require __DIR__ . '/auth.php';
