let oppbid1, oppbid2;
let yourbid1, yourbid2;
let trick1, trick2;
let line1, line2;
let youradj = [];
let oppadj = [];
let oppscore = 0;
let yourscore = 0;
let oppmatch = 0;
let yourmatch = 0;
let loop = 0;
let count = 0;
let rule = 0;
let cbuttons = document.getElementsByClassName("cbutton");
let buttons = document.getElementsByClassName("button");

document.getElementById("rulebtn").addEventListener("click", rules)
document.getElementById("newround").addEventListener("click", trickGen)
document.getElementById("commit").addEventListener("click", Commit)
document.getElementById("newgame").addEventListener("click", newGame)
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
document.getElementById("opp1").addEventListener("click", Opp1)
document.getElementById("opp2").addEventListener("click", Opp2)
document.getElementById("opp3").addEventListener("click", Opp3)
document.getElementById("opp4").addEventListener("click", Opp4)
document.getElementById("opp5").addEventListener("click", Opp5)
document.getElementById("opp6").addEventListener("click", Opp6)
document.getElementById("opp7").addEventListener("click", Opp7)
document.getElementById("opp8").addEventListener("click", Opp8)
document.getElementById("opp9").addEventListener("click", Opp9)
document.getElementById("opp10").addEventListener("click", Opp10)

function rules() {
    rule++

    if (rule %2 != 0){
    document.getElementById("rulespar").innerHTML = ("1. Both players have 10 buttons numbered 1-10." + "<br><br>" + 
        "2. A round begins with two randomly generated 'Tricks' between 1-10 being placed up for bid." + "<br><br>" +  
        "3. First, the Blue player must choose their two bids. The first number they click will be for the trick on the left. Red must look away until Blue clicks 'Commit Bids'!" + "<br><br>" +
        "4. After Red makes their selections, the bids are revealed." + "<br><br>" + 
        "5. The player that bids the highest on a trick, wins that many points." + "<br><br>" + 
        "6. Each game consists of five rounds of bidding." + "<br><br>" + 
        "7. Each button can only be used once a game." + "<br><br>" +           
        "8. The player with the most points after 5 rounds is the winner!" + "<br><br>" + 
        "9. The Match Tally keeps track of total wins for each player. Enjoy!");
    document.getElementById("rulespar").style.backgroundColor = "lightgray";
    document.getElementById("rulebtn").style.backgroundColor = "black";
    document.getElementById("rulebtn").style.color = "white";
    } else {
        document.getElementById("rulespar").innerHTML = ("");
        document.getElementById("rulespar").style.backgroundColor = "transparent";
        document.getElementById("rulebtn").style.backgroundColor = "white";
        document.getElementById("rulebtn").style.color = "black";
    }
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

    document.getElementById("oppbid1").innerHTML = "";
    document.getElementById("oppbid2").innerHTML = "";
    document.getElementById("yourbid1").innerHTML = "";
    document.getElementById("yourbid2").innerHTML = "";
    document.getElementById("trick1").innerHTML = trick1;    
    document.getElementById("trick2").innerHTML = trick2;    

    document.getElementById("newround").disabled = true;
    
    for (i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
    }

    for (i = 0; i < youradj.length; i++){
        youradj[i].disabled = true;
    }
}

