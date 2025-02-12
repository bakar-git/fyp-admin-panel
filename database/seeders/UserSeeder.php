<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Abu Bakar',
            'email' => 'bakar.git@gmail.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => null,
        ]);

        User::factory(10)
        ->sequence(fn ($sequence) => [
            'password' => bcrypt('12345678'),
            'created_at' => Carbon::now()->subDays(rand(1, 30))
                ->subHours(rand(1, 24))
                ->subMinutes(rand(1, 60)),
            'email_verified_at' => null,
        ])
        ->create();
    }
}
