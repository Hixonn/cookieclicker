document.addEventListener("DOMContentLoaded", function() { 
    let carrotMoney = 0;
    let number;
    let time = 0;

    let upgradeLVL = [1,1,1];
    let luckyClickChance = 1000;
    let started = false;

    let upgradeStats = [3*upgradeLVL[0]*3.5, 5*upgradeLVL[1]*5, 5*upgradeLVL[1]*5*luckyClickChance*upgradeLVL[2]];
    let upgradeCost = [100*(upgradeLVL[0]+1),125*(upgradeLVL[1]+1),luckyClickChance*(upgradeLVL[2]+1)];
    let upgradeDisplayName = [`Per Second \n($${Math.floor(upgradeStats[0])})`, `Per Click ($${upgradeStats[1]})`, `Lucky Click (x${luckyClickChance*upgradeLVL[2]})`];    
    
    let name = new Array(upgradeDisplayName.length);
    let level = new Array(upgradeDisplayName.length);
    let button = new Array(upgradeDisplayName.length);

    let profitEffectAmount;
    let loss;
    let balance = document.createElement("h2");

        balance.setAttribute("style", "color:black;");     
        balance.innerHTML = `$${carrotMoney}`;
        balance.setAttribute("style", "text-anchor: middle;");
        document.querySelector(".player-info").prepend(balance);


    const balanceDisplay = balance;
    
    const upgradeNameDisplay = document.querySelectorAll(".displayName");
    const ugBtn = document.querySelectorAll(".ugBtn");
    const cost = document.querySelectorAll(".cost")
    const LVL = document.querySelectorAll(".LVL");

    for (let i = 0; i < upgradeDisplayName.length; i++) {
        name[i] = document.createElement("p");
        name[i].innerHTML = upgradeDisplayName[i];
        name[i].classList.add("name");
        document.querySelector(".name").append(name[i]);

        level[i] = document.createElement("p");
        level[i].innerHTML = `<td nowrap>Lv. <b>${upgradeLVL[i]}</b></td>`;
        level[i].classList.add("level");
        document.querySelector(".level").append(level[i]);
        

        button[i] = document.createElement("p");
        button[i].innerHTML = `<button class="ugBtn">UPGRADE</button>`;
        button[i].classList.add("button");
        document.querySelector(".button").append(button[i]);

        cost[i] = document.createElement("p");
        cost[i].innerHTML = `-$${upgradeCost[i]}`;
        cost[i].classList.add("cost");
        document.querySelector(".cost").append(button[i]);
    }

    console.log(cost.length,ugBtn.length);
    
    

    
    

    
    

    // for (let num in ugBtn) {
        //     num.addEventListener("click", function(){number = });
        
        // }
        

        const carrotImg = document.querySelector("#carrot img");
        const carrotBtn = document.querySelector("#carrot");


        carrotBtn.addEventListener("mousedown", function() {
            
            carrotImg.setAttribute("width", "170px");
            
        });
        
        carrotBtn.addEventListener("mouseup", function() {      
            handleCarrotClick();
            let carrotImgEffect = document.createElement("img");
            carrotImgEffect.setAttribute("src", "carrot.png");
            carrotImg.setAttribute("width", "200px");
            carrotImgEffect.remove();
            carrotImgEffect.classList.add("carrotClick");
            document.querySelector("#carrot").append(carrotImgEffect);
            setTimeout(() => { carrotImgEffect.remove(); }, 300);
            started = true;
        });
        
        displayUpdate();

        // for(let i = 0; i < document.querySelectorAll("ugBtn".length); i++)
        // {
            //     const ugBtn = document.querySelector(`'.ugBtn${i}`);
            // }
            
            // const ugBtn0 = document.querySelector(".ugBtn0");
            // ugBtn0.addEventListener("click",function(){number = 0});
            // ugBtn0.addEventListener("click", upgrade);
            
            
            // const ugBtn1 = document.querySelector(".ugBtn1");
            // ugBtn1.addEventListener("click",function(){number = 1});
            // ugBtn1.addEventListener("click", upgrade);
            
            // const ugBtn2 = document.querySelector(".ugBtn2");
            // ugBtn2.addEventListener("click",function(){number = 2});
            // ugBtn2.addEventListener("click", upgrade);
            
    
    
    let dice = {
        roll: (sides) => {
            let result = Math.floor(Math.random()*sides+1)
            console.clear();
            console.log(result);
            if (result != sides) {
                return false;
            } else {
                return true;
            }
        }
    }
    
    
    function handleCarrotClick() 
    {
        profitEffectAmount = -carrotMoney;
        let lucky = dice.roll(luckyClickChance);
        console.log(lucky);
        console.log(upgradeStats[2]);
        
        if (lucky == false) {     
            carrotMoney += upgradeStats[1];

        } else {
            carrotMoney += upgradeStats[2];
            
        }
        profitEffectAmount = profitEffectAmount + carrotMoney;
        console.log(profitEffectAmount);
        console.log(upgradeStats[1]);
        carrotMoney++;
        profitEffect(profitEffectAmount);
        displayUpdate();

        let loss = false;
    }
    
    function upgrade() 
    {   
        if (carrotMoney >= upgradeCost[number]) 
        {
            carrotMoney -= upgradeCost[number];
            upgradeLVL[number]++;
            loss = true;
            profitEffect(upgradeCost[number]);   
        }
        number = -1;
        for(let i = 0; i < upgradeDisplayName.length; i++)
        {
            LVL[i].innerHTML = `<td nowrap>Lv. <b>${upgradeLVL[i]}</b></td>`;

        }
            
        displayUpdate();

    }




    function profitEffect(profitEffectAmount) {
        let newDiv = document.createElement("h2");
        document.querySelector(".player-info").prepend(newDiv);
        
        
        if (loss == true) {
            newDiv.innerHTML = `-$${Math.floor(profitEffectAmount)}`;
            newDiv.classList.add("loss");
            setTimeout(() => { newDiv.remove(); }, 200);
            
        } else {
            newDiv.innerHTML = `+$${Math.floor(profitEffectAmount)}`;
            newDiv.classList.add("gain");
            setTimeout(() => { newDiv.remove(); }, 100);
            
        }
        
        loss = false;
    }
    
    function displayUpdate()
    {   
        for (let i = 0; i < upgradeDisplayName.length; i++) {    
            name[i].innerHTML = upgradeDisplayName[i];
            level[i].innerHTML = `<td nowrap>Lv. <b>${upgradeLVL[i]}</b></td>`;
            button[i].innerHTML = `<button class="ugBtn">UPGRADE</button>`;
            cost[i].innerHTML = `-$${upgradeCost[i]}`;
        }
        
        
        balanceDisplay.innerHTML = `$${Math.floor(carrotMoney)}`;
        
    }
        setInterval(function(){
            upgradeStats = [3*upgradeLVL[0]*3.5, 5*upgradeLVL[1]*5, 5*upgradeLVL[1]*5*luckyClickChance*upgradeLVL[2]];
            upgradeCost = [100*(upgradeLVL[0]+1),125*(upgradeLVL[1]+1),luckyClickChance*(upgradeLVL[2]+1)];
            upgradeDisplayName = [`Per Second \n($${Math.floor(upgradeStats[0])})`, `Per Click ($${upgradeStats[1]})`, `Lucky Click (x${luckyClickChance*upgradeLVL[2]})`];

            if (started == true) {
                       
                carrotMoney += upgradeStats[0];
                profitEffect(upgradeStats[0]);
                displayUpdate();
            }
            
            
        }, 1000);
        
        

    
    for (let i = 0; i < button.length; i++) {
        // ugBtn[i] = document.querySelectorAll(`.ugBtn:nth-child(${i+1})`); 
        button[i].addEventListener("click", function(){number = i});
        button[i].addEventListener("click", upgrade);
        
    }
});