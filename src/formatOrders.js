const formatPhoneNumber = require("./utils")





function formatOrders(orders){
    let parsedArray = []
    let orderIDs = []

    orders.map((order) => {
        orderIDs.push(order.id)
        if(order.fulfillment.type == "PICKUP"){
            let orderSchema = {
                "id": order.id,
                "customerName": order.customer.firstName + " " + order.customer.lastName,
                "customerNumber": formatPhoneNumber(order.customer.phone.slice(2)),
                "fulfillment": order.fulfillment.type,
                "dueDate": order.fulfillment.promisedTime,
                "items": order.lineItems,
                "paymentType": order.payments[0].method == "offline" ? "CASH" : "CARD",
                "orderComment": order.comment,
                "tax": order.totals.tax,
                "tip": order.totals.tip ? order.totals.tip : "0.00",
                "subTotal": order.totals.subtotal,
                "total": order.totals.total,
            }

            if(order.comment){
                orderSchema["orderComment"] = order.comment
            }

            orderSchema.items.map((item, i) => {
                orderSchema[`item${i}`] = `${item.quantity} X ${item.catalogReference.catalogItemName}............$${item.price}`
                item.dishOptions.map((option, j) => {
                    if(option.selectedChoices.length > 0){
                        if(option.name == "Add-Ons"){
                            let addOnsString = ""
                            option.selectedChoices.map((selected) => {
                                addOnsString = addOnsString + `${selected.catalogReference.catalogItemName} ($${selected.price}), `
                            })
                            orderSchema[`item${i}Option${j}`] = `${option.name}: ${addOnsString}`
                        }else{
                            orderSchema[`item${i}Option${j}`] = `${option.name}: ${option.selectedChoices[0].catalogReference.catalogItemName}  +$${option.selectedChoices[0].price}`
                        }
                    }
                })
                if(item.comment){
                    orderSchema[`item${i}Comment`] = item.comment
                }
            })


            parsedArray.push(orderSchema)
        }else{
            let orderSchema = {
                "id": order.id,
                "customerName": order.customer.firstName + " " + order.customer.lastName,
                "customerNumber": formatPhoneNumber(order.customer.phone.slice(2)),
                "fulfillment": order.fulfillment.type,
                "dueDate": order.fulfillment.promisedTime,
                "deliveryAddress": order.fulfillment.deliveryDetails.address.formatted,
                "items": order.lineItems,
                "paymentType": order.payments[0].method == "offline" ? "CASH" : "CARD",
                "orderComment": order.comment,
                "tax": order.totals.tax,
                "tip": order.totals.tip ? order.totals.tip : "0.00",
                "subTotal": order.totals.subtotal,
                "total": order.totals.total,
            }

            if(order.comment){
                orderSchema["orderComment"] = `Order Notes: ${order.comment}`
            }

            orderSchema.items.map((item, i) => {
                orderSchema[`item${i}`] = `${item.quantity} X ${item.catalogReference.catalogItemName}............$${item.price}`

                item.dishOptions.map((option, j) => {
                    if(option.selectedChoices.length > 0){
                        if(option.name == "Add-Ons"){
                            let addOnsString = ""
                            option.selectedChoices.map((selected) => {
                                addOnsString = addOnsString + `${selected.catalogReference.catalogItemName} ($${selected.price}), `
                            })
                            orderSchema[`item${i}Option${j}`] = `${option.name}: ${addOnsString}`
                        }else{
                            orderSchema[`item${i}Option${j}`] = `${option.name}: ${option.selectedChoices[0].catalogReference.catalogItemName}  +$${option.selectedChoices[0].price}`
                        }
                    }
                })
                if(item.comment){
                    orderSchema[`item${i}Comment`] = `Comment: ${item.comment}`
                }
            })

            parsedArray.push(orderSchema)
        }
    })

    return {orders: parsedArray, orderIDs: orderIDs}
}

module.exports=formatOrders