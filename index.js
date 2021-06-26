let trick1, trick2;
let yourbid1, yourbid2;
let buttons = document.getElementsByClassName("button");
let loop = 0;

document.getElementById("newround").addEventListener("click", trickGen)
document.getElementById("commit").addEventListener("click", Commit)
document.getElementById("clear").addEventListener("click", Clear)
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
    document.getElementById("scoreboard").innerHTML = "Test";
}

function trickGen(){
    trick1 = Math.floor((Math.random() * 10) + 1);
    trick2 = Math.floor((Math.random() * 10) + 1);
    

    document.getElementById("trick1").innerHTML = trick1;
    document.getElementById("trick2").innerHTML = trick2;

    document.getElementById("newround").disabled = true;
    
    for (i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
    }
}

function Commit(){
    console.log(loop);
}

function Clear(){

}

function Card1(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "1";
        yourbid1 = 1;
        document.getElementById("card1").disabled = true;
    } else {
        document.getElementById("yourbid2").innerHTML = "1";
        yourbid2 = 1;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "2";
        yourbid2 = 2;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "3";
        yourbid2 = 3;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "4";
        yourbid2 = 4;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "5";
        yourbid2 = 5;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "6";
        yourbid2 = 6;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "7";
        yourbid2 = 7;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "8";
        yourbid2 = 8;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "9";
        yourbid2 = 9;
        loop = 0;
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
    } else {
        document.getElementById("yourbid2").innerHTML = "10";
        yourbid2 = 10;
        loop = 0;
        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}