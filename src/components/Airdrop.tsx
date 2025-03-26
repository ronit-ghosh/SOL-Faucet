"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export default function Airdrop() {
    const { connection } = useConnection()
    const wallet = useWallet()
    const [amount, setAmount] = useState<number>()
    const [loading, setLoading] = useState(false)

    async function sendAirdrop() {
        const pubKey = wallet.publicKey

        if (!pubKey || !amount) {
            toast("Please connect your wallet and enter a valid amount.");
            return
        }
        
        try {
            setLoading(true)
            const txn = await connection.requestAirdrop(pubKey, amount * LAMPORTS_PER_SOL)
            console.log(txn)
            toast(`Airdropped ${amount} SOL to ${pubKey}🚀`)
            setLoading(false)
        } catch (error) {
            toast("Limit Exceeded!")
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
                    disabled={!amount || !wallet.publicKey || loading}
                    variant="accent"
                    onClick={sendAirdrop}>
                    {loading ? "Airdroping" : "Airdrop"}
                </Button>
        </div>
    )
}
