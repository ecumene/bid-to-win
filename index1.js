let oppbid1, oppbid2;
let yourbid1, yourbid2;
let trick1, trick2;
let line1, line2, line3, line4;
let cpu = 0;
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

// variables specific to computer player //
let scorediff, roundmod, trickdiff, trickavg;
let compavg, youravg; 
let comphigh, yourhigh;
let compcards = [];
let yourcards = [];
let csum = 0;
let ysum = 0;
// variables specific to computer player //

document.getElementById("rulebtn").addEventListener("click", rules)
document.getElementById("playcomp").addEventListener("click", playcomp)
document.getElementById("play2p").addEventListener("click", play2p)
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

function playcomp(){
    cpu = 1;
    document.getElementById("playcomp").disabled = true;
    document.getElementById("play2p").disabled = true;
    document.getElementById("newround").disabled = false;
    compcards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    yourcards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

function play2p(){
    document.getElementById("playcomp").disabled = true;
    document.getElementById("play2p").disabled = true;
    document.getElementById("newround").disabled = false;
}

function trickGen(){
    let a = Math.floor((Math.random() * 10) + 1);
    let b = Math.floor((Math.random() * 10) + 1);

    if (a != b && a > b){
        trick1 = b;
        trick2 = a;
    } else if (a != b && a < b){
        trick1 = a;
        trick2 = b;
    } else if (a == b && a % 2 == 0){
        trick1 = a - 1;
        trick2 = b;
    } else {
        trick1 = a;
        trick2 = b + 1;
    }

    if (cpu == 0){
        document.getElementById("oppbid1").innerHTML = "";
        document.getElementById("oppbid2").innerHTML = "";
    } else {
        document.getElementById("oppbid1").innerHTML = "?";
        document.getElementById("oppbid2").innerHTML = "?";
    }
    
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

    compStrat();
}

function Commit(){
    loop = 0;
    yourcards.splice(yourcards.indexOf(yourbid1), 1);
    yourcards.splice(yourcards.indexOf(yourbid2), 1);
    if (cpu == 0) {
        count++;
        
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
        }
    } else {
        document.getElementById("oppbid1").innerHTML = oppbid1;
        document.getElementById("oppbid2").innerHTML = oppbid2;
        document.getElementById("commit").disabled = true;
        document.getElementById("newround").disabled = false;
        line1.style.backgroundColor = "black";
        line2.style.backgroundColor = "black";
        document.getElementById("opp"+oppbid1).style.backgroundColor = "black";
        document.getElementById("opp"+oppbid2).style.backgroundColor = "black";
    }

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

    if (youradj.length == 10){
        document.getElementById("newgame").disabled = false;
        document.getElementById("newround").disabled = true;
    } else {};

    console.log(oppbid1);
    console.log(oppbid2);
    console.log(compcards);
    console.log(yourcards);
    console.log("---------");
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
    yourcards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    compcards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        buttons[i].style.backgroundColor = "rgb(140, 140, 255)";
        cbuttons[i].style.backgroundColor = "rgb(255, 140, 140)";
    }
}

// the beginning of the player button functions //
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
        line3 = document.getElementById("opp1");
        oppadj.push(document.getElementById("opp1"));
    } else {
        document.getElementById("oppbid2").innerHTML = "1";
        oppbid2 = 1;
        line4 = document.getElementById("opp1");
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
        line3 = document.getElementById("opp2");
        oppadj.push(document.getElementById("opp2"));
    } else {
        document.getElementById("oppbid2").innerHTML = "2";
        oppbid2 = 2;
        line4 = document.getElementById("opp2"); 
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
        line3 = document.getElementById("opp3");
        oppadj.push(document.getElementById("opp3"));
    } else {
        document.getElementById("oppbid2").innerHTML = "3";
        oppbid2 = 3;
        line4 = document.getElementById("opp3");
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
        line3 = document.getElementById("opp4");
        oppadj.push(document.getElementById("opp4"));
    } else {
        document.getElementById("oppbid2").innerHTML = "4";
        oppbid2 = 4;
        line4 = document.getElementById("opp4");
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
        line3 = document.getElementById("opp5");
        oppadj.push(document.getElementById("opp5"));
    } else {
        document.getElementById("oppbid2").innerHTML = "5";
        oppbid2 = 5;
        line4 = document.getElementById("opp5");
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
        line3 = document.getElementById("opp6");
        oppadj.push(document.getElementById("opp6"));
    } else {
        document.getElementById("oppbid2").innerHTML = "6";
        oppbid2 = 6;
        line4 = document.getElementById("opp6");
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
        line3 = document.getElementById("opp7");
        oppadj.push(document.getElementById("opp7"));
    } else {
        document.getElementById("oppbid2").innerHTML = "7";
        oppbid2 = 7;
        line4 = document.getElementById("opp7");
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
        line3 = document.getElementById("opp8");
        oppadj.push(document.getElementById("opp8"));
    } else {
        document.getElementById("oppbid2").innerHTML = "8";
        oppbid2 = 8;
        line4 = document.getElementById("opp8");
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
        line3 = document.getElementById("opp9");
        oppadj.push(document.getElementById("opp9"));
    } else {
        document.getElementById("oppbid2").innerHTML = "9";
        oppbid2 = 9;
        line4 = document.getElementById("opp9");
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
        line3 = document.getElementById("opp10");
        oppadj.push(document.getElementById("opp10"));
    } else {
        document.getElementById("oppbid2").innerHTML = "10";
        oppbid2 = 10;
        line4 = document.getElementById("opp10");
        oppadj.push(document.getElementById("opp10"));
        document.getElementById("commit").disabled = false;

        for (i = 0; i < buttons.length; i++){
            cbuttons[i].disabled = true;
        }
    }
}

