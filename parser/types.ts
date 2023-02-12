interface IoptionFunctionSplitDataNoneEscape{
    delimiter:string
}

interface IoptionFunctionSplitDataWithEscapeQuotes{
    delimiter:string,
    quotes:`"`|`'`|`\``
}

interface IoptionFunctionSplitDataWithEscapeSymbol{
    delimiter:string,
    symbol:string
}

type TrowTypeAll="string"|"number"|"date"

interface IloadCsv{
    dataLoad:string[]|string,
    optionParse:IoptionFunctionSplitDataNoneEscape|
    IoptionFunctionSplitDataWithEscapeQuotes|
    IoptionFunctionSplitDataWithEscapeSymbol,
    validator:TrowTypeAll[]|null,
    header:boolean,
    successLoad:(data:string[])=>void,
    errorLoad:(data:string[])=>void;    
}

interface IreturnCsv{
    dataLoad:string[]|string,
    optionParse:IoptionFunctionSplitDataNoneEscape|
    IoptionFunctionSplitDataWithEscapeQuotes|
    IoptionFunctionSplitDataWithEscapeSymbol,
    validator:TrowTypeAll[]|null,
    header:boolean
}

interface IreturnCsvData{
    dataSuccess: string[][],
    dataError: string[][]
}

type allOption=IoptionFunctionSplitDataNoneEscape|IoptionFunctionSplitDataWithEscapeQuotes|IoptionFunctionSplitDataWithEscapeSymbol
//type fileOrStrings=File|string[]

export{
    IoptionFunctionSplitDataNoneEscape,
    IoptionFunctionSplitDataWithEscapeQuotes,   
    IoptionFunctionSplitDataWithEscapeSymbol,   
    TrowTypeAll,  
    IloadCsv,
    IreturnCsv,
    IreturnCsvData,
    allOption,
    //fileOrStrings
}