<?php

namespace App\Events;

use App\Models\Cart;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\InteractsWithBroadcasting;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class CartUpdatedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels, InteractsWithBroadcasting;

    public $cart;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Cart $cart)
    {
        $this->broadcastVia('pusher');
        $this->cart = $cart;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('Cart.'.$this->cart->id);
    }

    public function broadcastWith()
    {
        return ['cartId' => $this->cart->id,
                'count'  => $this->cart->products()->count()
        ];
    }
}
