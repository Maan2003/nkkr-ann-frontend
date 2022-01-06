import { useEffect, useState } from "react"

type Notif = {
    title: string,
    link: string,
    id: number,
}

export function App() {
    const [notifs, setNotifs] = useState([]);
    // TODO: handdle pagination
    useEffect(() => {
        fetch("https://nitkkr-announcement.herokuapp.com/notifs")
            .then(res => res.json())
            .then(res => setNotifs(res.notifs));
    }, []);
    return <div className="app">
        <Header />
        <div className="notifs-outer">
            <div className="notifs-inner">
                {notifs.map(n => <Notif key={n.id} id={n.id} title={n.title} link={n.link} />)}
            </div>
        </div>
    </div>
}

function Header() {
    return <div className="header">
        NITKKR Announcements
    </div>
}

function Notif(props: Notif) {
    // TODO: get 280 from local storage
    if (props.id > 280) {
        return <div className="notif unread" onClick={() => location.assign(props.link)}>
            {props.title}
        </div>
    } else {
        return <div className="notif" onClick={() => location.assign(props.link)}>
            {props.title}
        </div>
    }
}
