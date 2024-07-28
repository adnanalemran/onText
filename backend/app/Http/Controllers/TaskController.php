<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //for getting all tasks
        $tasks = Task::all();
        //returning response
        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //returning response
        return response()->json([
            'status' => 'success',
            'message' => 'Api hit  successfully'
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //for validation of request data
        $validated = $request->validated();

        //for creating new task
        $task = Task::create($validated);

        //returning response
        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //for finding task by 
        $task = Task::find($id);

        //if task not found
        if (is_null($task)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
        //returning response    
        return response()->json([
            'status' => 'success',
            'data' => $task

        ], 200);
    }
    // Show the form for editing the specified resource.
    public function edit(Task $task)
    {
        //
    }

    // Update the specified resource in storage.
    public function update(UpdateTaskRequest $request, $id)
    {
        //for validation of request data
        $validated = $request->validated();
        //for finding task by id
        $task = Task::find($id);
        //if task not found
        if (is_null($task)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
        //for updating task data 
        $task->fill($validated);
        //for saving task
        $task->save();
        //returning response
        return response()->json([
            'status' => 'success',
            'data' => $task
        ], 200);
    }

    public function destroy($id)
    {
        //for finding task by id
        $task = Task::find($id);
        //if task not found
        if (is_null($task)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
        //for deleting task
        $task->delete();
        //returning response
        return response()->json(['data' => 'delete data ! '], 204);
    }
}
