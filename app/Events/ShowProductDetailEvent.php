<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\InteractsWithBroadcasting;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class ShowProductDetailEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels, InteractsWithBroadcasting;


    public $user_id;
    public $product_name;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user_id, $product_name)
    {
        $this->broadcastVia('pusher');
        $this->user_id = $user_id;
        $this->product_name = $product_name;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel("User.{$this->user_id}.ShowProduct");
    }

    public function broadcastWith()
    {
        return [
            'product_name' => $this->product_name
        ];
    }
}
