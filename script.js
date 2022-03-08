document.addEventListener("DOMContentLoaded", function() { 
    let carrotMoney = 0;
    let number;
    let time = 0;
    let upgradeLVL = [1, 1, 1];
    let upgradeStats = [3*upgradeLVL[0]*3.5, 5*upgradeLVL[1]*5,100000000000];
    let upgradeName = ["perSec", "perClick", "luckyClickChance"];
    let upgradeCost = [100*(upgradeLVL[0]),125*(upgradeLVL[1]+1),1000*(upgradeLVL[2]+1)];

    let luckyClickChance = 1000;

    let profitEffectAmount;

    let balance = document.createElement("h2");

        balance.setAttribute("color", "black");     
        balance.innerHTML = `$${carrotMoney}`;
        document.querySelector(".player-info").prepend(balance);


    const balanceDisplay = balance;
    
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
        
        const carrotImg = document.querySelector("#carrot img")
        const carrotBtn = document.querySelector("#carrot");

        carrotBtn.addEventListener("click", handleCarrotClick);

        carrotBtn.addEventListener("mousedown", function() {
            carrotImg.setAttribute("width", "13%");
        });
        
        addEventListener("mouseup", function() {
            carrotImg.setAttribute("width", "15%");
        });
        
        
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
    }
    
    function upgrade() 
    {   
        if (carrotMoney >= upgradeCost[number]) 
        {
            carrotMoney -= upgradeCost[number];
            upgradeLVL[number]++;   
        }
        number = -1;
        for(let i = 0; i < upgradeName.length; i++)
        {
            LVL[i].innerHTML = `Lv. ${upgradeLVL[i]}`;
        }
            
        displayUpdate();
        
    }



    function profitEffect(profitEffectAmount) {
        let newDiv = document.createElement("h2");
        
        newDiv.innerHTML = `+$${Math.floor(profitEffectAmount)}`;
        newDiv.classList.add("gain");
        newDiv.setAttribute("text-anchor", "middle");
        document.querySelector(".player-info").prepend(newDiv);
        setTimeout(() => { newDiv.remove(); }, 1000);
    }
    
    function displayUpdate()
    {
        upgradeStats = [3*upgradeLVL[0]*3.5, 5*upgradeLVL[1]*5, upgradeStats[1]*luckyClickChance*upgradeLVL[2]]
        upgradeCost = [100*(upgradeLVL[0]+1),125*(upgradeLVL[1]+1),1000*(upgradeLVL[2]+1)];
        
        for(let i = 0; i < upgradeName.length; i++)
        {
            cost[i].innerHTML = `-$${upgradeCost[i]}`;
        }
        balanceDisplay.innerHTML = `$${Math.floor(carrotMoney)}`;
        balanceDisplay.setAttribute("text-anchor", "middle");
        
    }
        setInterval(function(){
            carrotMoney += upgradeStats[0];
            profitEffect(upgradeStats[0]);
            displayUpdate();
            
        }, 1000);
    
});