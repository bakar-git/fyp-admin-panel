<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'manage-users']);
        Permission::create(['name' => 'view-plans']);

        Role::where('name', 'admin')->first()->givePermissionTo('manage-users');
        Role::where('name', 'user')->first()->givePermissionTo('view-plans');
    }
}
