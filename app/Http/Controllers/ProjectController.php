<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\ProjectRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction', 'desc');


        //Filter
        if (request('name')){
            $query -> where('name','like','%'. request('name').'%');
        }
        if (request('status')){
            $query->where('status', request('status'));
        }
        $projects = $query->latest()->orderBy($sortField)->paginate(10)->onEachSide(1);

        //returning react component with data and filter
        return inertia('Project/Index',[
            'projects'=> ProjectResource::collection($projects),
            'queryParams'=>request()->query()? : null,
            'message'=>session('message'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        if ($image){
            $data['image_path']=$image -> store('project/'.Str::random(),'public');

        }
        Project::create($data);

        return to_route('project.index')->with('message', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')){
            $query -> where('name','like','%'. request('name').'%');
        }
        if (request('status')){
            $query->where('status', request('status'));
        }
        $tasks=$query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Project/Show',[
            'project'=>new ProjectResource($project),
            'tasks'=> TaskResource::collection($tasks),
            'queryParams'=>request()->query()? : null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'project'=> new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();
        if ($image){
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path']=$image -> store('project/'.Str::random(),'public');

        }
        $project -> update($data);
        return to_route('project.index')->with('message', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        return to_route('project.index')->with('message', 'Project deleted successfully');
    }
}
