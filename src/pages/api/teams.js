import { parse } from 'node-html-parser';

export const config = {
    runtime: "edge",
}
export default async function App(req,res) {
    const params = new URL(req.url).searchParams
    if (!params.get('b64')) {
        return new Response(JSON.stringify({error:"Missing Required Paramaters"}), {
            status: 400,
        })
    }
    const json = atob(params.get('b64'))
    console.log(json)
    const pm = JSON.parse(json)
    if (!pm) {
        return new Response(JSON.stringify({error:"Missing Required Paramaters"}), {
            status: 400,
        })
    }
    const teams = pm.t
    console.log(teams)
    const data = []
    for (var i = 0; i < teams.length; i++) {
        console.log("Fetching..." + teams[i].id)
        const response = await fetch("https://scoreboard.uscyberpatriot.org/team.php?team=" + teams[i].id)
        const text = await response.text()
        const dom = parse(text)
        const table = dom.querySelectorAll("table")
        const tb = table.toString().replace(/[\r\n]+/g, "").replace(teams[i].id, teams[i].name + " (" + teams[i].id + ")").replace(",","").replace("<br>"," ")
        data.push({
            id: teams[i].id,
            name: teams[i].name,
            table: tb || null,     
        })
    }
    return new Response(JSON.stringify({teams: data, date: new Date().toLocaleTimeString()}), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    })

}