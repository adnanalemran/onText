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
        $tasks = Task::all();
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
        $validated = $request->validated();
        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $task = Task::find($id);
        if (is_null($task)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'data' => $task

        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }


    public function update(UpdateTaskRequest $request, $id)
    {
        $validated = $request->validated();
        $task = Task::find($id);
        if (is_null($task)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
        $task->fill($validated);
        $task->save();
        return response()->json([
            'status' => 'success',
            'data' => $task
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * Remove the specified resource from storage.
     */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        if (is_null($task)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
        $task->delete();
        return response()->json(['data' => 'delete data ! '], 204);
    }
}
