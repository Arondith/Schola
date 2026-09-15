<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyTask extends Model
{
    protected $fillable = [
        'title',
        'subject',
        'priority',
        'due_at',
        'completed',
    ];

    protected function casts(): array
    {
        return [
            'due_at' => 'datetime',
            'completed' => 'boolean',
        ];
    }
}
