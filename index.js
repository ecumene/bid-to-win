let oppbid1, oppbid2;
let yourbid1, yourbid2;
let trick1, trick2;
let youradj = [];
let oppadj = [];
let oppscore = 0;
let yourscore = 0;
let loop = 0;
let count = 0;
let cbuttons = document.getElementsByClassName("cbutton");
let buttons = document.getElementsByClassName("button");



document.getElementById("newround").addEventListener("click", trickGen)
document.getElementById("commit").addEventListener("click", Commit)
document.getElementById("clear").addEventListener("click", Test)
document.getElementById("card1").addEventListener("click", Card1)
document.getElementById("card2").addEventListener("click", Card2)
document.getElementById("card3").addEventListener("click", Card3)
document.getElementById("card4").addEventListener("click", Card4)
document.getElementById("card5").addEventListener("click", Card5)
document.getElementById("card6").addEventListener("click", Card6)
document.getElementById("card7").addEventListener("click", Card7)
document.getElementById("card8").addEventListener("click", Card8)
document.getElementById("card9").addEventListener("click", Card9)
document.getElementById("card10").addEventListener("click", Card10)


function Test(){
    for (i= 0; i < youradj.length; i++){
        youradj[i].disabled = true;
    }
    console.log(youradj);
}

function trickGen(){
    let a = Math.floor((Math.random() * 10) + 1);
    let b = Math.floor((Math.random() * 10) + 1);

    if (a != b){
        trick1 = a;
        trick2 = b;
    } else if (a == b && a % 2 == 0){
         trick1 = a - 1;
        trick2 = b;
    } else {
        trick1 = a;
        trick2 = b + 1;
    }

    document.getElementById("trick1").innerHTML = trick1;    
    document.getElementById("trick2").innerHTML = trick2;    

    document.getElementById("newround").disabled = true;
    
    for (i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
    }
}

function Commit(){
    count++;
    
    if (count % 2 != 0){
        document.getElementsById("yourbid1", "yourbid2").innerHTML = "-";
        // left off here for this function//
    }
}

function Clear(){
    console.log(youradj);
}

function Card1(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "1";
        yourbid1 = 1;
        document.getElementById("card1").disabled = true;
        youradj.push(document.getElementById("card1"));
    } else {
        document.getElementById("yourbid2").innerHTML = "1";
        yourbid2 = 1;
        youradj.push(document.getElementById("card1"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card2(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "2";
        yourbid1 = 2;
        document.getElementById("card2").disabled = true;
        youradj.push(document.getElementById("card2"));
    } else {
        document.getElementById("yourbid2").innerHTML = "2";
        yourbid2 = 2;
        youradj.push(document.getElementById("card2"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card3(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "3";
        yourbid1 = 3;
        document.getElementById("card3").disabled = true;
        youradj.push(document.getElementById("card3"));
    } else {
        document.getElementById("yourbid2").innerHTML = "3";
        yourbid2 = 3;
        youradj.push(document.getElementById("card3"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card4(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "4";
        yourbid1 = 4;
        document.getElementById("card4").disabled = true;
        youradj.push(document.getElementById("card4"));
    } else {
        document.getElementById("yourbid2").innerHTML = "4";
        yourbid2 = 4;
        youradj.push(document.getElementById("card4"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card5(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "5";
        yourbid1 = 5;
        document.getElementById("card5").disabled = true;
        youradj.push(document.getElementById("card5"));
    } else {
        document.getElementById("yourbid2").innerHTML = "5";
        yourbid2 = 5;
        youradj.push(document.getElementById("card5"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card6(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "6";
        yourbid1 = 6;
        document.getElementById("card6").disabled = true;
        youradj.push(document.getElementById("card6"));
    } else {
        document.getElementById("yourbid2").innerHTML = "6";
        yourbid2 = 6;
        youradj.push(document.getElementById("card6"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card7(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "7";
        yourbid1 = 7;
        document.getElementById("card7").disabled = true;
        youradj.push(document.getElementById("card7"));
    } else {
        document.getElementById("yourbid2").innerHTML = "7";
        yourbid2 = 7;
        youradj.push(document.getElementById("card7"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card8(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "8";
        yourbid1 = 8;
        document.getElementById("card8").disabled = true;
        youradj.push(document.getElementById("card8"));
    } else {
        document.getElementById("yourbid2").innerHTML = "8";
        yourbid2 = 8;
        youradj.push(document.getElementById("card8"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card9(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "9";
        yourbid1 = 9;
        document.getElementById("card9").disabled = true;
        youradj.push(document.getElementById("card9"));
    } else {
        document.getElementById("yourbid2").innerHTML = "9";
        yourbid2 = 9;
        youradj.push(document.getElementById("card9"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Card10(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "10";
        yourbid1 = 10;
        document.getElementById("card10").disabled = true;
        youradj.push(document.getElementById("card10"));
    } else {
        document.getElementById("yourbid2").innerHTML = "10";
        yourbid2 = 10;
        youradj.push(document.getElementById("card10"));
        loop = 0;
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}