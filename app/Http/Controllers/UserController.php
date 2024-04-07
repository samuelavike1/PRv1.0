<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction', 'desc');


        //Filter
        if (request('name')){
            $query -> where('name','like','%'. request('name').'%');
        }
        if (request('email')){
            $query -> where('email','like','%'. request('email').'%');
        }

        $users = $query->latest()->orderBy($sortField)->paginate(10)->onEachSide(1);

        //returning react component with data and filter
        return inertia('User/Index',[
            'users'=> UserResource::collection($users),
            'queryParams'=>request()->query()? : null,
            'message'=>session('message'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        User::create($data);

        return to_route('user.index')->with('success_message', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if (!($password)) {
            unset($data['password']);
        }

        $user->update($data);

        return to_route('user.index')->with('success_message', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return to_route('user.index')->with('success_message', 'User deleted successfully');
    }
}
