const formatOrders = require('./formatOrders');
const logger = require("./logger");
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function query_new_orders(){
    return fetch('https://www.wixapis.com/restaurants/v3/orders?status=NEW',{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": process.env.WIX_AUTH,
            "wix-account-id": process.env.WIX_ACCOUNT_ID,
            "wix-site-id": process.env.WIX_SITE_ID
        },
        
    })
    .then((response) => response.json())
    .then((data) => {
        let orders = []
        data["orders"].map((order) => {
            orders.push(order)
        })
        
        formattedOrders = formatOrders(orders)
        orders = formattedOrders["orders"]
        orderIDs = formattedOrders["orderIDs"]

        print(orders)
        console.log(orders)
        console.log(orderIDs)

        if(orderIDs.length > 0){
            logger.info("New orders to accept")
            logger.info("")
            // accept_orders(orderIDs)
        }else{
            logger.info("No orders to accept")
        }
    });
}

query_new_orders()