let fs = require('fs');
let arg = process.argv;
let text, letter;
let i = 0, n = 1, s;
let testString = new String();

fs.readFile(arg[3], (err, data)=>{
    if (err){
        console.error(err);
        return;
    }
    text = data.toString();
    if (arg[2]=='code'){
        while (i<text.length){
            while (text.charAt(i) == text.charAt(i+n))
                n++;
            s=n;
            while (n>255){
                testString += '#' + String.fromCharCode(255) + text.charAt(i);
                n -= 255;
            }
            if (n>=4)
                testString += '#' + String.fromCharCode(n) + text.charAt(i);

            else if (text.charAt(i)=='#')
                testString += '#' + String.fromCharCode(n) + '#';
            else
                testString += text.slice(i, i+n);
                
            i += s;
            n = 1
        }
        fs.writeFileSync(arg[4], testString);
    }
    else if (arg[2] == 'decode'){
        while (i<text.length){
            if (text.charAt(i)=='#'){
                letter = text.charAt(i+2);
                testString += letter.repeat(text.charCodeAt(i+1));
                i += 3;
            }
            else{
                testString += text.charAt(i);
                i++;
            }
        }
        fs.writeFileSync(arg[4], testString);
    }
});
