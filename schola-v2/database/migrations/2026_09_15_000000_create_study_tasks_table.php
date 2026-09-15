<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title', 120);
            $table->string('subject', 80)->index();
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium')->index();
            $table->timestamp('due_at')->nullable()->index();
            $table->boolean('completed')->default(false)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_tasks');
    }
};
