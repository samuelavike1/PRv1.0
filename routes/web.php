<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth','verified'])->group(function (){
    Route::get('/dashboard', fn () =>Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('project', \App\Http\Controllers\ProjectController::class);
    Route::resource('task', \App\Http\Controllers\TaskController::class);
    Route::resource('user', \App\Http\Controllers\UserController::class);
    Route::resource('test', \App\Http\Controllers\TestController::class);

    Route::get('create-task/{project_id}', [\App\Http\Controllers\TaskController::class, 'create'])->name('create-task');
    Route::get('delete-task/{task}', [\App\Http\Controllers\TaskController::class, 'destroy'])->name('delete-task');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('mail',[\App\Http\Controllers\MailController::class,'SendMail']);
require __DIR__.'/auth.php';
