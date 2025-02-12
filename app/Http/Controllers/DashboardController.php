<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private $chartData = [
        ["date" => "2024-01-15", "earnings" => 365],
        ["date" => "2024-01-30", "earnings" => 375],
        
        ["date" => "2024-02-01", "earnings" => 360],
        ["date" => "2024-02-02", "earnings" => 340],
        ["date" => "2024-02-03", "earnings" => 370],
        ["date" => "2024-02-04", "earnings" => 390],
        ["date" => "2024-02-05", "earnings" => 410],
        ["date" => "2024-02-06", "earnings" => 420],
        ["date" => "2024-02-07", "earnings" => 430],
        ["date" => "2024-02-08", "earnings" => 390],
        ["date" => "2024-02-09", "earnings" => 370],
        ["date" => "2024-02-10", "earnings" => 350],
        ["date" => "2024-02-11", "earnings" => 390],
        ["date" => "2024-02-12", "earnings" => 410],
        ["date" => "2024-02-13", "earnings" => 420],
        ["date" => "2024-02-14", "earnings" => 430],
        ["date" => "2024-02-15", "earnings" => 410],
        ["date" => "2024-02-16", "earnings" => 395],
        ["date" => "2024-02-17", "earnings" => 380],
        ["date" => "2024-02-18", "earnings" => 370],
        ["date" => "2024-02-19", "earnings" => 390],
        ["date" => "2024-02-20", "earnings" => 420],
        ["date" => "2024-02-21", "earnings" => 430],
        ["date" => "2024-02-22", "earnings" => 440],
        ["date" => "2024-02-23", "earnings" => 450],
        ["date" => "2024-02-24", "earnings" => 420],
        ["date" => "2024-02-25", "earnings" => 410],
        ["date" => "2024-02-26", "earnings" => 400],
        ["date" => "2024-02-27", "earnings" => 390],
        ["date" => "2024-02-28", "earnings" => 430],
        
        ["date" => "2024-03-10", "earnings" => 445],
        ["date" => "2024-03-20", "earnings" => 460],
        ["date" => "2024-03-31", "earnings" => 470],
        
        ["date" => "2024-04-05", "earnings" => 480],
        ["date" => "2024-04-15", "earnings" => 490],
        ["date" => "2024-04-25", "earnings" => 500],
        
        ["date" => "2024-05-10", "earnings" => 520],
        ["date" => "2024-05-20", "earnings" => 510],
        ["date" => "2024-05-30", "earnings" => 530],
        
        ["date" => "2024-06-01", "earnings" => 540],
        ["date" => "2024-06-15", "earnings" => 550],
        ["date" => "2024-06-30", "earnings" => 560],
        
        ["date" => "2024-07-10", "earnings" => 580],
        ["date" => "2024-07-20", "earnings" => 590],
        ["date" => "2024-07-31", "earnings" => 600],
        
        ["date" => "2024-08-05", "earnings" => 610],
        ["date" => "2024-08-15", "earnings" => 620],
        ["date" => "2024-08-25", "earnings" => 630],
        
        ["date" => "2024-09-10", "earnings" => 640],
        ["date" => "2024-09-20", "earnings" => 650],
        ["date" => "2024-09-30", "earnings" => 660],
        
        ["date" => "2024-10-05", "earnings" => 670],
        ["date" => "2024-10-15", "earnings" => 680],
        ["date" => "2024-10-25", "earnings" => 690],
        
        ["date" => "2024-11-10", "earnings" => 700],
        ["date" => "2024-11-20", "earnings" => 710],
        ["date" => "2024-11-30", "earnings" => 720],
        
        ["date" => "2024-12-15", "earnings" => 730],
        ["date" => "2024-12-30", "earnings" => 750],
        
        ["date" => "2025-01-01", "earnings" => 400],
        ["date" => "2025-01-02", "earnings" => 370],
        ["date" => "2025-01-03", "earnings" => 390],
        ["date" => "2025-01-04", "earnings" => 410],
        ["date" => "2025-01-05", "earnings" => 420],
        ["date" => "2025-01-06", "earnings" => 390],
        ["date" => "2025-01-07", "earnings" => 380],
        ["date" => "2025-01-08", "earnings" => 400],
        ["date" => "2025-01-09", "earnings" => 420],
        ["date" => "2025-01-10", "earnings" => 430],
        ["date" => "2025-01-11", "earnings" => 410],
        ["date" => "2025-01-12", "earnings" => 390],
        ["date" => "2025-01-13", "earnings" => 370],
        ["date" => "2025-01-14", "earnings" => 420],
        ["date" => "2025-01-15", "earnings" => 380],
        ["date" => "2025-01-16", "earnings" => 400],
        ["date" => "2025-01-17", "earnings" => 420],
        ["date" => "2025-01-18", "earnings" => 450],
        ["date" => "2025-01-19", "earnings" => 410],
        ["date" => "2025-01-20", "earnings" => 380],
        ["date" => "2025-01-21", "earnings" => 420],
        ["date" => "2025-01-22", "earnings" => 390],
        ["date" => "2025-01-23", "earnings" => 410],
        ["date" => "2025-01-24", "earnings" => 450],
        ["date" => "2025-01-25", "earnings" => 460],
        ["date" => "2025-01-26", "earnings" => 420],
        ["date" => "2025-01-27", "earnings" => 410],
        ["date" => "2025-01-28", "earnings" => 380],
        ["date" => "2025-01-29", "earnings" => 390],
        ["date" => "2025-01-30", "earnings" => 400],
        ["date" => "2025-01-31", "earnings" => 420],
        
        ["date" => "2025-02-01", "earnings" => 420],
        ["date" => "2025-02-02", "earnings" => 395],
        ["date" => "2025-02-03", "earnings" => 410],
        ["date" => "2025-02-04", "earnings" => 380],
        ["date" => "2025-02-05", "earnings" => 460],
        ["date" => "2025-02-06", "earnings" => 435],
        ["date" => "2025-02-07", "earnings" => 470],
        ["date" => "2025-02-08", "earnings" => 390],
        ["date" => "2025-02-09", "earnings" => 410],
        ["date" => "2025-02-10", "earnings" => 430],
        ["date" => "2025-02-11", "earnings" => 450],
        ["date" => "2025-02-12", "earnings" => 420],
        ["date" => "2025-02-13", "earnings" => 395],
        ["date" => "2025-02-14", "earnings" => 380],
        ["date" => "2025-02-15", "earnings" => 460],
        ["date" => "2025-02-16", "earnings" => 475],
        ["date" => "2025-02-17", "earnings" => 420],
        ["date" => "2025-02-18", "earnings" => 410],
        ["date" => "2025-02-19", "earnings" => 435],
        ["date" => "2025-02-20", "earnings" => 480],
        ["date" => "2025-02-21", "earnings" => 390],
        ["date" => "2025-02-22", "earnings" => 410],
        ["date" => "2025-02-23", "earnings" => 430],
        ["date" => "2025-02-24", "earnings" => 450],
        ["date" => "2025-02-25", "earnings" => 460],
        ["date" => "2025-02-26", "earnings" => 440],
        ["date" => "2025-02-27", "earnings" => 410],
        ["date" => "2025-02-28", "earnings" => 475]
    ];
    private $recentUsers = [
        [
            "id" => 9,
            "name" => "James Taylor",
            "email" => "james@example.com",
            "avatar" => "/avatars/4.png",
            "paymentStatus" => "paid",
            "createdAt" => "2025-02-08",
        ],
        [
            "id" => 4,
            "name" => "Emily Davis",
            "email" => "emily@example.com",
            "avatar" => "/avatars/4.png",
            "paymentStatus" => "overdue",
            "createdAt" => "2025-01-25",
        ],
        [
            "id" => 1,
            "name" => "John Doe",
            "email" => "john@example.com",
            "avatar" => "/avatars/1.png",
            "paymentStatus" => "paid",
            "createdAt" => "2025-01-15",
        ],
        [
            "id" => 10,
            "name" => "Michelle Martinez",
            "email" => "michelle@example.com",
            "avatar" => "/avatars/5.png",
            "paymentStatus" => "pending",
            "createdAt" => "2024-02-10",
        ],
        [
            "id" => 8,
            "name" => "Lisa Anderson",
            "email" => "lisa@example.com",
            "avatar" => "/avatars/3.png",
            "paymentStatus" => "cancelled",
            "createdAt" => "2024-02-07",
        ],
        [
            "id" => 7,
            "name" => "David Lee",
            "email" => "david@example.com",
            "avatar" => "/avatars/2.png",
            "paymentStatus" => "paid",
            "createdAt" => "2024-02-05",
        ],
    ];
    public function index()
    {
        return Inertia::render('Dashboard/Dashboard', [
            "earningsChartData" => $this->chartData,
            "recentUserTableData" => $this->recentUsers
        ]);
    }
}
