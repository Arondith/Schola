<main class="shell" x-data="{ formOpen: true }">
    <header class="hero">
        <div>
            <p class="eyebrow">Schola v2</p>
            <h1>Study command center</h1>
            <p>Laravel + Livewire persistence with Alpine.js micro-interactions and cloud-ready infrastructure.</p>
        </div>
        <div class="metric">
            <strong>{{ $openCount }}</strong>
            <span>open tasks</span>
        </div>
    </header>

    <section class="toolbar">
        <div class="filters">
            @foreach (['all' => 'All', 'active' => 'Active', 'completed' => 'Completed'] as $value => $label)
                <button wire:click="$set('filter', '{{ $value }}')" class="filter {{ $filter === $value ? 'active' : '' }}">
                    {{ $label }}
                </button>
            @endforeach
        </div>
        <button class="secondary" @click="formOpen = ! formOpen" x-text="formOpen ? 'Hide form' : 'Add task'"></button>
    </section>

    <section class="panel" x-show="formOpen" x-transition>
        <form wire:submit="save" class="task-form">
            <label>
                <span>Task</span>
                <input wire:model="title" type="text" placeholder="Review API authentication">
                @error('title') <small>{{ $message }}</small> @enderror
            </label>

            <label>
                <span>Subject</span>
                <input wire:model="subject" type="text" placeholder="Web Development">
                @error('subject') <small>{{ $message }}</small> @enderror
            </label>

            <label>
                <span>Priority</span>
                <select wire:model="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>

            <label>
                <span>Due</span>
                <input wire:model="dueAt" type="datetime-local">
            </label>

            <button class="primary" type="submit" wire:loading.attr="disabled">Save task</button>
        </form>
    </section>

    <section class="task-grid">
        @forelse ($tasks as $task)
            <article class="task-card {{ $task->completed ? 'done' : '' }}" wire:key="task-{{ $task->id }}">
                <div>
                    <span class="badge {{ $task->priority }}">{{ ucfirst($task->priority) }}</span>
                    <h2>{{ $task->title }}</h2>
                    <p>{{ $task->subject }}</p>
                    <small>{{ $task->due_at?->format('M j, Y g:i A') ?? 'No due date' }}</small>
                </div>
                <div class="actions">
                    <button wire:click="toggle({{ $task->id }})">{{ $task->completed ? 'Reopen' : 'Complete' }}</button>
                    <button class="danger" wire:click="deleteTask({{ $task->id }})" wire:confirm="Delete this task?">Delete</button>
                </div>
            </article>
        @empty
            <div class="empty">No tasks in this view yet.</div>
        @endforelse
    </section>

    <div class="toast" x-data="{ visible: false }" x-on:task-saved.window="visible = true; setTimeout(() => visible = false, 1800)" x-show="visible" x-transition>
        Task saved and queued for background processing.
    </div>
</main>
