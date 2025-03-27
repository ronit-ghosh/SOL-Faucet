"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { ed25519 } from "@noble/curves/ed25519"
import bs58 from "bs58"
import { toast } from "sonner"

export default function Sign() {
    const { publicKey, signMessage } = useWallet()
    const [msg, setMsg] = useState<string>()
    const [loading, setLoading] = useState(false)

    async function signMsg() {
        try {
            if (!publicKey || !signMessage || !msg) return
            setLoading(true)
            const encodedMessage = new TextEncoder().encode(msg)

            const signature = await signMessage(encodedMessage)

            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
                toast("Invalid Mesasge Signature!")
            }
            toast(`Verified\nMesasge Signature: ${bs58.encode(signature)}`)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
            toast("Error while signin mesasge!")
        }
    }

    return (
        <div className="h-dvh w-89 mx-auto flex flex-col justify-center items-center gap-2">
            <Input
                onChange={e => setMsg(e.target.value)}
                placeholder="Enter a message" />
            <Button
                disabled={!publicKey || !signMessage || !msg || loading}
                onClick={signMsg}
                variant="accent"
                className="w-full">
                {loading ? "Signing..." : "Sign"}
            </Button>
        </div>
    )
}
