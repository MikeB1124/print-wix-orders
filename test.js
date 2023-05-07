const TemplateBuilder = require("./src/TemplateBuilder")


let testOrder = {
    id: '807419443224',
    customerName: 'Michael Balian',
    customerNumber: '(818) 689-5373',
    fulfillment: 'PICKUP',
    dueDate: '2023-04-24T18:30:00Z',
    items: [1, 2, 3],
    paymentType: 'CASH',
    orderComment: '',
    tax: '1.33',
    tip: '0.00',
    subTotal: '14.00',
    total: '15.33',
    item0: '1 X Deli Sandwich............$12.00',
    item0Option0: 'Choice of Meat: Turkey  +$0.00',
    item0Option1: 'Choice of Cheese: American  +$1.00',
    item0Option2: 'Sides: Fruit  +$0.00',
    item0Option3: 'Add-Ons: Avocado ($1.00), Jalapeño ($0.00), Onions ($0.00), ',
    item0Comment: 'Test Order'
}

function testTemplateBuilder(order) {
    let template = new TemplateBuilder(order.fulfillment, order)
    console.log(template.get_xml_template())
}

function comingSoonTestFunction() {
    
}