export const moreData = (props) => {
    let output = {}

    props.map(async x => {
            const request = await fetch('https://data.objkt.com/v2/graphql', {
                method: 'POST',
                body: JSON.stringify({
                query: `query MyQuery {
                  event_by_pk(id: "${x.id}") {
                    id
                    amount
                    creator_address
                    event_type
                    fa_contract
                    marketplace_contract
                    price
                    token_pk
                  }
                }`
                })
            })

            const results = await request.json()
            output = results.data.event_by_pk
        console.log(output)
        }
    )
    // return output

}