<?php

namespace App\Livewire;

use App\Jobs\BuildStudyDigest;
use App\Models\StudyTask;
use Livewire\Component;

class StudyDashboard extends Component
{
    public string $title = '';
    public string $subject = '';
    public string $priority = 'medium';
    public ?string $dueAt = null;
    public string $filter = 'all';

    protected function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'subject' => ['required', 'string', 'max:80'],
            'priority' => ['required', 'in:low,medium,high'],
            'dueAt' => ['nullable', 'date'],
        ];
    }

    public function save(): void
    {
        $validated = $this->validate();

        $task = StudyTask::create([
            'title' => $validated['title'],
            'subject' => $validated['subject'],
            'priority' => $validated['priority'],
            'due_at' => $validated['dueAt'],
            'completed' => false,
        ]);

        BuildStudyDigest::dispatch($task->id);

        $this->reset(['title', 'subject', 'dueAt']);
        $this->priority = 'medium';
        $this->dispatch('task-saved');
    }

    public function toggle(int $taskId): void
    {
        $task = StudyTask::findOrFail($taskId);
        $task->update(['completed' => ! $task->completed]);
    }

    public function deleteTask(int $taskId): void
    {
        StudyTask::whereKey($taskId)->delete();
    }

    public function render()
    {
        $tasks = StudyTask::query()
            ->when($this->filter === 'active', fn ($query) => $query->where('completed', false))
            ->when($this->filter === 'completed', fn ($query) => $query->where('completed', true))
            ->orderByRaw("case priority when 'high' then 1 when 'medium' then 2 else 3 end")
            ->orderBy('due_at')
            ->get();

        return view('livewire.study-dashboard', [
            'tasks' => $tasks,
            'openCount' => $tasks->where('completed', false)->count(),
        ])->layout('layouts.app');
    }
}
