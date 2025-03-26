"use client"

import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from '@/components/Airdrop';
import dynamic from 'next/dynamic';
// For Hydration Error 
// ref: https://solana.stackexchange.com/questions/4304/error-hydration-failed-because-the-initial-ui-does-not-match-what-was-rendered
// https://github.com/anza-xyz/wallet-adapter/issues/648
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);
const WalletDisconnectButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
    { ssr: false }
);

export default function Main() {

    return (
        <div className='h-dvh w-96 mx-auto flex flex-col justify-center items-center'>
            <Airdrop />
            <div className="flex gap-2 mt-4">
            <WalletMultiButtonDynamic />
            <WalletDisconnectButtonDynamic />
            </div>
        </div>
    );
}
