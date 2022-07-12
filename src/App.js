import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Live from "./pages/Live"
import Objkt from "./components/Objkt";
import {contractAddresses} from './components/contractAddresses'

let available = false

function App() {
    const [content, setContent] = useState([])
    const newContent = content.filter(x => x.metadata.name !== '[WAITING TO BE SIGNED]') || []

    const fetchData = async () => {
        available = false
        const response = await fetch(`https://staging.api.tzkt.io/v1/tokens?sort.desc=lastLevel&contract.ni=${contractAddresses.tezotopia},${contractAddresses.blindgallery},${contractAddresses.dogami},${contractAddresses.materia},${contractAddresses.moonCakes},${contractAddresses.gap},${contractAddresses.stayWarm},${contractAddresses.mcLaren}&transfersCount.gt=3&metadata.displayUri.ne=true&limit=3`)
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

        // function purification(content){
        //     if (content.data.metadata.name !== '[WAITING TO BE SIGNED]'){
        //         return content;
        //     }
        // }

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
                {newContent.map(x => <Objkt data={x} key={x.id}/>)}
            </div>

        </div>
    );
}

export default App;
