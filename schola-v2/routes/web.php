<?php

use App\Livewire\StudyDashboard;
use Illuminate\Support\Facades\Route;

Route::get('/', StudyDashboard::class)->name('dashboard');
