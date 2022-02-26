document.addEventListener("DOMContentLoaded", function() { 
    let carrotMoney = 0;
    const balanceDisplay = document.querySelector(".balance");
    let number;
    let time = 0;
    let upgradeLVL = [1, 1, 1];
    let upgradeStats = [3*upgradeLVL[0]*3.5, 5*upgradeLVL[1]*5, 0.05*upgradeLVL[2]*2];
    let upgradeName = ["perSec", "perClick", "luckyClickChance"];
    let upgradeCost = [100*(upgradeLVL[0]+1),125*(upgradeLVL[1]+1),1000*(upgradeLVL[2]+1)];
    
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
        

        const carrotBtn = document.querySelector("#carrot");
        carrotBtn.addEventListener("click", handleCarrotClick);
        
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
            
    
    
    
    
    function handleCarrotClick() 
    {
        carrotMoney++;
        carrotMoney += upgradeStats[1];
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
    
    function displayUpdate()
    {
        upgradeStats = [3*upgradeLVL[0]*3.5, 5*upgradeLVL[1]*5, 0.05*upgradeLVL[2]*2]
        upgradeCost = [100*(upgradeLVL[0]+1),125*(upgradeLVL[1]+1),1000*(upgradeLVL[2]+1)];
        
        for(let i = 0; i < upgradeName.length; i++)
        {
            cost[i].innerHTML = `-$${upgradeCost[i]}`;
        }
        balanceDisplay.innerHTML = `$${Math.round(carrotMoney)}`;
        
    }
        setInterval(function(){
            if (time == 222) {
                carrotMoney += upgradeStats[0];
                time = 0;
            };
            displayUpdate();
            time++
        }, 
            );
    
});