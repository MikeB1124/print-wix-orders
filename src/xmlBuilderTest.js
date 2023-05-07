const { create } = require('xmlbuilder2');

// const xmlStr = '<root att="val"><foo><bar>foobar</bar></foo></root>';
// const doc = create(xmlStr);

// // append a 'baz' element to the root node of the document
// doc.root().ele('baz');

// const xml = doc.end({ prettyPrint: true });
// console.log(xml);

function initializeXML(){
    const xmlStr = '<document><align mode="center"><bold><text-line size="8.0">Trimana Grill</text-line></bold><text-line size="3.0">10920 Wilshire Blvd</text-line><text-line size="3.0">Los Angeles, CA 90024</text-line></align></document>'
    let doc = create(xmlStr)
    doc = doc.root().ele('line-feed')
    doc = doc.root().ele('line-feed')
    
    return doc
}

function pickupOrder(doc){
    doc = doc.root().ele('align', {mode: 'left'})
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('Order Number: {{id}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('{{fulfillment}}: {{customerName}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('Phone Number: {{customerNumber}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('Payment: {{paymentType}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('DUE: {{dueDate}}')
    doc = doc.root().ele('line-feed')
    doc = doc.root().ele('line-feed')
    return doc
}

function deliveryOrder(doc){
    doc = doc.root().ele('align', {mode: 'left'})
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('Order Number: {{id}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('{{fulfillment}}: {{customerName}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('Phone Number: {{customerNumber}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('Address: {{deliveryAddress}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('Payment: {{paymentType}}')
    doc = doc.root().ele('bold').ele('text-align', {size: '8.0'}).txt('DUE: {{dueDate}}')
    doc = doc.root().ele('line-feed')
    doc = doc.root().ele('line-feed')
    return doc
}

function itemsHeader(doc){
    doc = doc.root().ele('align', {mode: 'center'}).ele('bold').ele('text-line', {size: '8.0'}).txt('Items')
    doc = doc.root().ele('line-feed')
    return doc
}

function itemsBody(doc){

}

doc = initializeXML()
// doc = pickupOrder(doc)
doc = itemsHeader(doc)
// doc = businessAddress(doc)
const xml = doc.end({ prettyPrint: true});
console.log(xml);