function Commit(){
    count++;
    loop = 0;
    
    if (count % 2 != 0){
        document.getElementById("yourbid1").innerHTML = "?";      
        document.getElementById("yourbid2").innerHTML = "?";
        document.getElementById("commit").disabled = true;
        for (i = 0; i < cbuttons.length; i++){
            cbuttons[i].disabled = false;
        }        
        for (i = 0; i < oppadj.length; i++){
            oppadj[i].disabled = true;
        }      
    } else {
        document.getElementById("yourbid1").innerHTML = yourbid1;
        document.getElementById("yourbid2").innerHTML = yourbid2;
        document.getElementById("commit").disabled = true;
        document.getElementById("newround").disabled = false;
        line1.style.textDecoration = "line-through";
        line2.style.textDecoration = "line-through";

        if (yourbid1 > oppbid1){
            yourscore = yourscore + trick1;
            document.getElementById("scoreboard").innerHTML = yourscore + " - " + oppscore;
        } else if (yourbid1 < oppbid1){
            oppscore = oppscore + trick1;
            document.getElementById("scoreboard").innerHTML = yourscore + " - " + oppscore;
        } else {};
    
        if (yourbid2 > oppbid2){
                yourscore = yourscore + trick2;
                document.getElementById("scoreboard").innerHTML = yourscore + " - " + oppscore;
        } else if (yourbid2 < oppbid2){
                oppscore = oppscore + trick2;
                document.getElementById("scoreboard").innerHTML = yourscore + " - " + oppscore;
        } else {};
    }

    if (yourscore > oppscore){
        document.getElementById("scoreboard").style.background = "blue";
        document.getElementById("scoreboard").style.color = "white";
    } else if (yourscore < oppscore){
        document.getElementById("scoreboard").style.background = "red";
        document.getElementById("scoreboard").style.color = "white";
    } else {
        document.getElementById("scoreboard").style.background = "lightgray";
        document.getElementById("scoreboard").style.color = "black";
    }

    if (oppadj.length == 10 && (yourscore - 10) >= oppscore){
        alert("All hail Blue!");
    } else if (oppadj.length == 10 && (yourscore - 1) > oppscore){
        alert("Looks like Blue managed to win this one! No worries, Red, retribution is just a rematch away!");
    } else if (oppadj.length == 10 && yourscore > oppscore){
        alert("That was a nailbiter! Better luck next time Red.");
    } else if (oppadj.length == 10 && (oppscore - 10) >= yourscore){
        alert("Red has shown their might!");
    } else if (oppadj.length == 10 && (oppscore - 1) > yourscore){
        alert("Victory Red! Hit rematch to continue the battle!")
    } else if (oppadj.length == 10 && oppscore > yourscore){
        alert("Just by the hair on Red's chinny-chin-chin!");
    } else if (oppadj.length == 10){
        alert("Battled to a draw!")
    } else {};

    if (oppadj.length == 10){
        document.getElementById("newgame").disabled = false;
        document.getElementById("newround").disabled = true;
    } else {};
}

function newGame(){
    if (yourscore > oppscore){
        yourmatch = yourmatch + 1;
        document.getElementById("matchscore").innerHTML = (yourmatch + " - " + oppmatch);
    } else if (yourscore < oppscore){
        oppmatch = oppmatch + 1;
        document.getElementById("matchscore").innerHTML = (yourmatch + " - " + oppmatch);
    } else {};

    if (yourmatch > oppmatch){
        document.getElementById("matchscore").style.background = "blue";
        document.getElementById("matchscore").style.color = "white";
    } else if (yourmatch < oppmatch){
        document.getElementById("matchscore").style.background = "red";
        document.getElementById("matchscore").style.color = "white";
    } else {
        document.getElementById("matchscore").style.background = "lightgray";
        document.getElementById("matchscore").style.color = "black";
    }

    loop = 0;
    count = 0;
    youradj = [];
    oppadj = [];
    yourscore = 0;
    oppscore = 0;
    document.getElementById("scoreboard").innerHTML = "0 - 0";
    document.getElementById("scoreboard").style.background = "lightgray";
    document.getElementById("scoreboard").style.color = "black";
    document.getElementById("oppbid1").innerHTML = "";
    document.getElementById("oppbid2").innerHTML = "";
    document.getElementById("yourbid1").innerHTML = "";
    document.getElementById("yourbid2").innerHTML = "";
    document.getElementById("trick1").innerHTML = "";    
    document.getElementById("trick2").innerHTML = "";
    document.getElementById("newround").disabled = false;  
    document.getElementById("newgame").disabled = true;  

    for (i = 0; i < buttons.length; i++){
        buttons[i].style.textDecoration = "none";
        cbuttons[i].style.textDecoration = "none";
    }
}

