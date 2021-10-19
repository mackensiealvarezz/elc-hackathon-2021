<?php

namespace App\Models;

use App\Events\CartUpdatedEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_products', 'cart_id', 'product_id')->withPivot('id');
    }

    public function addProduct($product_id)
    {
        $this->products()->attach($product_id);
        $this->updateTotal();
        event(new CartUpdatedEvent($this));
    }

    public function deleteProduct($product_id)
    {
        $this->products()->detach($product_id);
        $this->updateTotal();
        event(new CartUpdatedEvent($this));
    }

    public function updateTotal()
    {
        $this->update(['total' => $this->products()->sum('price')]);
    }


}
