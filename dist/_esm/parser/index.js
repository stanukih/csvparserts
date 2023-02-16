import * as fs from 'fs';
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
export { returnCsvByLine, processingCsvByLine };
//# sourceMappingURL=index.js.map