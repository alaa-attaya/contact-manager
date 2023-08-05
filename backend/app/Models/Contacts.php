<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'phone_number', 'address', 'latitude', 'longitude','image'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
