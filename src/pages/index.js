import Head from 'next/head'

export default function Home() {

    function addteam() {
        const ele = document.getElementById("teams")
        //ele.innerHTML = ""
        const cld = document.createElement("div")

        cld.setAttribute("team", document.getElementById("id").value + "_" + document.getElementById("name").value)
        const name = document.createElement("h3")
        const id = document.createElement("p")
        name.innerHTML = "Team: " + document.getElementById("name").value
        id.innerHTML = "ID:" + document.getElementById("id").value

        document.getElementById("name").value = ""
        document.getElementById("id").value = ""

        cld.appendChild(name)
        cld.appendChild(id)

        ele.appendChild(cld)

    }
    function launch() {
        const ele = document.getElementById("teams").childNodes
        const items = Array.from(ele).map((e) => {
            const dts = e.getAttribute("team").split("_")
            return {
                id: dts[0],
                name: dts[1]
            }
        })
        console.log(items)
        localStorage.setItem("teams", JSON.stringify({t: items, color: document.getElementById("theme").value}))
        window.location.href = "/scoreboard"
    }
    function load() {
        console.log("Lading Prev Session")
        const lc = localStorage.getItem("teams")
        if (lc) {
            const data = JSON.parse(lc)
            console.log(data)
            const ele = document.getElementById("teams")
            ele.innerHTML = ""
            data.t.forEach((x) => {
                console.log(x)
                const cld = document.createElement("div")
                cld.setAttribute("team", x.id + "_" + x.name)

                const name = document.createElement("h3")
                const id = document.createElement("p")

                name.innerHTML = "Team: " + x.name
                id.innerHTML = "ID:" + x.id

                cld.appendChild(name)
                cld.appendChild(id)

                ele.appendChild(cld)
            })
        } else {
            alert("No previous session found.")
        }
    }
    function reset() {
        localStorage.removeItem("teams")
        document.getElementById("teams").innerHTML = ""
        window.location.href = "/"
    }
    function b64() {
        const input = prompt("Enter your session Key")
        if (!input) {
            alert("Invalid/Empty Key")
            return 
        }
        localStorage.setItem("teams", atob(input))
        window.location.href = "/scoreboard"
    }
    return (
        <div>
            <Head>
                <title>Cyber Patriot Score Board</title>
            </Head>
            <div>
                <h1>Cyber Patriot Score Board Settings</h1>
                <p>Enter your team ID and name below. You can find your team ID on the <a href="https://scoreboard.uscyberpatriot.org/">Cyber Patriot Score Board</a>.</p>
                <div>
                    <p>Team Name</p>
                    <input id="name" placeholder='Team Name'></input>
                    <p>Team ID</p>
                    <input id="id" placeholder='Team ID (16-XXXX)'></input>
                    <p>Scoreboard theme:</p>
                    <input id="theme" type='color' /*value='#04AA6D'*/></input>
                    <div>
                        <button onClick={() => addteam()}>Add Team</button>
                        <button onClick={() => document.getElementById("teams").innerHTML = ""}>Clear Teams</button>
                        <button onClick={() => reset()}>Reset Storage (Danger)</button>
                        <button onClick={() => b64()}>B64 Session</button>
                        <button onClick={() => load()}>Load Previous Session</button>
                        <button onClick={() => launch()}>Launch</button>
                    </div>

                </div>
                <p>NOTE: We can not verify IDs. Please ensure you have the correct IDs.</p>
                <h2>Configured Teams</h2>
                <div id="teams">
                </div>
            </div>
        </div>
    )
}