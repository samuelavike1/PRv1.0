<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Project;
use App\Models\Task;
use Database\Factories\ProjectFactory;
use Database\Factories\TaskFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

//         \App\Models\User::factory()->create([
//             'name' => 'Dr Machines',
//             'email' => 'machines@email.com',
//             'password'=>bcrypt('password'),
//             'email_verified_at'=>time()
//         ]);

//         Project::factory()->count(30)->has(TaskFactory)->create()

        $this->call([
            ProjectSeeder::class
        ]);
    }
}