// the beginning of the computer strategy codes //

function compStrat(){// not yet implemented fully; just a mediary right now //
    scorediff = oppscore - yourscore;
    roundmod = (compcards.length / 2);
    trickdiff = trick2 - trick1;
    trickavg = (trick1 + trick2)/2;

    comphigh = compcards[compcards.length - 1];
    yourhigh = yourcards[yourcards.length - 1];

    stratNorm();//instead of just passing to stratNorm, there will be an if/else statement to decide how aggressive a strategy to use // 
}

function stratNorm(){
    let a = Math.floor((Math.random() * 100) + 1);
    let b = Math.floor(Math.random() * 2);
    let c = Math.floor(Math.random() * 2);
    let d = Math.floor(Math.random() * 2);
    console.log(roundmod);
    console.log(trickdiff);
    console.log(trickavg);
    console.log(a);
    console.log(trick1);
    console.log(trick2);
    console.log(b);
    console.log(c);
    console.log(compcards);
    console.log(yourcards);
    console.log("----------");

    for (i = 0; i < compcards.length; i++){
        csum += compcards[i];
    }

    for (i = 0; i < yourcards.length; i++){
        ysum += yourcards[i];
    }
    compavg = csum / compcards.length;
    youravg = ysum / yourcards.length;

    if (roundmod == 5 && trickdiff <= 3 && trickavg <= 5 && a <= 70){
        if (trick1 == 1){
            oppbid1 = 1;
            oppbid2 = trick2 + c;
            compcards.splice([trick2 + c - 1], 1);
            compcards.splice(0, 1);
        } else {
            oppbid1 = b + 1;
            oppbid2 = trick2 + c;
            compcards.splice([trick2 + c - 1], 1);
            compcards.splice(b, 1);
        }           
    } else if (roundmod == 5 && trickdiff <= 3 && trickavg <= 5 && 70 < a <=90){
        if (trick1 == 1){
            oppbid1 = 1;
            oppbid2 = 2;
            compcards.splice(0, 2);
        } else {
            oppbid1 = trick1;
            oppbid2 = 1;            
            compcards.splice([trick1 - 1], 1);
            compcards.splice(0, 1);
        }        
    } else if (roundmod == 5 && trickdiff <= 3 && trickavg <= 5 && 90 < a) {
        if (trick1 == 1){
            oppbid1 = 1;
            oppbid2 = trick2;
            compcards.splice([trick2 - 1], 1);
            compcards.splice(0, 1);
        } else {
            oppbid1 = 2;
            oppbid2 = 1;
            compcards.splice(0, 2);
        }
    } else if (roundmod == 5 && 4 <= trickdiff && trickavg <= 5 && a <= 70) {
        if (trick1 == 1 && trick2 < 9){
            oppbid1 = 1;
            oppbid2 = trick2 + b + c;
            compcards.splice([trick2 + b + c - 1], 1);
            compcards.splice(0, 1);
        } else if (trick1 == 1 && trick2 == 9){
            oppbid1 = 1
            oppbid2 = 10
            compcards.splice(9, 1);
            compcards.splice(0, 1);
        } else {
            oppbid1 = b + 1;
            oppbid2 = trick2 + c;
            compcards.splice([trick2 + c - 1], 1);
            compcards.splice(b, 1);
        }
    } else if (roundmod == 5 && 4 <= trickdiff && trickavg <= 5 && 70 < a <= 90){
        if (trick1 == 1){
            oppbid1 = 2;
            oppbid2 = 1;
            compcards.splice(0, 2);
        } else {
            oppbid1 = trick1;
            oppbid2 = 1;
            compcards.splice([trick1 - 1], 1);
            compcards.splice(0, 1);
        }
    } else if (roundmod == 5 && 4 <= trickdiff && trickavg <= 5 && 90 < a){
        if (trick1 == 1){
            oppbid1 = 1;
            oppbid2 = 2 + b + c;
            compcards.splice([b + c + 1], 1);
            compcards.splice(0, 1);
        } else {
            oppbid1 = trick1 - b;
            oppbid2 = trick2 + 2;
            compcards.splice([trick2 + 1], 1);
            compcards.splice([trick1 - b - 1], 1);
        }
    } else if (roundmod == 5 && trickdiff <= 3 && 5 < trickavg && a <= 50){
        if (trick1 != 9 && trick2 == 10){
            oppbid1 = trick1 + b;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice([trick1 + b - 1], 1);
        } else if (trick1 == 9 && trick2 == 10){
            oppbid1 = 9;
            oppbid2 = 10;
            compcards.splice(8, 2);
        } else {
            oppbid1 = b + 1;
            oppbid2 = trick2 + c;
            compcards.splice([trick2 + c - 1], 1);
            compcards.splice(b, 1);
        }
    } else if (roundmod == 5 && trickdiff <= 3 && 5 < trickavg && 50 < a <= 75){
        if (trick1 != 9 && trick2 == 10){
            oppbid1 = b + c + 1;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice([b + c], 1);
        } else if (trick1 == 9 && trick2 == 10){
            oppbid1 = 10;
            oppbid2 = b + c + 1;
            compcards.splice(9, 1);
            compcards.splice(b + c, 1);
        } else {
            oppbid1 = trick1 + b + c;
            oppbid2 = d + 1;
            compcards.splice([trick1 + b + c - 1], 1);
            compcards.splice(d, 1);
        }
    } else if (roundmod == 5 && trickdiff <= 3 && 5 < trickavg && 75 < a){
        if (trick1 != 9 && trick2 == 10){
            oppbid1 = 9;
            oppbid2 = 1;
            compcards.splice(8, 1);
            compcards.splice(0, 1);
        } else if (trick1 == 9 && trick2 == 10){
            oppbid1 = b + 1;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice(b, 1);
        } else {
            oppbid1 = trick1 + b - c;
            oppbid2 = trick2 + d;
            compcards.splice([trick2 + d - 1], 1);
            compcards.splice([trick1 + b - c - 1], 1);
        }
    } else if (roundmod == 5 && 4 <= trickdiff && 5 < trickavg && a <= 50){
        if (trick1 == 1){
            oppbid1 = 1;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice(0, 1);
        } else if (trick2 == 10 && trickdiff > 6){
            oppbid1 = b + 1;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice(b, 1);
        } else if (trick2 == 10){
            oppbid1 = trick1 + b - c;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice([trick1 + b - c - 1], 1);
        } else {
            oppbid1 = b + 1;
            oppbid2 = trick2 + c;
            compcards.splice([trick2 + c - 1], 1);
            compcards.splice(b, 1);
        }
    } else if (roundmod == 5 && 4 <= trickdiff && 5 < trickavg && 50 < a <= 75){
        if (trick1 == 1){
            oppbid1 = 1;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice(0, 1);
        } else if (trick2 == 10 && trickdiff > 6){
            oppbid1 = trick1;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice([trick1 - 1], 1);
        } else if (trick2 == 10){
            oppbid1 = b + c + 1;
            oppbid2 = 10;
            compcards.splice(9, 1);
            compcards.splice([b + c], 1);
        } else {
            oppbid1 = trick1 + b - c;
            oppbid2 = trick2 + d;
            compcards.splice([trick2 + d - 1], 1);
            compcards.splice([trick1 + b - c - 1], 1);
        } 
    } else if (roundmod == 5 && 4 <= trickdiff && 5 < trickavg && 75 < a){
            if (trick1 == 1){
                oppbid1 = 1;
                oppbid2 = 10;
                compcards.splice(9, 1);
                compcards.splice(0, 1);
            } else if (trick2 == 10 && trickdiff > 6){
                oppbid1 = b + 1;
                oppbid2 = 10;
                compcards.splice(9, 1);
                compcards.splice(b, 1);//
            } else if (trick2 == 10){
                oppbid1 = trick1 + b;
                oppbid2 = 10;
                compcards.splice(9, 1);
                compcards.splice([trick1 + b - 1], 1);
            } else {
                oppbid1 = 1;
                oppbid2 = 10;
                compcards.splice(9, 1);
                compcards.splice(0, 1);
            }
    } else if (3 <= roundmod <= 4 && trickdiff <=3 && trickavg <= 5 && a <= 70){
        if (trick2 == 2 && compcards[1] < yourcards[1]){
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        } else if (trick2 == 2) {
            oppbid1 = compcards.shift();    
            oppbid2 = compcards.shift();
        } else if (trick1 == 1 && compcards[1] < yourcards[1]){// for lower percents divide this up according to avgs //
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();            
        } else if (trick1 == 1){
            oppbid1 = compcards.shift();
            oppbid2 = compcards.shift();
        } else if (trick1 == 2 && compcards[1] < yourcards[1]){
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        } else if (trick1 == 2){
            oppbid1 = compcards.shift();
            if (compcards.indexOf(trick2) != -1){
                oppbid2 = trick2;
                compcards.splice(compcards.indexOf(trick2), 1);
            } else {
                oppbid2 = compcards.shift();
            }
        } else {
            if (compcards.indexOf(trick2 + 1) != -1){                
                oppbid2 = trick2 + 1;
                compcards.splice(compcards.indexOf(trick2 + 1), 1);
                if (compcards[0] < trick1){
                    oppbid1 = compcards[b];
                    compcards.splice(b, 1);
                } else {
                    oppbid1 = compcards.shift();
                }
            } else {
                oppbid2 = compcards.shift();
                if (compcards.indexOf(b + trick1) != -1){
                    oppbid1 = b + trick1;
                    compcards.splice(compcards.indexOf(b + trick1), 1);                    
                } else if (compcards.indexOf(trick1) != -1){
                    oppbid1 = trick1;
                    compcards.splice(compcards.indexOf(trick1), 1);        
                } else {
                    oppbid1 = compcards.shift();
                }
            }
        }
    } else if (3 <= roundmod <= 4 && trickdiff <=3 && trickavg <= 5 && 70 < a){
        if (trick2 == 2 && compcards[1] < yourcards[1]){
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        } else if (trick2 == 2) {
            oppbid1 = compcards.shift();    
            oppbid2 = compcards.shift();
        } else if (trick1 == 1 && compcards[1] < yourcards[1]){// for lower percents divide this up according to avgs //
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();            
        } else if (trick1 == 1){
            oppbid1 = compcards.shift();
            if (compcards[1] <= trick2 + 1){
                oppbid2 = compcards[1];
                compcards.splice(1, 1);
            } else {
                oppbid2 = compcards.shift();
            }
        } else if (trick1 == 2 && compcards[1] < yourcards[1]){
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        } else if (trick1 == 2){
            oppbid1 = compcards.shift();
            if (compcards.indexOf(trick2 + 1) != -1){
                oppbid2 = trick2 + 1;
                compcards.splice(compcards.indexOf(trick2 + 1), 1);
            } else {
                oppbid2 = compcards.shift();
            }
        } else {
            if (compcards.indexOf(trick2) != -1){                
                oppbid2 = trick2;
                compcards.splice(compcards.indexOf(trick2), 1);
                if (compcards[0] < trick1){
                    oppbid1 = compcards[b];
                    compcards.splice(b, 1);                    
                } else {
                    oppbid1 = compcards.shift();
                }
            } else {
                oppbid2 = compcards.shift();
                if (compcards.indexOf(b + trick1) != -1){
                    oppbid1 = b + trick1;
                    compcards.splice(compcards.indexOf(b + trick1), 1);                    
                } else if (compcards.indexOf(trick1) != -1){
                    oppbid1 = trick1;
                    compcards.splice(compcards.indexOf(trick1), 1);        
                } else {
                    oppbid1 = compcards.shift();
                }
            }
        }
    } else if (3 <= roundmod <= 4 && 4 <= trickdiff && trickavg <= 5 && a <= 70){
        if (7 < trick2 && comphigh < yourhigh){
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        } else {
            oppbid1 = compcards.shift();
            if (7 < trick2 && yourhigh < comphigh){
                oppbid2 = compcards[compcards.length - 2];
                compcards.splice(compcards.length - 2, 1);
            } else if (7 < trick2){
                oppbid2 = compcards.pop();
            } else if (compcards.indexOf(trick2 + 1) != -1){
                oppbid2 = trick2 + 1;
                compcards.splice(compcards.indexOf(trick2 + 1), 1);
            } else if (compavg > youravg && compcards.indexOf(trick2) != -1){
                oppbid2 = trick2;
                compcards.splice(compcards.indexOf(trick2), 1);
            } else if (compavg > youravg && compcards.indexOf(trick2 + 2) != -1){
                oppbid2 = trick2 + 2;
                compcards.splice(compcards.indexOf(trick2 + 2), 1);
            } else {
                if (compcards[0 + b] <= trick2){
                    oppbid2 = compcards[b];
                    compcards.splice(b, 1);
                } else {
                    oppbid2 = compcards.shift();
                }
            }
        }
    } else if (3 <= roundmod <= 4 && 4 <= trickdiff && trickavg <= 5 && 70 < a){
        oppbid1 = compcards.shift();
        if (7 < trick2 && comphigh < yourhigh){            
            oppbid2 = compcards[b + c];
            compcards.splice(b + c, 1);
        } else {            
            if (7 < trick2){
                oppbid2 = compcards.pop();
            } else if (compavg > youravg && compcards.indexOf(trick2) != -1){
                oppbid2 = trick2;
                compcards.splice(compcards.indexOf(trick2), 1);
            } else if (compavg > youravg && compcards.indexOf(trick2 + 2) != -1){
                oppbid2 = trick2 + 2;
                compcards.splice(compcards.indexOf(trick2 + 2), 1);
            } else {
                if (compcards[b] <= trick2){
                    oppbid2 = compcards[b];
                    compcards.splice(b, 1);
                } else {
                    oppbid2 = compcards.shift();
                }
            }
        }
    } else if (3 <= roundmod <= 4 && trickdiff <= 3 && 5 < trickavg && a <= 65){
        if (8 < trick2 && comphigh < yourhigh){
            oppbid2 = compcards.shift();
            if (compcards.indexOf(trick1 + 1) != -1){
                oppbid1 = trick1 + 1;
                compcards.splice(compcards.indexOf(trick1 + 1), 1);                
            } else if (compcards.indexOf(trick1) != -1 && compcards[compcards.length- 2] >= yourcards[yourcards.length - 2]){
                oppbid1 = trick1;
                compcards.splice(compcards.indexOf(trick1), 1);
            } else {
                oppbid1 = compcards[b + c];
                compcards.splice(b + c, 1);
            }
        } else if (8 < trick2 && yourhigh < comphigh){
            oppbid2 = compcards.pop();
            if (compcards[compcards.length - 2] >= yourcards[yourcards.length - 1]){
                oppbid1 = compcards.pop();
            } else {
                oppbid1 = compcards.shift();
            }
        } else if (8 < trick2 && compcards[compcards.length - 2] >= yourcards[yourcards.length - 2]){
            oppbid2 = compcards.pop();
            oppbid1 = compcards.pop();
        } else if (8 < trick2){
            oppbid1 = compcards.pop();
            oppbid2 = compcards[b + c];
            compcards.splice(b + c, 1);
        } else if (7 < trick2 && yourhigh <= comphigh){
            oppbid2 = compcards.pop();
            if (compcards.indexOf(compcards[trick1 + b]) != -1){
                oppbid1 = trick1 + b;
                compcards.splice(compcards.indexOf(trick1 + b), 1);
            } else if (compcards.indexOf(compcards[trick1 -c]) != -1){
                oppbid1 = trick1 - c;
                compcards.splice(compcards.indexOf(trick1 - c), 1);
            } else {
                oppbid1 = compcards[d];
                compcards.splice(d, 1);
            }
        } else if (compcards.indexOf(trick2 + 1) != -1){
            oppbid2 = trick2 + 1;
            compcards.splice(compcards.indexOf(trick2 + 1), 1);
            if (compcards[1] <= trick1){
                oppbid1 = compcards[1];
                compcards.splice(1, 1);
            } else {
                oppbid1 = compcards.shift();
            }
        } else if (compcards.indexOf(trick1 + b) != -1){
            oppbid1 = trick1 + b;
            compcards.splice(compcards.indexOf(trick1 + b), 1);
            oppbid2 = compcards[c];
            compcards.splice(c, 1);
        } else if (compcards.indexOf(trick2) != -1){
            oppbid2 = trick2;
            compcards.splice(compcards.indexOf(trick2), 1);
            oppbid1 = compcards[b];
            compcards.splice(b, 1);
        } else if (compcards.indexOf(trick2 + 2) != -1){
            oppbid2 = trick2 + 2;
            compcards.splice(compcards.indexOf(trick2 + 2), 1);
            oppbid1 = compcards.shift();
        } else {
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        }
    } else if (3 <= roundmod <= 4 && trickdiff <= 3 && 5 < trickavg && 65 < a){
        if (8 < trick2 && comphigh < yourhigh){
            oppbid2 = compcards.pop();
            if (compcards[compcards.length - 2] >= yourcards[yourcards.length - 2] && b == 0){
                oppbid1 = compcards[compcards.length - 2];
                compcards.splice(compcards.length - 2, 1);
            } else {
                oppbid1 = compcards[c];
                compcards.splice(c, 1);
            }      
        } else if (8 < trick2 && yourhigh < comphigh){
            if (compcards[compcards.length - 2] >= yourcards[yourcards.length - 1]){
                oppbid1 = compcards.pop();
                oppbid2 = compcards.pop();
            } else {
                oppbid1 = compcards.pop();
                oppbid2 = compcards[1 + b + c];
                compcards.splice(1 + b + c, 1);
            }
        } else if (8 < trick2 && compcards[compcards.length - 2] > yourcards[yourcards.length - 2]){
            oppbid2 = compcards.pop();
            oppbid1 = compcards[1 + b + c];
            compcards.splice(1 + b + c, 1);
        } else if (8 < trick2){
            oppbid2 = compcards.pop();
            oppbid1 = compcards[b];
            compcards.splice(b, 1);
        } else if (7 < trick2 && yourhigh < comphigh){
            oppbid2 = compcards[1 + b];
            compcards.splice(1 + b, 1);
            if (compcards.indexOf(compcards[trick1 + b]) != -1){
                oppbid1 = trick1 + b;
                compcards.splice(compcards.indexOf(trick1 + b), 1);
            } else if (compcards.indexOf(compcards[trick1 -c]) != -1){
                oppbid1 = trick1 - c;
                compcards.splice(compcards.indexOf(trick1 - c), 1);
            } else {
                oppbid1 = compcards[d];
                compcards.splice(d, 1);
            }
        } else if (7 < trick2 && yourhigh >= comphigh){
            oppbid2 = compcards.shift();
            if (compcards[compcards.length - 2] <= yourcards[yourcards.length - 2]){
                oppbid1 = compcards.pop();
            } else {
                oppbid1 = compcards[1 + b];
                compcards.splice(1 + b, 1);
            }
        } else if (compavg <= youravg){
            oppbid2 = compcards.shift();
            if (compcards[1] <= trick1){
                oppbid1 = compcards[1];
                compcards.splice(1, 1);
            } else {
                oppbid1 = compcards.shift();
            }
        } else if (compcards.indexOf(trick2 + 1) != -1){
            oppbid2 = trick2 + 1
            compcards.splice(compcards.indexOf(trick2 + 1), 1);
            if (compcards[1] <= trick1){
                oppbid1 = compcards[1];
                compcards.splice(1, 1);
            } else {
                oppbid1 = compcards.shift();
            }
        } else if (compcards.indexOf(trick1 + b) != -1){
            oppbid1 = trick1 + b;
            compcards.splice(compcards.indexOf(trick1 + b), 1);
            oppbid2 = compcards[c];
            compcards.splice(c, 1);
        } else if (compcards.indexOf(trick2) != -1){
            oppbid2 = trick2;
            compcards.splice(compcards.indexOf(trick2), 1);
            oppbid1 = compcards[b];
            compcards.splice(b, 1);
        } else if (compcards.indexOf(trick2 + 2) != -1){
            oppbid2 = trick2 + 2;
            compcards.splice(compcards.indexOf(trick2 + 2), 1);
            oppbid1 = compcards.shift();
        } else {
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        }
    } else if (3 <= roundmod <= 4 && 4 <= trickdiff && 5 < trickavg && a <= 70){
        if (comphigh >= yourhigh){
            oppbid2 = compcards.pop();
                if  (trick1 >= 4 && compcards.indexOf(trick1 + b) != -1){
                    oppbid1 = trick1 + b;
                    compcards.splice(compcards.indexOf(trick1 + b), 1);      
                } else {
                    oppbid1 = compcards.shift();
                }           
        } else if (trick1 < 5){
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        } else if (compcards.indexOf(trick1 + b) != -1){
            oppbid1 = trick1 + b;
            compcards.splice(compcards.indexOf(trick1 + b), 1);
            oppbid2 = compcards.shift();
        } else {
            oppbid2 = compcards.shift();
            oppbid1 = compcards.shift();
        }
    } else if (3 <= roundmod <= 4 && 4 <= trickdiff && 5 < trickavg && 70 < a){
        if (comphigh > yourhigh){
            if  (trick1 >= 4){
                oppbid1 = compcards[compcards.length - 2];
                compcards.splice(compcards.length - 2, 1);      
                oppbid2 = compcards[compcards.length - 2];
                compcards.splice(compcards.length - 2, 1);      
            } else {
                oppbid1 = compcards.shift();
                oppbid2 = compcards[compcards.length - 2];
                compcards.splice(compcards.length - 2, 1);
            }           
        } else if (comphigh == yourhigh){
            oppbid2 = compcards.pop();
            if (trick1 >= 3 && compcards.indexOf(trick1 + b) != -1){
                oppbid1 = trick1 + b;
                compcards.splice(compcards.indexOf(trick1 + b), 1);
            } else if (trick1 >= 3 && compcards.indexOf(trick1 - c) != -1){
                oppbid1 = trick1 - c;
                compcards.splice(compcards.indexOf(trick1 - c), 1);
            } else {
                oppbid1 = compcards.shift();
            }
        }
    } else if (roundmod == 2 && a <= 70){
        if (yourhigh < comphigh){
            if (trick2 > 6){
                oppbid2 = compcards.pop();
                if (trick1 > 5 && compcards[2] >= yourcards[3]){
                    oppbid1 = compcards.pop();
                } else if (2 < trick1 <=5 && compcards[1] <= trick1) {
                    oppbid1 = compcards[b];
                    compcards.splice(b, 1);
                } else {
                    oppbid1 = compcards.shift();
                }
            } else if (compcards[2] >= trick2){
                oppbid2 = compcards[2];
                compcards.splice(2, 1);
                oppbid1 = compcards.shift();
            } else if (compcards[1] >= yourcards[1]){
                oppbid1 = compcards.shift();
                oppbid2 = compcards.shift();
            } else {
                oppbid2 = compcards.shift();
                oppbid1 = compcards.shift();
            }
        } else if (yourhigh > comphigh){
            if (trick2 > 6){
                if (compcards[2] >= trick2){
                    oppbid2 = compcards[2];
                    compcards.splice(2, 1);
                    if (compcards[1] <= trick1){
                        oppbid1 = compcards[1];
                        compcards.splice(1, 1);
                    } else {
                        oppbid1 = compcards.shift();
                    }
                } else {
                    oppbid2 = compcards.shift();
                    if (compcards[2] >= yourcards[2] && trick1 > 5){
                        oppbid1 = compcards[2];
                        compcards.splice(2, 1);
                    } else {
                        oppbid1 = compcards.shift();
                    }
                }
            } else if (compcards[2] >= trick2){
                oppbid2 = compcards[2];
                compcards.splice(2, 1);
                oppbid1 = compcards.shift();
            } else if (compcards[1] >= yourcards[1]){
                oppbid1 = compcards.shift();
                oppbid2 = compcards.shift();
            } else {
                oppbid2 = compcards.shift();
                oppbid1 = compcards.shift();
            }
        } else {
            if (trick2 > 7){
                oppbid2 = compcards.pop();
                if (trick1 < 5){
                    oppbid1 = compcards.shift();
                } else if (compcards[2] >= yourcards[2]){
                    oppbid1 = compcards.pop();
                } else {
                    oppbid1 = compcards.shift();
                }
            } else if (4 < trick2 <= 7){
                if (compcards[2] >= trick2){
                    oppbid2 = compcards[2];
                    compcards.splice(2, 1);
                    oppbid1 = compcards.shift();
                } else if (compcards[1] >= yourcards[1]){
                    oppbid1 = compcards.shift();
                    oppbid2 = compcards.shift();
                } else {
                    oppbid2 = compcards.shift();
                    oppbid1 = compcards.shift();
                }
            } else if (compcards[1] >= yourcards[1]){
                oppbid1 = compcards.shift();
                oppbid2 = compcards.shift();
            } else {
                oppbid2 = compcards.shift();
                oppbid1 = compcards.shift();
            }
        }
    } else if (roundmod == 2 && 70 < a){
        if (yourhigh < comphigh){
            if (trick2 > 6){
                if (compcards[1] > yourcards[0]){
                    oppbid2 = compcards[1];
                    compcards.splice(1, 1);
                    if (trick1 > 4){
                        oppbid1 = compcards.pop();
                    } else {
                        oppbid1 = compcards.shift();
                    }
                } else if (compcards[2] > yourcards[0]){
                    oppbid2 = compcards[2];
                    compcards.splice(2, 1);
                    if (trick1 > 4){
                        oppbid1 = compcards.pop();
                    } else {
                        oppbid1 = compcards.shift();
                    }
                } else {
                    oppbid2 = compcards.pop();
                    oppbid1 = compcards.shift();
                }
            } else if (compcards[2] >= yourcards[3]){
                oppbid2 = compcards[2];
                compcards.splice(2, 1);
                combid1 = compcards.shift();
            } else if (compcards[2] >= yourcards[2]){
                oppbid1 = compcards.shift();
                oppbid2 = compcards.shift();
            } else {
                oppbid2 = compcards.shift();
                oppbid1 = compcards.shift();
            }
        } else if (yourhigh > comphigh){
            if (trick2 > 6){
                oppbid2 - compcards.shift();
                if (compcards[1] >= yourcards[2]){
                    oppbid1 = compcards[1];
                    compcards.splice(1, 1);
                } else if (trick1 > 5){
                    oppbid1 = compcards.pop();
                } else {
                    oppbid1 = compcards.shift();
                }
            } else if (compcards[1] >= yourcards[1]){
                oppbid1 = compcards.shift();
                oppbid2 = compcards.shift();
            } else {
                oppbid2 = compcards.shift();
                oppbid1 = compcards.shift();
            }
        } else {
            if (trick2 > 6 && trickdiff <= 3){
                oppbid2 = compcards.shift();
                if (compcards[1] > yourcards[2]){
                    oppbid1 = compcards[1];
                    compcards.splice(1, 1);
                } else {
                    oppbid1 = compcards.pop();
                }
            } else if (trick2 > 6){
                oppbid2 = compcards.pop();
                oppbid1 = compcards.shift();
            } else if (trick2 > 3 && compcards.indexOf(trick2 + 1) != -1){
                oppbid2 = trick2 + 1;
                compcards.splice(compcards.indexOf(trick2 + 1), 1);
                oppbid1 = compcards.shift();
            } else if (trick2 > 3 && compcards.indexOf(trick2 + 2) != -1){
                oppbid2 = trick2 + 2;
                compcards.splice(compcards.indexOf(trick2 + 2), 1);
                oppbid1 = compcards.shift();
            } else if (compcards[1] >= yourcards[1]){
                oppbid1 = compcards.shift();
                oppbid2 = compcards.shift();
            } else {
                oppbid2 = compcards.shift();
                oppbid1 = compcards.shift();
            }
        }
    } else if (scorediff == 0){
        oppbid2 = compcards.pop();
        oppbid1 = compcards[0];
    } else if (scorediff > 0){
        if (comphigh < yourhigh && compcards[0] < yourcards[0] && comphigh > yourcards[0]){
            if (b == 0){
                oppbid2 = compcards.pop();
                oppbid1 = compcards[0];
            } else {
                oppbid1 = compcards.pop();
                oppbid2 = compcards[0];
            }
        } else if (comphigh == yourhigh && compcards[0] < yourcards[0] && trick1 > scorediff){
            if (b == 0){
                oppbid2 = compcards.pop();
                oppbid1 = compcards[0];
            } else {
                oppbid1 = compcards.pop();
                oppbid2 = compcards[0];
            }
        } else if (comphigh < yourhigh && compcards[0] == yourcards[0] && [trick2 - trick1] < scorediff && trick1 <= scorediff){
            oppbid1 = compcards.pop();
            oppbid2 = compcards[0];
        } else if (comphigh < yourhigh && compcards[0] == yourcards[0] && [trick2 - trick1] < scorediff && trick1 > scorediff){
            if (b == 0){
                oppbid2 = compcards.pop();
                oppbid1 = compcards[0];
            } else {
                oppbid1 = compcards.pop();
                oppbid2 = compcards[0];
            }
        } else {
            oppbid2 = compcards.pop();
            oppbid1 = compcards[0];
        } 
    } else {
        if (comphigh > yourhigh && compcards[0] > yourcards[0] && yourhigh >= compcards[0] && [trick1 - trick2] > scorediff){
            if (b == 0){
                oppbid2 = compcards.pop();
                oppbid1 = compcards[0];
            } else {
                oppbid1 = compcards.pop();
                oppbid2 = compcards[0];
            }
        } else if (comphigh == yourhigh && compcards[0] > yourcards[0] && trick1 >= [scorediff * -1]){
            if (b == 0){
                oppbid2 = compcards.pop();
                oppbid1 = compcards[0];
            } else {
                oppbid1 = compcards.pop();
                oppbid2 = compcards[0];
            }
        } else if (comphigh > yourhigh && compcards[0] == yourcards[0] && [trick2 - trick1] < [scorediff * -1]){
            if (b == 0){
                oppbid2 = compcards.pop();
                oppbid1 = compcards[0];
            } else {
                oppbid1 = compcards.pop();
                oppbid2 = compcards[0];
            }
        } else {
            oppbid2 = compcards.pop();
            oppbid1 = compcards[0];
        }
    } 
}
