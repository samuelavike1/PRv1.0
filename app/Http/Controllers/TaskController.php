<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction', 'desc');


        //Filter
        if (request('name')){
            $query -> where('name','like','%'. request('name').'%');
        }
        if (request('status')){
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        //returning react component with data and filter
        return inertia('Task/Index',[
            'tasks'=> TaskResource::collection($tasks),
            'queryParams'=>request()->query()? : null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($project_id)
    {
        $project = Project::find($project_id);
        $users = User::all();
        return inertia('Task/Create',[
            'users' => UserResource::collection($users),
            'project'=>new ProjectResource($project)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
//       return redirect()->back()->with('success_message', 'Task created successfully');
//        return redirect()->back()->with('error_message', 'Task not created successfully');
        $projectId = $request->input('project_id');
        try {
            $data = $request->validated();
//            $image = $data['image'] ?? null;
            $data['created_by'] = auth()->id();
            $data['updated_by'] = auth()->id();
//            if ($image){
//                $data['image_path']=$image -> store('task/'.Str::random(),'public');
//
//            }
            $newTask = Task::create($data);

            if ($newTask)
            {
                return to_route('project.show',$projectId)->with('success_message', 'Task created successfully');
            }
            return redirect()->back()->with('error_message', 'Task not created');

        }catch (\Exception $e) {

            return to_route('project.show',$projectId)->with('error_message', 'Task creation failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
//        $query = $task->tasks();
//        $sortField = request('sort_field','created_at');
//        $sortDirection = request('sort_direction', 'desc');
//
//        if (request('name')){
//            $query -> where('name','like','%'. request('name').'%');
//        }
//        if (request('status')){
//            $query->where('status', request('status'));
//        }
//        $tasks=$query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
//
//        return inertia('Task/Show',[
//            'task'=>new TaskResource($task),
//            'tasks'=> TaskResource::collection($tasks),
//            'queryParams'=>request()->query()? : null,
//        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {

//        $project = Project::find($project_id);
        $users = User::all();
        return Inertia::render('Task/Edit', [
            'task'=> new TaskResource($task),
            'users' => UserResource::collection($users),
//            'project'=>new ProjectResource($project)
//            'project_id'=> Project::find($project_id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

//        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();
//        if ($image){
//            if ($task->image_path) {
//                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
//            }
//            $data['image_path']=$image -> store('task/'.Str::random(),'public');
//
//        }
        $task -> update($data);
        return to_route('task.index')->with('success_message', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {

        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')->with('success_message', 'Task deleted successfully');
    }
}
