const {EscPos} = require("@tillpos/xml-escpos-helper");
const builder = require('xmlbuilder');
const connectToPrinter = require("./connectToPrinter");
const fs = require('fs');
const logger = require('./logger')

const PRINTER = {
    devince_name: "EPSON_Printer",
    host: "23.243.244.219",
    port: 9100,
};

const printJob = async (orders) => {
    orders.map((order) => {
        logger.info(order)
        if(order.fulfillment == "PICKUP"){
            const template = fs.readFileSync(`./wix-orders-check/wix-webhook/pickupTemplates/template${order.items.length}.xml`, {encoding: "utf8"});
            const message = EscPos.getBufferFromTemplate(template, order);
            try{
                connectToPrinter(PRINTER.host, PRINTER.port, message);
            }catch(err){
                console.log("Error: ", err);
            }
        }else{
            const template = fs.readFileSync(`./wix-orders-check/wix-webhook/deliveryTemplates/template${order.items.length}.xml`, {encoding: "utf8"});
            const message = EscPos.getBufferFromTemplate(template, order);
            try{
                connectToPrinter(PRINTER.host, PRINTER.port, message);
            }catch(err){
                console.log("Error: ", err);
            }
        }
    })    
};
module.exports = printJob;
