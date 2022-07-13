import React, {useEffect, useState} from 'react';
import '../styles/Objkt.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Objkt = ({data}) => {
    const [info1, setInfo1] = useState()
    useEffect( () => {
        if(data.id){
            getInfo(data.id)
        }
    }, [])


    async function royalty() {
        let amount = await getInfo(data.id)
        return amount
    }

    async function getInfo(id) {
        let results = await fetch('https://data.objkt.com/v2/graphql', {
            method: 'POST', body: JSON.stringify({
            query: `query MyQuery {
                listing_by_pk(id: "${id}") {
                    id
                    amount
                    amount_left
                    price
                    marketplace {
                    group
                    name
                    subgroup
                    }
                    token {
                    royalties {
                        amount
                        decimals
                    }
                    }
                }
                }
                `
            })
        })
        let info = await results.json();
        console.log(info.data.listing_by_pk.id)
        setInfo1(info.data.listing_by_pk.id)
        return info.data
    }

    function image() {
        let ipfs = '';
        if (data.metadata) {
            if (data.metadata.artifactUri) {
                ipfs = data.metadata.artifactUri;
            }
            ipfs = data.metadata.displayUri;

            if (data.contract.address !== 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton' && data.metadata.name !== '[WAITING TO BE SIGNED]' && data.metadata.thumbnailUri) {
                ipfs = data.metadata.thumbnailUri;
            }
        }

        let imageUri = ipfs.replace("ipfs://", "https://ipfs.io/ipfs/")
        return imageUri;
    }

    function marketplaceName() {
        let marketplace = ''
        switch (data.contract.alias) {
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
                marketplace = data.contract.alias;
        }


        if (marketplace.length > 20) {
            marketplace = marketplace.substr(0, 4) + '...' + marketplace.substr(-3, 4);
        }
        return marketplace;
    }

    let creatorText = ''
    if (data.metadata.creators) {
        creatorText = data.metadata.creators[0]
    } else {
        creatorText = 'undefined'
    }

    if (creatorText !== null && creatorText.length > 20) {
        creatorText = creatorText.substr(0, 4) + '...' + creatorText.substr(-3, 4);
    } else if (creatorText == null) {
        creatorText = 'generative'
    }

    const marketUrl = "https://objkt.com/asset/" + data.contract.address + "/" + data.tokenId;

    const marketArtistUrl = "https://nftbiker.xyz/artist?wallet=" + data.metadata.creators;

    let price = 0;
    if (data.balancesCount) {
        price = data.balancesCount;
    }

    // const edition = props.data.totalMinted
    // if (marketplace.length > 9999) {
    //     marketplace = '+9999'
    // }

    return (<div className='objkt'>
        <a href={marketUrl} target="_blank" rel="noopener noreferrer">
            <img className="image" src={image()}/>
        </a>
        <div className='creator_and_edition'>
            <a className='creator' href={marketArtistUrl} target="_blank" rel="noopener noreferrer">
                <AccountBoxIcon fontSize={"small"}/>
                <p>{creatorText}</p>
            </a>
            <p>ed.</p>
        </div>
        <div className='marketplace_and_royality'>
            <p>{marketplaceName()}</p>
            <p>Royalty: {info1?  info1 :"-"}</p>

            {/* <p>Royalty: {info.data.listing_by_pk.price? info.data.listing_by_pk.price:"-"}</p> */}
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

    </div>);
};

export default Objkt;
