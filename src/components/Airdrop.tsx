"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export default function Airdrop() {
    const { connection } = useConnection()
    const wallet = useWallet()
    const [amount, setAmount] = useState<number>()
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState<number>()

    const pubKey = wallet.publicKey

    async function sendAirdrop() {

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

    useEffect(() => {
        (async function getBalance() {
            if (!pubKey) return
            const balance = await connection.getBalance(pubKey)
            setBalance(balance / LAMPORTS_PER_SOL)
        })()
    }, [wallet])

    return (
        <div className="w-89 mx-auto flex flex-col gap-2">
            <div className="text-center h-10 uppercase font-bold bg-secondary text-primary/90 py-2 rounded">
                {!balance ? "" : `Current Balance: ${balance} SOL`}
            </div>
            <div className="flex gap-2">
                <Input
                    type="number"
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
        </div>
    )
}