function Card1(){
    loop++;

    if (loop === 1){
        document.getElementById("yourbid1").innerHTML = "1";
        yourbid1 = 1;
        line1 = document.getElementById("card1");
        document.getElementById("card1").disabled = true;
        youradj.push(document.getElementById("card1"));
    } else {
        document.getElementById("yourbid2").innerHTML = "1";
        yourbid2 = 1;
        line2 = document.getElementById("card1");
        youradj.push(document.getElementById("card1"));
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
        line1 = document.getElementById("card2");
        youradj.push(document.getElementById("card2"));
    } else {
        document.getElementById("yourbid2").innerHTML = "2";
        yourbid2 = 2;
        line2 = document.getElementById("card2");
        youradj.push(document.getElementById("card2"));
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
        line1 = document.getElementById("card3");
        youradj.push(document.getElementById("card3"));
    } else {
        document.getElementById("yourbid2").innerHTML = "3";
        yourbid2 = 3;
        line2 = document.getElementById("card3");
        youradj.push(document.getElementById("card3"));
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
        line1 = document.getElementById("card4");
        youradj.push(document.getElementById("card4"));
    } else {
        document.getElementById("yourbid2").innerHTML = "4";
        yourbid2 = 4;
        line2 = document.getElementById("card4");
        youradj.push(document.getElementById("card4"));
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
        line1 = document.getElementById("card5");
        youradj.push(document.getElementById("card5"));
    } else {
        document.getElementById("yourbid2").innerHTML = "5";
        yourbid2 = 5;
        line2 = document.getElementById("card5");
        youradj.push(document.getElementById("card5"));
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
        line1 = document.getElementById("card6");
        youradj.push(document.getElementById("card6"));
    } else {
        document.getElementById("yourbid2").innerHTML = "6";
        yourbid2 = 6;
        line2 = document.getElementById("card6");
        youradj.push(document.getElementById("card6"));
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
        line1 = document.getElementById("card7");
        youradj.push(document.getElementById("card7"));
    } else {
        document.getElementById("yourbid2").innerHTML = "7";
        yourbid2 = 7;
        line2 = document.getElementById("card7");
        youradj.push(document.getElementById("card7"));
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
        line1 = document.getElementById("card8");
        youradj.push(document.getElementById("card8"));
    } else {
        document.getElementById("yourbid2").innerHTML = "8";
        yourbid2 = 8;
        line2 = document.getElementById("card8");
        youradj.push(document.getElementById("card8"));
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
        line1 = document.getElementById("card9");
        youradj.push(document.getElementById("card9"));
    } else {
        document.getElementById("yourbid2").innerHTML = "9";
        yourbid2 = 9;
        line2 = document.getElementById("card9");
        youradj.push(document.getElementById("card9"));
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
        line1 = document.getElementById("card10");
        youradj.push(document.getElementById("card10"));
    } else {
        document.getElementById("yourbid2").innerHTML = "10";
        yourbid2 = 10;
        line2 = document.getElementById("card10");
        youradj.push(document.getElementById("card10"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
}
function Opp1(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "1";
        oppbid1 = 1;
        document.getElementById("opp1").disabled = true;
        document.getElementById("opp1").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp1"));
    } else {
        document.getElementById("oppbid2").innerHTML = "1";
        oppbid2 = 1;
        document.getElementById("opp1").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp1"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp2(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "2";
        oppbid1 = 2;
        document.getElementById("opp2").disabled = true;
        document.getElementById("opp2").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp2"));
    } else {
        document.getElementById("oppbid2").innerHTML = "2";
        oppbid2 = 2;
        document.getElementById("opp2").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp2"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp3(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "3";
        oppbid1 = 3;
        document.getElementById("opp3").disabled = true;
        document.getElementById("opp3").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp3"));
    } else {
        document.getElementById("oppbid2").innerHTML = "3";
        oppbid2 = 3;
        document.getElementById("opp3").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp3"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp4(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "4";
        oppbid1 = 4;
        document.getElementById("opp4").disabled = true;
        document.getElementById("opp4").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp4"));
    } else {
        document.getElementById("oppbid2").innerHTML = "4";
        oppbid2 = 4;
        document.getElementById("opp4").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp4"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp5(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "5";
        oppbid1 = 5;
        document.getElementById("opp5").disabled = true;
        document.getElementById("opp5").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp5"));
    } else {
        document.getElementById("oppbid2").innerHTML = "5";
        oppbid2 = 5;
        document.getElementById("opp5").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp5"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp6(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "6";
        oppbid1 = 6;
        document.getElementById("opp6").disabled = true;
        document.getElementById("opp6").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp6"));
    } else {
        document.getElementById("oppbid2").innerHTML = "6";
        oppbid2 = 6;
        document.getElementById("opp6").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp6"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp7(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "7";
        oppbid1 = 7;
        document.getElementById("opp7").disabled = true;
        document.getElementById("opp7").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp7"));
    } else {
        document.getElementById("oppbid2").innerHTML = "7";
        oppbid2 = 7;
        document.getElementById("opp7").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp7"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp8(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "8";
        oppbid1 = 8;
        document.getElementById("opp8").disabled = true;
        document.getElementById("opp8").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp8"));
    } else {
        document.getElementById("oppbid2").innerHTML = "8";
        oppbid2 = 8;
        document.getElementById("opp8").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp8"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp9(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "9";
        oppbid1 = 9;
        document.getElementById("opp9").disabled = true;
        document.getElementById("opp9").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp9"));
    } else {
        document.getElementById("oppbid2").innerHTML = "9";
        oppbid2 = 9;
        document.getElementById("opp9").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp9"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}
function Opp10(){
    loop++;

    if (loop === 1){
        document.getElementById("oppbid1").innerHTML = "10";
        oppbid1 = 10;
        document.getElementById("opp10").disabled = true;
        document.getElementById("opp10").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp10"));
    } else {
        document.getElementById("oppbid2").innerHTML = "10";
        oppbid2 = 10;
        document.getElementById("opp10").style.textDecoration = "line-through";
        oppadj.push(document.getElementById("opp10"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}