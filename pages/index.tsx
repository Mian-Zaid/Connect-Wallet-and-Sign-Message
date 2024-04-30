import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { useUser, useAddress, useLogin } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useState } from "react";


const Home: NextPage = () => {
  const { user } = useUser();
  const address = useAddress()
  const { login } = useLogin()

  const [signature, setSignature] = useState('N/A')
  const [addres, setAddres] = useState('N/A')

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

    setAddres(add)
  }


  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.gradientText}>
          Welcome to GreatApe wallet connect App
        </h1>

        <div className={styles.connect}>
          <ConnectWallet
            auth={{
              loginOptional: true,
            }} />
        </div>
        {address && <p>Address is {address}</p>}

        <button onClick={() => { login() }}>
          Sign in with Etheruem
        </button>

        {user && <p>You are Logged in as user: {user.address}</p>}

        {/* <button onClick={signMessage}>Sign message</button>
        <p>Signature: {signature}</p>
        <br />
        <button onClick={recoverAddress}>Recover Wallet Address</button>
        <p>Wallet Address: {addres}</p> */}
      </div>

    </div>
  );
};

export default Home;
