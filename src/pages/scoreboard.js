import Head from "next/head";
import { useState, useEffect, useRef } from 'react'

export default function Scoreboard() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    function fetchdata() {
        console.log("Loading Data...")
        
            fetch('/api/teams?b64=' + btoa(localStorage.getItem("teams")))
                .then((res) => res.json())
                .then((data) => {
                    // Modify Data
                    data.key = btoa(localStorage.getItem("teams"))
                    data.status = "Last Updated at: " + data.date

                    //Set Color
                    data.color = localStorage.getItem("color") || "#AA273E"
                    setData(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.log("Error.")
                    console.log(error)
                    setLoading(false)
                    setData({ error: "Unexpected Error... Please try again later", status: "Error Loading Scoreboard"})
                })
            console.log("Data Loaded")
            console.log(data)
    }

    if (typeof window !== 'undefined') {
        console.log("focus", document.hasFocus())

        useEffect(() => {
            fetchdata()
        }, [])
        useInterval(() => {
            //console.timeEnd(id)
            console.log("focus", document.hasFocus())
            fetchdata()
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
            <h1>Cyber Patriot Scoreboard</h1>
            <p>Scoreboard Loading...</p>
        </div>
    )
    if (data.error) return (<div><p>{data.error}</p><a href="/">Go Home</a></div>)
    if (!data) return <p>Error</p>
    function parsedata(data) {
        console.log(data)
        const root = document.querySelector(':root');
        root.style.setProperty("--primary", localStorage.getItem("color") || "#AA273E");

        try {
            //document.getElementById("udt").innerHTML = "Last Updated at: " + new Date().toLocaleTimeString()
        } catch (e) {
            console.log(e)
        }
        return data.teams.map((x) => {
            if (x.table) {
                return <div className="team" key={x.id} dangerouslySetInnerHTML={{ __html: x.table }}></div>
            } else {
                return <div className="msg" key={x.id}><h3>{x.name}</h3><p>Team ID: {x.id}</p><p>Scoreboard Offline</p></div>
            }
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

        document.getElementById("custom").style.display = "none";
    }
    function updatecolor() {
        console.log("Updated Color")
        const root = document.querySelector(':root');
        root.style.setProperty("--primary", document.getElementById("theme").value);
    }

    function savetheme() {
        console.log("Saved Theme")
        localStorage.setItem("color", document.getElementById("theme").value)
    }
    return (
        <div>
            <Head>
                <title>Cyber Patriot Score Board</title>
            </Head>
            <div>
                <div>{parsedata(data)}</div>
                <p id="udt">{data.status}</p>
                <div id="custom">
                    <h4>Customization</h4>
                    <input id="theme" type='color' defaultValue={data.color} onChange={() => updatecolor()}></input>
                    <br />
                    <button onClick={() => savetheme()}>Save Theme</button>
                    <br />
                    <button id="fullscreen" onClick={() => openFullscreen()}>TV Mode</button>
                    <p>Session Key</p>
                    <code>{data.key || "NOT A KEY"}</code>
                </div>
            </div>
        </div>
    )
}