<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total',
        'donate',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_products', 'cart_id', 'product_id')->withPivot('id');
    }

    public function updateTotal()
    {
        dd($this->products()->sum('price')+($this->donate));
        $this->update(['total' => $this->products()->sum('price')+$this->donate]);
    }

    public function setDonate($donation)
    {
        dd($donation);
        return $this->donate = $donation;
    }


}
