<?php

namespace Tests\Feature;

use App\Jobs\BuildStudyDigest;
use App\Livewire\StudyDashboard;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Livewire\Livewire;
use Tests\TestCase;

class StudyDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_can_create_a_task_and_queue_background_work(): void
    {
        Queue::fake();

        Livewire::test(StudyDashboard::class)
            ->set('title', 'Review Laravel queues')
            ->set('subject', 'Web Development')
            ->set('priority', 'high')
            ->call('save')
            ->assertHasNoErrors();

        $this->assertDatabaseHas('study_tasks', [
            'title' => 'Review Laravel queues',
            'priority' => 'high',
        ]);

        Queue::assertPushed(BuildStudyDigest::class);
    }

    public function test_task_requires_a_title_and_subject(): void
    {
        Livewire::test(StudyDashboard::class)
            ->call('save')
            ->assertHasErrors(['title' => 'required', 'subject' => 'required']);
    }
}
