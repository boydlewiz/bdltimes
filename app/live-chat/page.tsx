import type { Metadata } from "next"
import { VideoChat } from "@/components/webrtc/video-chat"

export const metadata: Metadata = {
  title: "Live Video Chat - Pulse News",
  description: "Connect with others through real-time video chat",
}

export default function LiveChatPage() {
  return (
    <div className="container py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight gradient-text animate-fade-in">Live Video Chat</h1>
        <p className="text-xl text-muted-foreground animate-slide-in-right">
          Connect with other readers and journalists in real-time
        </p>
      </div>

      <VideoChat />

      <div className="bg-primary/5 rounded-lg p-6 border border-primary/10 animate-slide-in-left">
        <h2 className="text-2xl font-bold mb-4">How to use the video chat</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Click "Start Video" to enable your camera and microphone</li>
          <li>Click "Create Room" to generate a room ID</li>
          <li>Share the room ID with someone you want to chat with</li>
          <li>They can enter the room ID and click "Join" to connect</li>
          <li>Use the controls to mute your microphone or turn off your camera</li>
          <li>Click the red button to end the call</li>
        </ol>
      </div>
    </div>
  )
}

