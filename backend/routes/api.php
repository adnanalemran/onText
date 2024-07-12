<?php

use App\Http\Controllers\API\categoryController;
use App\Http\Controllers\Api\CategoryController as ApiCategoryController;
use Illuminate\Support\Facades\Route;

Route::apiResource('categories', ApiCategoryController::class);
