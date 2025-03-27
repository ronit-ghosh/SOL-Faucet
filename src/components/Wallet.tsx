"use client"

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
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Wallet() {
    return (
        <div className="flex gap-2 mt-2">
            <WalletMultiButtonDynamic />
            <WalletDisconnectButtonDynamic />
        </div>
    )
}
