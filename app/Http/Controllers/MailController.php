<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function SendMail()
    {
        Mail::raw('This is the plain text content of the email.', function ($message) {
            $message->to('recipient@example.com', 'Recipient Name')
                ->subject('Email Subject');
        });
    }

}
