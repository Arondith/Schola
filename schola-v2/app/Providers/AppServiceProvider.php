<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind application services here.
    }

    public function boot(): void
    {
        // Production bootstrapping hooks can be added here.
    }
}
