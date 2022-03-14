document.addEventListener("DOMContentLoaded", function() { 
    let carrotMoney = 0;
    let number;
    let time = 0;
    let upgradeLVL = [1, 1, 1];
    let upgradeStats = [0,0,0];
    let upgradeName = ["perSec", "perClick", "luckyClickChance"];
    
    let upgradeCost = new Array(3);
    
    let started = false;
    let widestName = [0,-1];
    let upgradeDisplayName = new Array(3);

    let luckyClickChance = 1000;

    
    

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
    console.log(cost.length,ugBtn.length);
    
    for (let i = 0; i < ugBtn.length; i++) {
        // ugBtn[i] = document.querySelectorAll(`.ugBtn:nth-child(${i+1})`); 
        ugBtn[i].addEventListener("click", function(){number = i});
        ugBtn[i].addEventListener("click", upgrade);
        
    }

    
    

    
    

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
        for(let i = 0; i < upgradeName.length; i++)
        {
            LVL[i].innerHTML = `Lv. <b>${upgradeLVL[i]}</b>`;

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
        upgradeStats = [3*upgradeLVL[0]*3.5, 5*upgradeLVL[1]*5, upgradeStats[1]*luckyClickChance*upgradeLVL[2]];
        upgradeStats[2] = upgradeStats[1]*luckyClickChance*upgradeLVL[2];
        upgradeCost = [100*(upgradeLVL[0]+1),125*(upgradeLVL[1]+1),luckyClickChance*(upgradeLVL[2]+1)];
        upgradeDisplayName = [`Per Second \n($${Math.floor(upgradeStats[0])})`, `Per Click ($${upgradeStats[1]})`, `Lucky Click (x${luckyClickChance*upgradeLVL[2]})`];
        
        for (let i = 0; i < upgradeNameDisplay.length; i++) {
            upgradeNameDisplay[i].innerHTML = upgradeDisplayName[i];
            
            if (widestName[0] <= upgradeNameDisplay[i].innerHTML.length) {
                widestName[1] = i;
                widestName[0] = upgradeNameDisplay[i].innerHTML.length;
                
                console.log(widestName[0]);
            }
        }
        document.querySelector(".upgrade").setAttribute("style", `grid-template-columns: ${widestName[0]*5}px 10px 1fr 1fr`);
        for(let i = 0; i < upgradeName.length; i++)
        {
            cost[i].innerHTML = `-$${upgradeCost[i]}`;
        }
        balanceDisplay.innerHTML = `$${Math.floor(carrotMoney)}`;
        
    }
        setInterval(function(){
            if (started == true) {
                carrotMoney += upgradeStats[0];
                profitEffect(upgradeStats[0]);
                displayUpdate();
            }
            
            
        }, 1000);
    
});