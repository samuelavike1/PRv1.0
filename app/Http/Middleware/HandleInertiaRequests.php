<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
//        Log::info('flash_message'. $request->session()->get('success_message'));
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'appUrl'=>config('app.url'),
            'flash' => [
                'success_message' => fn() => $request->session()->get('success_message'),
                'error_message' => fn() => $request->session()->get('error_message'),
            ]
        ];
    }
}
