"use client"

import Airdrop from '@/components/Airdrop';
import { Button } from './ui/button';
import Link from 'next/link';
import Wallet from './Wallet';


export default function Faucet() {

    return (
        <div className='h-dvh w-96 mx-auto flex flex-col justify-center items-center'>
            <Airdrop />
            <Wallet />
            <Link href="/send">
                <Button
                    className='mt-3 w-89'
                    variant="outline">
                    Send SOL
                </Button>
            </Link>
        </div>
    );
}
