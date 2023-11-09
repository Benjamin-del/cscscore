import { useState, useEffect } from 'react'
import Head from 'next/head'
export default function landing() {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
        <div>
            <Head>
                <title>Landing</title>
                <meta http-equiv="refresh" content="5;url=/scoreboard" />
            </Head>
            <div>
            <h1>Cyber Patriot Scoreboard Session Key</h1>
            <p>Created by: Benjamin-Del</p>
            <p>You will be redirected shortly.</p>
            <h3>Session Key</h3>
            <p>Your Session Key is:</p>
            <code id="key">{isClient ? btoa(localStorage.getItem("teams")) : 'Error (Not a Key)'}</code>
            <p>Copy this key and save it somewhere safe. You will need this key to access your scoreboard on a different device</p>
            <h4>Impatient?</h4>
            <a href='/scoreboard'>Go Now</a>
            </div>
        </div>
    )
}