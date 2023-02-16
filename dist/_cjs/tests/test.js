"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../parser/index");
let a = (0, index_1.returnCsvByLine)({
    dataLoad: "/home/stas/Загрузки/12.csv",
    optionParse: {
        delimiter: ",",
        symbol: "\\"
    },
    header: false,
    validator: null
    //validator:['number','number','string','string','string','string','string','string','string','string','number','number','number'],
    //successLoad:(data:string[])=>{console.log("success--"+data)},
    //errorLoad:(data:string[])=>{console.log("failed--"+data)}
});
(0, index_1.processingCsvByLine)(({
    dataLoad: "/home/stas/Загрузки/11.csv",
    optionParse: {
        delimiter: ",",
        symbol: "\""
    },
    header: false,
    validator: null,
    //validator:['number','number','string','string','string','string','string','string','string','string','number','number','number'],
    successLoad: (data) => { console.log("success--" + data); },
    errorLoad: (data) => { console.log("failed--" + data); }
}));
console.log(a);
//# sourceMappingURL=test.js.map