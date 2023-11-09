import Head from "next/head";
import { useState, useEffect } from 'react'

export default function Scoreboard() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    if (typeof window !== 'undefined') {

        useEffect(() => {
            fetch('/api/teams?b64=' + btoa(localStorage.getItem("teams")))
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
        }, [])
    }
    if (isLoading) return <p>Loading...</p>
    if (data.error) return (<div><p>{data.error}</p><a href="/">Go Home</a></div>)
    if (!data) return <p>Error</p>
    function parsedata(data) {
        const root = document.querySelector(':root');
        root.style.setProperty("--primary", data.color); 
        return data.teams.map((x) => {
            return <div className="team" key={x.id} dangerouslySetInnerHTML={{ __html: x.table }}></div>
        })
    }
    return (
        <div>
            <Head>
                <title>Cyber Patriot Score Board</title>
                <meta http-equiv="refresh" content="60" />
            </Head>
            <div>
                <div>{parsedata(data)}</div>
            </div>
        </div>
    )
}