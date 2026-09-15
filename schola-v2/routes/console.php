<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('schola:status', function () {
    $this->info('Schola v2 is configured and ready.');
})->purpose('Check the Schola application command layer');
