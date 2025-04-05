<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index()
    {
        return Task::where('completed', false)->latest()->take(5)->get();
    }

    public function store(Request $request)
    {

        Log::info('Incoming Task Creation Request:', $request->all());

        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);

        Task::create($request->all());

        return response()->json(['message' => 'Task created!']);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $task->update(['completed' => true]);

        return response()->json(['message' => 'Task completed!']);
    }
}
