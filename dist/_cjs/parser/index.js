"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processingCsvByLine = exports.returnCsvByLine = void 0;
const fs = __importStar(require("fs"));
function isOptionFunctionSplitDataWithEscapeQuotes(option) {
    if (`quotes` in option) {
        return true;
    }
    return false;
}
function isOptionFunctionSplitDataWithEscapeSymbol(option) {
    if (`symbol` in option) {
        return true;
    }
    return false;
}
function splitDataNoneEscape(dataSplit, option) {
    return dataSplit.split(option.delimiter);
}
function splitDataByQuotes(dataSplit, option) {
    const dataSplitQuotes = dataSplit.split(option.quotes);
    let dataOutput = [];
    for (let i = 0; i < dataSplitQuotes.length; i++) {
        if (i % 2 === 0) {
            let dataSplitDelimiter = dataSplitQuotes[i].split(option.delimiter);
            for (let j = 0; j < dataSplitDelimiter.length; j++) {
                if (dataSplitDelimiter[j] != "") {
                    dataOutput.push(dataSplitDelimiter[j]);
                }
            }
        }
        else {
            dataOutput.push(dataSplitQuotes[i]);
        }
    }
    return dataOutput;
}
function splitDataWithEscapeSymbol(dataSplit, option) {
    let dataOutput = [];
    for (let index = 0; index < dataSplit.length; index++) {
        if (dataSplit[index] === option.delimiter) {
            if (index === 0) {
                dataOutput.push("");
                dataSplit = dataSplit.substring(1);
                index = -1;
                continue;
            }
            else {
                if (dataSplit[index - 1] !== option.symbol) {
                    dataOutput.push(dataSplit.slice(0, index));
                    dataSplit = dataSplit.substring(index + 1);
                    index = -1;
                    continue;
                }
                else {
                    dataSplit = dataSplit.substring(0, index - 1) + dataSplit.substring(index);
                }
            }
        }
        if (index === dataSplit.length - 1) {
            dataOutput.push(dataSplit);
        }
    }
    return dataOutput;
}
function csvFromStr(dataSplit, option) {
    if (isOptionFunctionSplitDataWithEscapeQuotes(option)) {
        return splitDataByQuotes(dataSplit, option);
    }
    if (isOptionFunctionSplitDataWithEscapeSymbol(option)) {
        return splitDataWithEscapeSymbol(dataSplit, option);
    }
    return splitDataNoneEscape(dataSplit, option);
}
function validatorCsv(data, validator) {
    if (data.length !== validator.length) {
        return false;
    }
    for (let index = 0; index < data.length; index++) {
        switch (validator[index]) {
            case 'date':
                if (isNaN(Date.parse(data[index]))) {
                    return false;
                }
                return true;
            case 'number':
                if (isNaN(Number(data[index]))) {
                    return false;
                }
                return true;
        }
    }
    return true;
}
function processingCsvByLine(option) {
    if (typeof option.dataLoad !== 'string') {
        option.dataLoad.forEach((element) => {
            if (option.header) {
                option.header = false;
                return;
            }
            let csv = csvFromStr(element, option.optionParse);
            if (option.validator) {
                if (validatorCsv(csv, option.validator)) {
                    option.successLoad(csv);
                }
                else {
                    option.errorLoad(csv);
                }
            }
            else {
                option.successLoad(csv);
            }
        });
    }
    else {
        let dataFromFile = fs.readFileSync(option.dataLoad).toString().split("\n");
        option.dataLoad = dataFromFile;
        processingCsvByLine(option);
    }
}
exports.processingCsvByLine = processingCsvByLine;
function returnCsvByLine(option) {
    let dataSuccess = [];
    let dataError = [];
    let dataOutput = {
        dataSuccess: [],
        dataError: []
    };
    if (typeof option.dataLoad !== 'string') {
        option.dataLoad.forEach((element) => {
            if (option.header) {
                option.header = false;
                return;
            }
            let csv = csvFromStr(element, option.optionParse);
            if (option.validator) {
                if (validatorCsv(csv, option.validator)) {
                    dataSuccess.push(csv);
                }
                else {
                    dataError.push(csv);
                }
            }
            else {
                dataSuccess.push(csv);
            }
        });
        dataOutput = {
            dataSuccess,
            dataError
        };
    }
    else {
        let dataFromFile = fs.readFileSync(option.dataLoad).toString().split("\n");
        option.dataLoad = dataFromFile;
        dataOutput = returnCsvByLine(option);
    }
    return dataOutput;
}
exports.returnCsvByLine = returnCsvByLine;
//# sourceMappingURL=index.js.map