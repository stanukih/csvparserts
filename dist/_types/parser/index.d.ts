import { IloadCsv, IreturnCsv, IreturnCsvData } from "./types";
declare function processingCsvByLine(option: IloadCsv): void;
declare function returnCsvByLine(option: IreturnCsv): IreturnCsvData;
export { returnCsvByLine, processingCsvByLine };
