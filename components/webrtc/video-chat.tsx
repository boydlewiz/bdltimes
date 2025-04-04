"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, Share } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function VideoChat() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [roomId, setRoomId] = useState("")

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const { toast } = useToast()

  // Initialize WebRTC
  useEffect(() => {
    // Setup peer connection with STUN servers
    const initPeerConnection = () => {
      const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
      }

      peerConnectionRef.current = new RTCPeerConnection(configuration)

      // Add event handlers for ICE candidates and track events
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("New ICE candidate:", event.candidate)
          // In a real app, you would send this to the other peer
        }
      }

      peerConnectionRef.current.ontrack = (event) => {
        console.log("Remote track received:", event.streams[0])
        setRemoteStream(event.streams[0])

        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0]
        }
      }
    }

    initPeerConnection()

    return () => {
      // Cleanup
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
      }
    }
  }, [])

  // Start local video stream
  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      setLocalStream(stream)

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Add tracks to peer connection
      if (peerConnectionRef.current) {
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(track, stream)
        })
      }

      toast({
        title: "Camera and microphone activated",
        description: "Your video feed is now active.",
      })
    } catch (error) {
      console.error("Error accessing media devices:", error)
      toast({
        title: "Access denied",
        description: "Could not access camera or microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  // Create a room (offer)
  const createRoom = async () => {
    if (!peerConnectionRef.current || !localStream) {
      toast({
        title: "Cannot create room",
        description: "Please start your video first.",
        variant: "destructive",
      })
      return
    }

    try {
      const offer = await peerConnectionRef.current.createOffer()
      await peerConnectionRef.current.setLocalDescription(offer)

      // In a real app, you would send this offer to a signaling server
      // and generate a room ID
      const mockRoomId = Math.random().toString(36).substring(2, 7).toUpperCase()
      setRoomId(mockRoomId)

      toast({
        title: "Room created",
        description: `Share this room ID with others: ${mockRoomId}`,
      })
    } catch (error) {
      console.error("Error creating room:", error)
      toast({
        title: "Failed to create room",
        description: "An error occurred while creating the room.",
        variant: "destructive",
      })
    }
  }

  // Join a room (answer)
  const joinRoom = async () => {
    if (!peerConnectionRef.current || !localStream || !roomId) {
      toast({
        title: "Cannot join room",
        description: "Please start your video and enter a room ID.",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, you would get the offer from a signaling server
      // using the room ID
      const mockOffer = await peerConnectionRef.current.createOffer()

      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(mockOffer))
      const answer = await peerConnectionRef.current.createAnswer()
      await peerConnectionRef.current.setLocalDescription(answer)

      // In a real app, you would send this answer back to the other peer

      setIsConnected(true)
      toast({
        title: "Connected to room",
        description: `You've joined room ${roomId}`,
      })
    } catch (error) {
      console.error("Error joining room:", error)
      toast({
        title: "Failed to join room",
        description: "An error occurred while joining the room.",
        variant: "destructive",
      })
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsMuted(!isMuted)
    }
  }

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsVideoOff(!isVideoOff)
    }
  }

  // End call
  const endCall = () => {
    if (isConnected) {
      setIsConnected(false)

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
      }

      toast({
        title: "Call ended",
        description: "You've disconnected from the call.",
      })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto animate-scale">
      <CardHeader>
        <CardTitle className="gradient-text">Live Video Chat</CardTitle>
        <CardDescription>Connect with others in real-time using WebRTC</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {!localStream ? (
              <div className="flex items-center justify-center h-full">
                <Button onClick={startLocalStream} className="animate-bounce-subtle">
                  <Video className="mr-2 h-4 w-4" />
                  Start Video
                </Button>
              </div>
            ) : (
              <>
                <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">You</div>
              </>
            )}
          </div>

          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {!remoteStream ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Waiting for connection...</p>
              </div>
            ) : (
              <>
                <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                  Remote User
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter room ID to join"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="input-highlight"
            />
            <Button onClick={joinRoom} disabled={!localStream || !roomId} className="ripple">
              <Users className="mr-2 h-4 w-4" />
              Join
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              disabled={!localStream}
              className={isMuted ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : ""}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleVideo}
              disabled={!localStream}
              className={isVideoOff ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : ""}
            >
              {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>

            <Button variant="outline" onClick={createRoom} disabled={!localStream} className="ripple">
              <Share className="mr-2 h-4 w-4" />
              Create Room
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={endCall}
              disabled={!isConnected}
              className="animate-pulse-slow"
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">{isConnected ? "Connected to call" : "Not connected"}</p>
        <p className="text-xs text-muted-foreground">WebRTC powered video chat</p>
      </CardFooter>
    </Card>
  )
}

