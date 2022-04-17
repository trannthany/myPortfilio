class UserInput{
    constructor(dollarValue, centValue){
        this.dollarValue = dollarValue;
        this.centValue = centValue;
    }
}

const textElement = document.querySelector('[data-text]');

function getInputValue(){
     let input = document.getElementById("inputId").value; 
    
     textElement.innerHTML = changeNumberToWords(input);   
}

function processInput(input){
    //check if input is a number, if it is not return null
    const stringNumber = input.replaceAll(',', '');
    if(isNaN(stringNumber)){
        return null;
    }

    let inputValues = stringNumber.split("."); 
     
    //round decimal to 2 digits
    let decimalStringsArr = `${inputValues[1]}`.split(""); //convert number to string
   
    let decimalValue ="";
  
    if(decimalStringsArr.length > 2){
        for(let i = decimalStringsArr.length -1 ; i > 0; i--){
           
            if( parseInt(decimalStringsArr[i]) >= 5 && i > 1){
                decimalStringsArr[i-1]= `${parseInt(decimalStringsArr[i-1]) + 1}`;         
            }
            
        }

        if(decimalStringsArr[1] >= 10){
            decimalStringsArr[0] = `${parseInt(decimalStringsArr[0]) + 1}`;
            decimalStringsArr[1] = "0";
        }

        if(decimalStringsArr[0] >= 10){
            inputValues[0] = `${parseInt(inputValues[0]) + 1}`;
            decimalStringsArr[0] = "0";
        }

        decimalValue = `${decimalStringsArr[0]}${decimalStringsArr[1]}`;
        if(isNaN(decimalValue)){
            decimalValue = parseInt(decimalValue)
            if(decimalValue===100){
                inputValues = parseInt(inputValues[0]) + 1;
                decimalValue = 0
            }
        }
                    
    }else if(decimalStringsArr.length === 2){
        decimalValue = `${decimalStringsArr[0]}${decimalStringsArr[1]}`;
    }else if(decimalStringsArr.length === 1){
        decimalValue = parseInt(decimalStringsArr[0]) * 10;
    }
    else{
        decimalValue = 0;        
    } 
        
    const userInput = new UserInput(inputValues[0], parseInt(decimalValue));
    return userInput;
}

function changeNumberToWords(input){       
    const USER_INPUT = processInput(input);
    if(!USER_INPUT) return "Your input is not a number.";
    
    let words = "" ;
    let dollarValueWords = "";
    
    if(USER_INPUT.dollarValue<0){
        words += "Negative ";
    }

    dollarValueWords =changeToEnglish(Math.abs(USER_INPUT.dollarValue));

    let centValueWords =""
    if(isNaN(USER_INPUT.centValue)){
        centValueWords = changeToEnglish(0);
    }
    else{
        centValueWords = changeToEnglish(USER_INPUT.centValue);
    }      
    //if dollarValueWords return "" then the inpurt must be very big.
    if(dollarValueWords ===""){
        words = "It is too big."
    }
    else{
        
        //console.log(typeof dollarValueWords + " : " + typeof centValueWords);
        //check plural
        if((dollarValueWords==="One" || dollarValueWords ==="Zero") && (centValueWords === "One" || centValueWords ==="Zero")){
            words += dollarValueWords + " Dollar and " + centValueWords + " cent."; 
        }else if ((dollarValueWords==="One" || dollarValueWords ==="Zero") && (centValueWords !== "One" || centValueWords !=="Zero")){
            words += dollarValueWords + " Dollar and " + centValueWords + " cents.";
        }else if((dollarValueWords!=="One" || dollarValueWords !=="Zero") && (centValueWords === "One" || centValueWords ==="Zero")){
            words += dollarValueWords + " Dollars and " + centValueWords + " cent.";
        }else{
            words += dollarValueWords + " Dollars and " + centValueWords + " cents.";
        }     
         
    }
    return words;            
}

function changeToEnglish(numericalValue){
    let words = ""
    if (numericalValue < 10 && numericalValue >= 0){
        words += getSingleDigit(numericalValue)
    }else if (numericalValue >= 10 && numericalValue < 20){
        words += getTwoDigits(numericalValue);
    }else if (numericalValue >= 20 && numericalValue <100){
        words +=getTenMultiply(Math.floor(numericalValue/10));

        if(numericalValue % 10 !== 0){
            words += " " + changeToEnglish(numericalValue % 10);
        }

    }else if (numericalValue >=100 && numericalValue < 1000){
        words += getSingleDigit(Math.floor(numericalValue/100)) + " ";
        words += getTenPower(2);

        if(numericalValue % 100 !== 0){
            words += " " + changeToEnglish(numericalValue % 100);
        }
    }
    else if(numericalValue >= 1000 && numericalValue < 1000000){
        words += changeToEnglish(Math.floor(numericalValue/1000));
        words += " " + getTenPower(3);
        
        if(numericalValue % 1000 !== 0){
            words += ", " + changeToEnglish(numericalValue % 1000)
        }
    }else if(numericalValue >= 1000000 && numericalValue <1000000000){
        words += changeToEnglish(Math.floor(numericalValue/1000000));
        words += " " + getTenPower(6);

        if(numericalValue % 1000000 !== 0){
            words += ", " + changeToEnglish(numericalValue % 1000000)
        }
    }else if(numericalValue >= 1000000000 && numericalValue <1000000000000){
        words += changeToEnglish(Math.floor(numericalValue/1000000000));
        words += " " + getTenPower(9);

        if(numericalValue % 1000000000 !== 0){
            words += ", " + changeToEnglish(numericalValue % 1000000000)
        }
    }else if(numericalValue >= 1000000000000 && numericalValue <1000000000000000){
        words += changeToEnglish(Math.floor(numericalValue/1000000000000));
        words += " " + getTenPower(12);

        if(numericalValue % 1000000000000 !== 0){
            words += ", " + changeToEnglish(numericalValue % 1000000000000)
        }
    }else{
        words = "";
    }
    return words;
}

function getSingleDigit(number){
    const SINGLE_NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  
    return SINGLE_NUMBER_WORDS[number];
}

function getTwoDigits(number){
    const TWO_DIGITS_NUMBER_WORDS=["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    return TWO_DIGITS_NUMBER_WORDS[number % 10];
}

function getTenMultiply(number){
    const TEN_MULTIPLE_WORDS = ["Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    return TEN_MULTIPLE_WORDS[number - 2]
}

function getTenPower(number){
    const TEN_POWER_WORDS = ["Hundred", "Thousand", "", "", "Million", "", "", "Billion","","","Trillion"];
    return TEN_POWER_WORDS[number - 2]
}

//Read from testInputs.txt file
var selected = document.querySelector("[data-file-upload]");
var textArea = document.querySelector("[data-text-area]");
var clearTextBTN = document.querySelector("[data-clear-text]");

selected.addEventListener("change", () => {
    let files = selected.files;
    if(files.length == 0) return;
    const file = files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split("\n");
       
        let words ="";      
       
        for(let i = 0; i < lines.length ; i++){
           // console.log(lines[i].trim());
            words = changeNumberToWords(lines[i].trim());
            textArea.value += lines[i] + ":=> " + words + "\n\n";
        }     
       
    };

    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
});

clearTextBTN.addEventListener("click", () =>{
    textArea.value = '';  
});