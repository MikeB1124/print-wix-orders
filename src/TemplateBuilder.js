const { create } = require('xmlbuilder2');

class TemplateBuilder {
  constructor(type, order) {
    this.type = type;
    this.order = order;
    this.xmlTemplate = ""

    //Create Order XML Template
    this.#initialize_temp()
    this.#order_type_temp()
    this.#items_header_temp()
    this.#items_temp()
    this.#order_comment_temp()
    this.#order_cost_temp()
    this.#cut_paper_temp()
    this.#end_temp()
  }

  get_xml_template() {
    let xml = create(this.xmlTemplate)
    let xmlFormatted = xml.end({prettyPrint: true})
    return xmlFormatted
  }

  #initialize_temp() {
    let xml = '<align mode="center">' + 
      '<bold><text-line size="8.0">Trimana Grill</text-line></bold>' +
      '<text-line size="3.0">10920 Wilshire Blvd</text-line>' + 
      '<text-line size="3.0">Los Angeles, CA 90024</text-line>' +
      '</align>' +
      '<line-feed/>' +
      '<line-feed/>'

      this.xmlTemplate += xml
  }

  #order_type_temp() {
    let xml = ""
    if(this.type == "PICKUP"){
      xml = '<align mode="left">' + 
        '<bold><text-line size="8.0">Order Numebr: {{id}}</text-line></bold>' +
        '<bold><text-line size="8.0">{{fulfillment}}: {{customerName}}</text-line></bold>' + 
        '<bold><text-line size="8.0">Phone Number: {{customerNumber}}</text-line></bold>' +
        '<bold><text-line size="8.0">Payment: {{paymentType}}</text-line></bold>' +
        '<bold><text-line size="8.0">DUE: {{dueDate}}</text-line></bold>' +
        '</align>' +
        '<line-feed/>' +
        '<line-feed/>'
    }else{
      xml = '<align mode="left">' + 
        '<bold><text-line size="8.0">Order Numebr: {{id}}</text-line></bold>' +
        '<bold><text-line size="8.0">{{fulfillment}}: {{customerName}}</text-line></bold>' + 
        '<bold><text-line size="8.0">Phone Number: {{customerNumber}}</text-line></bold>' +
        '<bold><text-line size="8.0">Address: {{deliveryAddress}}</text-line></bold>' +
        '<bold><text-line size="8.0">Payment: {{paymentType}}</text-line></bold>' +
        '<bold><text-line size="8.0">DUE: {{dueDate}}</text-line></bold>' +
        '</align>' +
        '<line-feed/>' +
        '<line-feed/>'
    }
    this.xmlTemplate += xml
  }

  #items_header_temp() {
    let xml = '<align mode="center">' + 
        '<bold><text-line size="8.0">Items</text-line></bold>' +
        '</align>' +
        '<line-feed/>'
    this.xmlTemplate += xml
  }

  #items_temp() {
    let xml = ""
    for(let i = 0; i < this.order["items"].length; i++){
      xml += `<bold><text-line size="10.0">{{item${i}}}</text-line></bold>`
        + `<text-line size="3.0">{{item${i}Option0}}</text-line>`
        + `<text-line size="3.0">{{item${i}Option1}}</text-line>`
        + `<text-line size="3.0">{{item${i}Option2}}</text-line>`
        + `<text-line size="3.0">{{item${i}Option3}}</text-line>`
        + `<text-line size="3.0">{{item${i}Option4}}</text-line>`
        + `<text-line size="3.0">{{item${i}Comment}}</text-line>`
        + `<line-feed/>`
    }
    xml = xml.replace (/^/,'<align mode="left">');
    xml += "</align>"
      + "<line-feed/>"
    this.xmlTemplate += xml
  }

  #order_comment_temp() {
    if(this.order["orderComment"] != ""){
      let xml = '<align mode="left">' + 
        '<bold><text-line size="10.0">{{orderComment}}</text-line></bold>' +
        '</align>' +
        '<line-feed/>'
      this.xmlTemplate += xml
    }
  }

  #order_cost_temp() {
    let xml = '<align mode="right">' + 
      '<bold><text-line size="5.0">Sub-total: ${{subTotal}}</text-line></bold>' +
      '<bold><text-line size="5.0">Tax: ${{tax}}</text-line></bold>' +
      '<bold><text-line size="5.0">Tip: ${{tip}}</text-line></bold>' +
      '<bold><text-line size="5.0">Total: ${{total}}</text-line></bold>' +
      '</align>' +
      '<line-feed/>'
    this.xmlTemplate += xml
  }

  #cut_paper_temp() {
    this.xmlTemplate += "<paper-cut/>"
  }

  #end_temp() {
    let xml = this.xmlTemplate
    xml = xml.replace (/^/,'<document>');
    xml += "</document>"
    this.xmlTemplate = xml
  }
}


module.exports = TemplateBuilder