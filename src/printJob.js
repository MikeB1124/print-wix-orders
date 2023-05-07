const {EscPos} = require("@tillpos/xml-escpos-helper");
const connectToPrinter = require("./connectToPrinter");
const logger = require('./logger');
const TemplateBuilder = require("./TemplateBuilder");
require('dotenv').config()

const PRINTER = {
    devince_name: "EPSON_Printer",
    host: process.env.PRINTER_GATEWAY_IP_ADDR,
    port: process.env.PRINTER_PORT,
};

const printJob = async (orders) => {
    orders.map((order) => {
        logger.info(order)
        let template = new TemplateBuilder(order.fulfillment, order)
        const message = EscPos.getBufferFromTemplate(template.get_xml_template(), order);
        try{
            connectToPrinter(PRINTER.host, PRINTER.port, message);
        }catch(err){
            console.log("Error: ", err);
        }
    })    
};
module.exports = printJob;
