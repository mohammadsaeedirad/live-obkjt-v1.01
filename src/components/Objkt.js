import React, {useEffect, useState} from 'react';
import '../styles/Objkt.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Objkt = (props) => {

    const ipfs = props.data.metadata.displayUri;
    const imageUri = ipfs.replace("ipfs://", "https://ipfs.io/ipfs/")

    let marketplace = ''
    switch (props.data.contract.alias) {
        case 'hic et nunc NFTs':
            marketplace = "hic et nunc";
            break;
        case undefined:
            marketplace = "OBJKT.com";
            break;
        case 'akaSwap NFTs':
            marketplace = "akaSwap";
            break;
        case 'FXHASH GENTK v2':
            marketplace = "fxhash";
            break;
        case 'Versum Items':
            marketplace = "Versum";
            break;
        case 'KALAM':
            marketplace = "kalamint";
            break;
        default:
            marketplace = props.data.contract.alias;
    }

    if (marketplace.length > 20) {
        marketplace = marketplace.substr(0, 4) + '...' + marketplace.substr(-3, 4);
    }

    let creatorText = ''
    if (props.data.metadata.creators) {
        creatorText = props.data.metadata.creators[0]
    } else {
        creatorText = 'undefined'
    }

    if (creatorText !== null && creatorText.length > 20) {
        creatorText = creatorText.substr(0, 4) + '...' + creatorText.substr(-3, 4);
    } else if (creatorText == null) {
        creatorText = 'generative'
    }

    const marketUrl = "https://objkt.com/asset/" + props.data.contract.address + "/" + props.data.tokenId;

    function royality(){
        let royality = 0;
        const fetchData = async () => {
            const response = await fetch(marketUrl)
            const data = await response.json()

        }

        return royality;
    }

    const marketArtistUrl = "https://nftbiker.xyz/artist?wallet=" + props.data.metadata.creators;

    let royalityShares = 0
    if (props.data.metadata.royalties) {
        const royality = props.data.metadata.royalties.shares;
        for (let i in royality) {
            royalityShares += royality[i]
        }
    }

    let price = 0;
    if (props.data.balancesCount) {
        price = props.data.balancesCount;
    }

    const edition = props.data.totalMinted
    if (marketplace.length > 9999) {
        marketplace = '+9999'
    }

    return (
        <div className='objkt'>
            <a href={marketUrl} target="_blank" rel="noopener noreferrer">
                <img className="image" src={imageUri}/>
            </a>
            <div className='creator_and_edition'>
                <a className='creator' href={marketArtistUrl} target="_blank" rel="noopener noreferrer">
                    <AccountBoxIcon fontSize={"small"}/>
                    <p>{creatorText}</p>
                </a>
                <p>{edition} ed.</p>
            </div>
            <div className='marketplace_and_royality'>
                <p>{marketplace}</p>
                <p>Royality: {royality()}%</p>
            </div>
            {/*<span className='separate_line'></span>*/}
            {/*<div className='collectors'>*/}
            {/*    <p>Collectors</p>*/}
            {/*    <div className='percentage'>*/}
            {/*        <div className='percentage_container'>*/}
            {/*            <div className='percentage_bar'></div>*/}
            {/*        </div>*/}
            {/*        <p>34%</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className='sale_chance'>*/}
            {/*    <p>Sale Chance</p>*/}
            {/*    <div className='percentage'>*/}
            {/*        <div className='percentage_container'>*/}
            {/*            <div className='percentage_bar'></div>*/}
            {/*        </div>*/}
            {/*        <p>34%</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<button className='buy_button'><ShoppingBagIcon fontSize={"small"}/>{price}tz</button>*/}

        </div>
    );
};

export default Objkt;