"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"
import Wallet from "./Wallet"

export default function SendSol() {
    const wallet = useWallet()
    const { connection } = useConnection()
    const [to, setTo] = useState<string>()
    const [amount, setAmount] = useState<number>()
    const [loading, setLoading] = useState(false)

    const fromPubkey = wallet.publicKey

    async function sendToken() {
        try {
            if (!fromPubkey || !to || !amount) {
                toast("Fill the input fields!");
                return;
            }

            console.log(fromPubkey)
            console.log(to)
            console.log(amount)

            setLoading(true)
            const txn = new Transaction()
            txn.add(
                SystemProgram.transfer({
                    fromPubkey,
                    toPubkey: new PublicKey(to),
                    lamports: amount * LAMPORTS_PER_SOL
                })
            )

            await wallet.sendTransaction(txn, connection)
            setLoading(false)
            toast(`Sent ${amount} SOL to ${to}`)
        } catch (error) {
            setLoading(false)
            console.error(error)
            toast("Transaction could not complete, please try again!")
        }
    }

    return (
        <div className="h-dvh w-89 mx-auto flex flex-col justify-center items-center">
            <div className="flex flex-col gap-2 w-89">
                <Input
                    onChange={e => setTo(e.target.value)}
                    placeholder="Receipients Solana Public Address" />
                <Input
                    onChange={e => setAmount(Number(e.target.value))}
                    placeholder="Amount" />
            </div>
            <Wallet />
            <Button
                disabled={!to || !fromPubkey || loading}
                variant="accent"
                onClick={sendToken}
                className="w-full mt-3">
                {loading ? "Sending..." : "Send"}
            </Button>
        </div>
    )
}
