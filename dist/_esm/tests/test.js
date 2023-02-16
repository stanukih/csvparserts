import { processingCsvByLine, returnCsvByLine } from "../parser/index";
let a = returnCsvByLine({
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
processingCsvByLine(({
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