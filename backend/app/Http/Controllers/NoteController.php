<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
        ]);
        $alreadyCerated = Note::where('title', $request->title)->first();

        $data = [
            'title' => $request->title,
            "description" => $request->description,
        ];
        if ($alreadyCerated) {
            $alreadyCerated->update($data);
            return response()->json(['message' => ' updated successfully'], 201);
        } else {
            $data['title'] = $request->title;
            Note::create($data);
            return response()->json(['message' => ' created successfully'], 201);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request, $title)
    {
        $noteData = Note::where('title', $title)->first();

        if (is_null($noteData)) {
            return response()->json(["message" => " not found"], 404);
        }
        return response()->json($noteData, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        //
    }
}
