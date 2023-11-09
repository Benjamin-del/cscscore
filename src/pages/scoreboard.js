import Head from "next/head";
import { useState, useEffect, useRef } from 'react'

export default function Scoreboard() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])


    if (typeof window !== 'undefined') {
        useInterval(() => {
            //console.timeEnd(id)
            console.log("Loading Data...")
            fetch('/api/teams?b64=' + btoa(localStorage.getItem("teams")))
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
            console.log("Data Loaded (Auto)")
            console.log(data)
        }, 30000);

    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest function.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    if (isLoading) return (
        <div>
            <h1>Cyber Patriot Scoreboard Session Key</h1>
            <p>Created by: Benjamin-Del</p>
            <p>The Scoreboard is Loading... Please Wait</p>
            <h3>Session Key</h3>
            <p>Your Session Key is:</p>
            <code id="key">{isClient ? btoa(localStorage.getItem("teams")) : 'Error (Not a Key)'}</code>
            <p>Copy this key and save it. You will need this key to access your scoreboard on a different device</p>
        </div>
    )
    if (data.error) return (<div><p>{data.error}</p><a href="/">Go Home</a></div>)
    if (!data) return <p>Error</p>
    function parsedata(data) {
        const root = document.querySelector(':root');
        root.style.setProperty("--primary", data.color);

        try {
        document.getElementById("udt").innerHTML = "Last Updated at: " + new Date().toLocaleTimeString()
        } catch (e) {
            console.log(e)
        }
        return data.teams.map((x) => {
            return <div className="team" key={x.id} dangerouslySetInnerHTML={{ __html: x.table }}></div>
        })
    }
    var elem = document.documentElement;

    /* View in fullscreen */
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }

        document.getElementById("fullscreen").style.display = "none";
    }

    return (
        <div>
            <Head>
                <title>Cyber Patriot Score Board</title>
            </Head>
            <div>
                <div>{parsedata(data)}</div>
                <button id="fullscreen" onClick={() => openFullscreen()}>TV Mode</button>
                <p id="udt">Waiting for update...</p>
            </div>
        </div>
    )
}