This package makes it easy to load, validate and perform operations on csv files.

To stream each row, import and execute the IloadCsv function. The function requires the following parameters:
dataLoad - an array of strings or a path to a file.

optionParse - the parse options object. Possible options: {delimiter: "String delimiter"}
{delimiter:"String delimiter",
quotes:`"`|`'`|`\`` - delimiter surrounded by quotes}
{delimiter:"String delimiter",
  symbol:"The character that will come before the delimiter and escape it"}
    
validator: Enumeration of column types to validate. The number of columns is taken into account and the possible type is string, number or date. If cells can have different values, use a string. If the number of fields can vary, specify a null validator.

header: Skip the header. true or false

successLoad:(data:string[])=>void function that is executed on successful validation. It should take an array of strings. If the validator is null, the function is executed for each row.

errorLoad:(data:string[])=>void; a function that is executed when validation fails. It should take an array of strings.



To get a simple breakdown of data into columns, import the IreturnCsv function. The function requires the following parameters:
dataLoad - an array of strings or a path to a file.

optionParse - the parse options object. Possible options: {delimiter: "String delimiter"}
{delimiter:"String delimiter",
quotes:`"`|`'`|`\`` - delimiter surrounded by quotes}
{delimiter:"String delimiter",
  symbol:"The character that will come before the delimiter and escape it"}
    
validator: Enumeration of column types to validate. The number of columns is taken into account and the possible type is string, number or date. If cells can have different values, use a string. If the number of fields can vary, specify a null validator.

header: Skip the header. true or false

IreturnCsv function returns string[][]





Этот пакет позволяет легко загружать, проверять корректность и выполнять операции над csv файлами. 

Для потоковой обработки каждой строки импортируйте и выполните функцию IloadCsv. Функция требует следующие парраметры:
dataLoad - массив строк или путь до файла.

optionParse - объект опций разбора. Возможные варианты: {delimiter: "Строка разделитель"}
{delimiter:"Строка разделитель",
quotes:`"`|`'`|`\`` - разделитель обрамленный кавычками}
{delimiter:"Строка разделитель",
 symbol:"Символ, который будет идти перед разделителем и экранировать его"}
    
validator: Перечесление типов столбцов для валидации. Учитывается количество столбцов и возможный тип - строка, число или дата. Если в ячейки могут быть разные значения используйте строку. Если количество полей может быть разным, укажите валидатор null.

header: Пропуск заголовка. true или false 

successLoad:(data:string[])=>void функция, которая выполняется при успешной валидации. Она должна принимать массив строк. Если валидатор равен null, функция выполняется для каждой строки.

errorLoad:(data:string[])=>void; функция, которая выполняется при неуспешной валидации. Она должна принимать массив строк.



Для получения простого разбития данных на столбцы, импортируйте функцию IreturnCsv. Функция требует следующие парраметры:
dataLoad - массив строк или путь до файла.

optionParse - объект опций разбора. Возможные варианты: {delimiter: "Строка разделитель"}
{delimiter:"Строка разделитель",
quotes:`"`|`'`|`\`` - разделитель обрамленный кавычками}
{delimiter:"Строка разделитель",
 symbol:"Символ, который будет идти перед разделителем и экранировать его"}
    
validator: Перечесление типов столбцов для валидации. Учитывается количество столбцов и возможный тип - строка, число или дата. Если в ячейки могут быть разные значения используйте строку. Если количество полей может быть разным, укажите валидатор null.

header: Пропуск заголовка. true или false 

Функция IreturnCsv возвращает string[][]