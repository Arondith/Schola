<?php

namespace App\Jobs;

use App\Models\StudyTask;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class BuildStudyDigest implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $taskId) {}

    public function handle(): void
    {
        $task = StudyTask::find($this->taskId);

        if ($task) {
            Log::info('Study task queued for digest processing.', [
                'task_id' => $task->id,
                'subject' => $task->subject,
            ]);
        }
    }
}
