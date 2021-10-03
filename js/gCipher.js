const gCipher = function(text, key, func, printAll = true ){
    function decryptText(charCode, key, mn , mx){
        if (charCode - key < mn){
            //bounding the charCode between range for the aphabetical chars
            charCode = mx + 1 - (mn - (charCode - key));
        } else charCode -= key;
        return String.fromCharCode(charCode)
    }
    function encryptText(charCode, key, mn, mx){
        if (charCode + key > mx){
            charCode = mn - 1 + ((charCode + key) - mx);
        } else charCode += key;
        return String.fromCharCode(charCode)
    }
    
    let i = 0; // char counter
    const textLength = text.length;
    const transformedText = [];
    const method = (func === 'encrypt') ? encryptText: decryptText;
    let j = 0; //key counter
    const keys = key.toString().split('');
    const keyLength = keys.length;

    while (i < textLength){
        key = +keys[j];
        let charCode = text.charCodeAt(i);
        if (text[i] === ' ' || text[i] === '\n'){
            transformedText.push(text[i]);
            j--;
        } else if (charCode >= 65 && charCode <= 90){
            transformedText.push(method(charCode, key, 65, 90));
        } else if (charCode >= 97 && charCode <= 122){
            transformedText.push(method(charCode, key, 97, 122));
        } else if (charCode >= 48 && charCode <= 58){
            transformedText.push(method(charCode, key, 48, 57))
        } else if (charCode >= 0 && charCode <=255){
            transformedText.push(method(charCode, key, 0, 255));
        } else {
            transformedText.push('#')
        }
    
        i++;
        j++;
        if (j === keyLength){
            j = 0;
        }
    }
    if (printAll) {
        console.log(`
        plain text: ${text}
        
        transformed text: ${transformedText.join("")}`)

        function save(filename, data) {
          const blob = new Blob([data], {type: 'text/csv'});
          if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
          }
          else{
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
          }
        }
        save('newFile.txt', transformedText);

    }
    return (transformedText.join(""))
};

const fileUpload = document.getElementById("inputFile");
const encr = document.getElementById("encrypt"); 
const decr = document.getElementById('decrypt');
const plainTextPara = document.getElementById('plain');
const output = document.getElementById("output");
let text;

fileUpload.addEventListener('change', () => {

    //initialize file reader
    let fr = new FileReader();
    fr.readAsText(fileUpload.files[0]);
    fr.onload = function(){
        plainTextPara.innerHTML = fr.result;
        text = fr.result;
        encr.style.display = 'inline';
        decr.style.display = 'inline';
    };
});
encr.addEventListener('onclick', () => {
    alert('encriptuin')
    let key = prompt('Enter encryption key');
    console.log(key);
    let transformed = gCipher(text, key, 'encrypt');
    let outputPara = document.createElement("p");
    outputPara.innerHTML = transformed;
    output.appendChild(outputPara);
});

function encrypt(){
    let key = prompt('Enter encryption key');
    console.log(key);
    let transformed = gCipher(text, key, 'encrypt');
    let outputPara = document.createElement("p");
    outputPara.innerHTML = transformed;
    output.appendChild(outputPara);
}
function decrypt(){
    let key = prompt('Enter decryption key');
    console.log(key);
    let transformed = gCipher(text, key, 'decrypt');
    let outputPara = document.createElement("p");
    outputPara.innerHTML = transformed;
    output.appendChild(outputPara);
}
//module.exports = gCipher;
