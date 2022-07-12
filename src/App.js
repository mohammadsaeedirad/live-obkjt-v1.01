import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Live from "./pages/Live"
import Objkt from "./components/Objkt";

let available = false

function App() {

    const [content, setContent] = useState([])

    const versum = 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW'
    const tezotopia = 'KT1ViVwoVfGSCsDaxjwoovejm1aYSGz7s2TZ'
    const blindgallery = 'KT1D8Q4HEMzoiBaGSVDdTTYMq9phz98WizVQ'
    const fxhash = 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi'
    const dogami = 'KT1NVvPsNDChrLRH5K2cy6Sc9r1uuUwdiZQd'
    const materia = 'KT1KRvNVubq64ttPbQarxec5XdS6ZQU4DVD2'
    const moonCakes = 'KT1CzVSa18hndYupV9NcXy3Qj7p8YFDZKVQv'
    const stayWarm = 'KT1GvccrburpbWwiLdBWZXvMt9oZUiTdYSY8'
    const gap = 'KT1GA6KaLWpURnjvmnxB4wToErzM2EXHqrMo'
    const mcLaren = 'KT1PEGqt5rMmHpyaMXc8RFTFkkAUDrzSFRWk'
    const kalamint = 'KT1A5P4ejnLix13jtadsfV9GCnXLMNnab8UT'

    const fetchData = async () => {
        available = false
        const response = await fetch(`https://staging.api.tzkt.io/v1/tokens?sort.desc=lastLevel&contract.ni=${tezotopia},${blindgallery},${fxhash},${dogami},${materia},${moonCakes},${gap},${stayWarm},${mcLaren}&transfersCount.gt=2&metadata.displayUri.ne=true&limit=24`)
        const data = await response.json()
        setContent(data)
        available = true
    }
    const timer = setInterval(() => available && fetchData(), 10000)

    useEffect(() => {

        return () => clearInterval(timer)
    }, [timer])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App">
            {/*<Helmet>*/}
            {/*  <title>Live Objkt</title>*/}
            {/*  <link rel="canonical" href="http://hamedarghavan.ir" />*/}
            {/*  <meta name="description" content="live tezos marketplaces"/>*/}
            {/*</Helmet>*/}
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' exact element={<Live/>}/>
                </Routes>
            </Router>

            <div className='layout'>
                {content.map(x => <Objkt data={x} key={x.id}/>)}
            </div>

        </div>
    );
}

export default App;
