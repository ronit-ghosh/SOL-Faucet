"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { toast } from "sonner"

export default function Airdrop() {
    const wallet = useWallet()
    const pubKey = wallet.publicKey
    const { connection } = useConnection()
    const [amount, setAmount] = useState<number>()
    const [loading, setLoading] = useState(false)

    async function sendAirdrop() {
        try {
            setLoading(true)
            if (!wallet.publicKey || !amount) return
            await connection.requestAirdrop(wallet.publicKey, amount * 1000000000)
            toast(`Airdropped ${amount} SOL to ${pubKey}🚀`)
            setLoading(false)
        } catch (error) {
            toast("Limit exceeded")
            console.error(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-87 mx-auto flex gap-2">
            <Input
                placeholder="Enter Airdrop Amount"
                onChange={e => setAmount(parseInt(e.target.value))}
            />
            <Button
                disabled={!amount || !pubKey || loading}
                variant="accent"
                onClick={sendAirdrop}>
                {loading ? "Airdroping" : "Airdrop"}
            </Button>
        </div>
    )
}
