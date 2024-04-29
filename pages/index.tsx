import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useState } from "react";


const Home: NextPage = () => {
  const [signature, setSignature] = useState('N/A')
  const [address, setAddress] = useState('N/A')

  const message = 'Please sign me';

  const sdk = useSDK();

  const signMessage = async () => {
    const sig = await sdk?.wallet?.sign(message)

    if (!sig) {
      throw new Error('Failed to sign message')
    }

    setSignature(sig)
  }

  const recoverAddress = async () => {
    const add = sdk?.wallet?.recoverAddress(message, signature)

    if (!add) {
      throw new Error('No Address!');
    }

    setAddress(add)
  }


  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.gradientText}>
          Welcome to GreatApe wallet connect App
        </h1>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>
        <button  onClick={signMessage}>Sign message</button>
        <p>Signature: {signature}</p>
        <br />
        <button onClick={recoverAddress}>Recover Wallet Address</button>
        <p>Wallet Address: {address}</p>
      </div>

    </div>
  );
};

export default Home;
