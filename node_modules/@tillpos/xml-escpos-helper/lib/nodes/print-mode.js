"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class PrintModeNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        if (this.attributes.mode === 'U220') {
            bufferBuilder.setPrintMode(false);
        }
        else {
            bufferBuilder.setPrintMode(true);
        }
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.resetAlign();
        return bufferBuilder;
    }
}
exports.default = PrintModeNode;
