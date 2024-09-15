export class ListCreator {
    constructor(fileA){
        this.fileA = fileA;
    }

    async fetchData(url) {
        const response = await fetch(url);
        let words = response.json();
        return words;
        }

    startPage(){
        document.body.innerHTML = "";
        const wordsA = this.fetchData(this.fileA);
        wordsA.then(wordsA => {
            document.write("<div><h1>Remember words below</h1></div>");
            document.write("<br><button class=\"startQuizA\" type=\"button\">Start Quiz 1</button>");
            const btnStartQuizA = document.querySelector(".startQuizA");
            btnStartQuizA.addEventListener('click', e => {this.startQuizA();})
            document.write("<button class=\"startQuizB\" type=\"button\">Start Quiz 2</button><br><br>");
            const btnStartQuizB = document.querySelector(".startQuizB");
            btnStartQuizB.addEventListener('click', e => {this.startQuizB();})
            let btnDetail = [];
            for(let i=0;i<wordsA.length;i++){
                document.write("<div>" + 
                                    String(i+1) + ". " + wordsA[i].word +
                                "</div>");
                document.write("<div>" + 
                                    "Definition: " + wordsA[i].definitionA +
                                "</div><button class=\"detailedDefinitionB" + i + "\" data-index=" + i + " type=\"button\">Detailed Definition</button><br><br>");
                let nameButton = ".DetailedDefinitionB" + i
                btnDetail[i] = document.querySelector(nameButton);
                btnDetail[i].addEventListener('click', e => {
                    let indexA = btnDetail[i].getAttribute("data-index");
                    this.detailedDefinitionB(indexA);
                })
            }
            document.write("<br><br><a href=\"./index.html\">Go back to Index page.</a><br>");
        });
    }
    startQuizA(){
        document.body.innerHTML = "";
        const wordsA = this.fetchData(this.fileA);
        wordsA.then(wordsA => {
            let vocabs = [];
            for(let i=0;i<3;i++){
                let num = Math.floor(Math.random() * wordsA.length - 1) + 1;
                let newWordA = wordsA[num];
                vocabs.push(newWordA);
                wordsA.splice(num,1);
            }
            let numA = Math.floor(Math.random() * vocabs.length - 1) + 1;
            document.write("<div id=\"questionA\" data-word=" + vocabs[numA].word + "><h2>Please select a definition of the word \"" + vocabs[numA].word + "\"</h2></div><br>");
            for(let i=0;i<vocabs.length;i++){
                let txtNum = i+1;
                document.write("<div>" + 
                                    "<input type=\"radio\" name=\"wordlist\" value=" + vocabs[i].word + ">" +
                                    "<label for=" + vocabs[i].word + ">" + String(txtNum)+". "+vocabs[i].definitionA + "</label>" +
                                "</div>");
            }
            document.write("<br><button class=\"checkA\" type=\"button\">Answer</button>");
            const btnCheckA = document.querySelector(".checkA");
            btnCheckA.addEventListener('click', e => {this.checkA();})
            document.write("<button class=\"detailedDefinition\" type=\"button\">Detail</button>")
            const btnDetailedDefinition = document.querySelector(".detailedDefinition");
            btnDetailedDefinition.addEventListener('click', e => {this.detailedDefinition();})
            document.write("<br><br><button class=\"startQuizA\" type=\"button\">Another word</button>");
            const btnStartQuizA = document.querySelector(".startQuizA");
            btnStartQuizA.addEventListener('click', e => {this.startQuizA();})
            document.write("<button class=\"startPage\" type=\"button\">Go back to the word list</button>");
            const btnstartPage = document.querySelector(".startPage");
            btnstartPage.addEventListener('click', e => {this.startPage();})
        });
    }

    startQuizB(){
        document.body.innerHTML = "";
        const wordsA = this.fetchData(this.fileA);
        wordsA.then(wordsA => {
            let vocabs = [];
            for(let i=0;i<3;i++){
                let num = Math.floor(Math.random() * wordsA.length - 1) + 1;
                let newWordA = wordsA[num];
                vocabs.push(newWordA);
                wordsA.splice(num,1);
            }
            let numA = Math.floor(Math.random() * vocabs.length - 1) + 1;
            let dataHintA = "";
            for(let i=0;i<vocabs.length;i++){
                    dataHintA = dataHintA + "#" + vocabs[i].word;
            }
            document.write("<div id=\"questionA\" data-word=" + vocabs[numA].word + " data-hintA=" + dataHintA + "><h2>Please enter a word of the definition below." + 
                            "<br><br>Definition: " + vocabs[numA].definitionA + "</h2></div><br>");
            document.write("<label>Enter the word :</label>" + 
                            "<input type=\"text\" id=\"EnteredWord\" size=\"18\" />")
            document.write("<br><button class=\"hintA\" type=\"button\">Hint</button>");
            const btnHintA = document.querySelector(".hintA");
            btnHintA.addEventListener('click', e => {this.hintA();})
            document.write("<br><label id=\"hintC\"></label><br><br><button class=\"checkB\" type=\"button\">Answer</button>");
            const btnCheckB = document.querySelector(".checkB");
            btnCheckB.addEventListener('click', e => {this.checkB();})
            document.write("<button class=\"detailedDefinition\" type=\"button\">Detail</button>")
            const btnDetailedDefinition = document.querySelector(".detailedDefinition");
            btnDetailedDefinition.addEventListener('click', e => {this.detailedDefinition();})
            document.write("<br><br><button class=\"startQuizB\" type=\"button\">Another word</button>");
            const btnStartQuizB = document.querySelector(".startQuizB");
            btnStartQuizB.addEventListener('click', e => {this.startQuizB();})
            document.write("<button class=\"startPage\" type=\"button\">Go back to the word list</button><br>");
            const btnstartPage = document.querySelector(".startPage");
            btnstartPage.addEventListener('click', e => {this.startPage();})
            document.getElementById("EnteredWord").focus();
        });
    }

    hintA(){
        let hintB = "Hint:" + document.getElementById("questionA").getAttribute("data-hintA");
        let countA = 0;
        for(let i=0;i<hintB.length;i++){
            if(hintB.charAt(i)==="#"){
                countA++;
            }
        }
        let num = 1;
        for(let j=0;j<countA;j++){
            for(let i=0;i<hintB.length;i++){
                if(hintB.charAt(i)==="#"){
                    hintB = this.replaceCharAtIndex(hintB, i, String(num)+".");
                    num++;
                    break;
                }
            }
        }
        document.getElementById("hintC").innerHTML = hintB;
        document.getElementById("EnteredWord").focus();
    }
    replaceCharAtIndex(str, index, replacement) {
        return str.slice(0, index) + " " + replacement + str.slice(index + 1);
    }

    checkA(){
        let wordA = document.getElementById("questionA").getAttribute("data-word");
        let wordC = "";
        document.getElementsByName("wordlist")
            .forEach(radio => {
                if(radio.checked){
                    wordC = radio.value;
                }
            });
        if(wordA===wordC){
            alert("You are correct");
        }
        else{
            alert("That is the definition of \"" + wordC + "\".");
        }
    }
    checkB(){
        let wordA = document.getElementById("questionA").getAttribute("data-word");
        let wordC = document.getElementById("EnteredWord").value
        console.log(wordC)
        if(wordA===wordC){
            alert("You are correct");
        }
        else{
            alert("Sorry...Try again");
        }
    }
    detailedDefinition(){
        let wordA = document.getElementById("questionA").getAttribute("data-word");
        let wordIndex = 0;
        const wordsA = this.fetchData(this.fileA);
        wordsA.then(wordsA => {
            for(let i=0;i<wordsA.length;i++){
                if(wordsA[i].word===wordA){
                    wordIndex = i;
                    break;
                }
            }
            document.body.innerHTML = "";
            document.write("<div><h2>" + 
                            wordsA[wordIndex].word +
                        "</h2></div>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary.com:</h4></n>" + wordsA[wordIndex].definitionA +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary API:</h4></n>" + wordsA[wordIndex].definitionB +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Etymology:</h4></n>" + wordsA[wordIndex].etymology +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Example sentence:</h4></n>" + wordsA[wordIndex].example +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Synonym:</h4></n>" + wordsA[wordIndex].synonym +
                        "</div><br>");
            document.write("<button class=\"startPage\" type=\"button\">Go back to the word list</button>");
            const btnStartPage = document.querySelector(".startPage");
            btnStartPage.addEventListener('click', e => {this.startPage();})
            })
    }
    detailedDefinitionB(wordIndex){
        const wordsA = this.fetchData(this.fileA);
        wordsA.then(wordsA => {
            
            document.body.innerHTML = "";
            document.write("<div><h2>" + 
                            wordsA[wordIndex].word +
                        "</h2></div>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary.com:</h4></n>" + wordsA[wordIndex].definitionA +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary API:</h4></n>" + wordsA[wordIndex].definitionB +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Etymology:</h4></n>" + wordsA[wordIndex].etymology +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Example sentence:</h4></n>" + wordsA[wordIndex].example +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Synonym:</h4></n>" + wordsA[wordIndex].synonym +
                        "</div>");
            document.write("<br><button class=\"startPage\" type=\"button\">Go back to the word list</button>");
            const btnstartPage = document.querySelector(".startPAge");
            btnstartPage.addEventListener('click', e => {this.startPage();})
            })
    }

}
