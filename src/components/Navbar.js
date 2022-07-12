import React from 'react';
import logo from '../assets/tezos-nft-analyctics-logo.png'
import {Link} from "react-router-dom";
import "../styles/Navbar.css"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo}/>
                <p>Tezos NFT Analytic</p>
            </div>
            <div className="pages_links">
                <Link to="/">Live</Link>
                <Link to="/About">About</Link>
                <Link to="/Contact">Contact</Link>
                <Link to="/Help">Help</Link>
            </div>
            <button className="connect_wallet_button"><AccountBalanceWalletIcon fontSize={"small"}/>Connect Wallet</button>
        </div>
    );
};

export default Navbar;