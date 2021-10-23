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

class UpdateDonationEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels, InteractsWithBroadcasting;

    public $cart;
    public $donation;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($cart, $donation = 0)
    {
        $this->broadcastVia('pusher');
        $this->cart = $cart;
        $this->donation = $donation;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('Cart.'.$this->cart->id.'.Donate');
    }

    public function broadcastWith()
    {
        return [
            'donation'  => $this->donation
        ];
    }
}
