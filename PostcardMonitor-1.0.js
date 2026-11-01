// ==UserScript==
// @name         PostcardMonitor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Postcards should be navigable and look nice.
// @author       Mechanocracy
// @match        *.nationstates.net/page=banners*
// @icon         data:image/gif;base64,R0lGODlhFAAUAHAAACH5BAEAAPwALAAAAAAUABQAhwAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAAAjFAPcJHEiwoMGDBIcAQMiQSAYiDA8+HLLPnUSHGCcSdGdxIMV9Q4gk0RCyYMeBRJDpGwJtnr58JJPpkznvGb188/ZlmIeMJL1kN/XNu6nMZbJkyPZpmDdvSLJ8N5Oh44gOarJ58vQJzCA0mbyrHMO6e8bzp0AiQPMp++qunTt0br8y1boPKll6d8XSbJlMIF5681rirRl4qE2XAo0KFdxSqDKrMwUWVcv08byiLQsjHkjU7k3DgFsqO2j559/CNyOqXs26dUAAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //-------------------------------------------------------------------------------------------
    //USER CONFIGURATION

    //UI Presets: For those looking to not stress it.
    //Selecting a valid preset other than "none" means that granular UI controls are disabled.
    //Your options are
    //default ---- No alterations outside those required for Banner Monitor's functionality from 2025.
    //oldfashioned --- Reverses most graphical changes made in the 24 September 2026 postcard update.
    //enhanced --- The full functionality of PostcardMonitor.
    const preset = "enhanced";

    //Granular UI controls
    //For those with refined tastes (will not function if a preset is active)

    //Reverts new changes.
    let stopRotation = false; //Prevents postcards from being rotated.
    let removePostmarks = false; //Turns off the postmark graphic.
    let removeStamps = false; //Turns off the stamp graphics.
    let whiteBackground = false; //Disables the distressed/faded look.
    let removeRarity = false; //Disables the postcard rarity display.
    let deItalicTitles = false; //Makes titles not italic.
    let moveTitleToTop = true; //Moves titles above the banner image.
    let roundCorners = false; //Rounds postcard corners.
    let spaceFillingBanners = false; //Makes the banner image large.
    let legacySelectorPosition = false; //Only works with titles moved.
    let respaceBanners = false; //Only works with title, selector, and rarity changes enabled.

    //Applies changes in line with the original banner monitor.
    let countUnlockedOrLockedBanners = true; //Shows a banner completion number and percentage.
    let displayLockedBanners = true; //Creates unique locked banner preview graphics.
    let addFilteringFunction = true; //Adds a filter function (e.g. only economic banners).


    //Misc. new feature(s)
    let lockedOrUnlockedFilterBar = true; //Filter banners based on lock/unlocked status.


    //-------------------------------------------------------------------------------------------
    if(preset == "default"){
        stopRotation = false;
        removePostmarks = false;
        removeStamps = false;
        whiteBackground = false;
        removeRarity = false;
        deItalicTitles = false;
        moveTitleToTop = false;
        roundCorners = false;
        spaceFillingBanners = false;
        legacySelectorPosition = false;
        respaceBanners = false;

        countUnlockedOrLockedBanners = true;
        displayLockedBanners = true;
        addFilteringFunction = true;

        lockedOrUnlockedFilterBar = false;
    }

    if(preset == "oldfashioned"){
        stopRotation = true;
        removePostmarks = true;
        removeStamps = true;
        whiteBackground = true;
        removeRarity = true;
        deItalicTitles = true;
        moveTitleToTop = true;
        roundCorners = true;
        spaceFillingBanners = true;
        legacySelectorPosition = true;
        respaceBanners = true;

        countUnlockedOrLockedBanners = false;
        displayLockedBanners = false;
        addFilteringFunction = false;

        lockedOrUnlockedFilterBar = false;
    }

    if(preset == "enhanced"){
        stopRotation = true;
        removePostmarks = true;
        removeStamps = true;
        whiteBackground = true;
        removeRarity = true;
        deItalicTitles = true;
        moveTitleToTop = true;
        roundCorners = true;
        spaceFillingBanners = true;
        legacySelectorPosition = true;
        respaceBanners = true;

        countUnlockedOrLockedBanners = true;
        displayLockedBanners = true;
        addFilteringFunction = true;

        lockedOrUnlockedFilterBar = true;
    }

    //-------------------------------------------------------------------------------------------
    //Applies style changes to each banner.
    const postcardContainer = document.querySelector("ul#bannerchoices");
    const postcards = postcardContainer.querySelectorAll('li');

    for (let postcard of postcards) { //Whoever made "for in" and "for of" do different things is in for a rough time at the pearly gates

        postcard.style.maxWidth = "35em";

        //Count locked vs. unlocked
        let bannerLockQ = postcard.querySelector(".bannerpostcardlocked");
        let bannerLocked = false;
        if(bannerLockQ === null){
            postcard.classList.add("unlocked");
        }else{
            bannerLocked = true;
            postcard.classList.add("locked");
        }

        if(stopRotation){
            postcard.firstChild.style.transform = "rotate(0.0)";
        }
        if(removePostmarks && !bannerLocked){
                const postmark = postcard.querySelector("div.bannerpostcardpostmark");
                postmark.remove();
        }
        if(removeStamps && !bannerLocked){
                const stamp = postcard.querySelector("div.bannerpostcardstamp");
                stamp.remove();
            
        }
        if(whiteBackground){
            postcard.firstChild.style.background = "#FFFFFF"
        }
        if(removeRarity){
            const rarityInfo = postcard.querySelector("span.bannerworldwide");
            rarityInfo.innerText = ""; //Not removing the element because then the banner controls shift left and it looks ugly.
        }
        if(deItalicTitles){
            const titleELement = postcard.querySelector("div.bannerpostcardtitle");
            titleELement.style.fontStyle = "normal";
        }
        if(moveTitleToTop){
            //Locked banners have a div instead of an img element.
            const titleELement = postcard.querySelector("div.bannerpostcardtitle");
            const imageElement = postcard.querySelector(".bannerpostcardimage");
            postcard.firstChild.insertBefore(titleELement, imageElement)
            titleELement.style.padding = "0.35em"; //Otherwise it looks cramped.
        }
        if(roundCorners){
            postcard.firstChild.style.borderRadius = "5px"
        }
        if(spaceFillingBanners){
            wideImage(postcard)
        }
        if(legacySelectorPosition && moveTitleToTop && !bannerLocked){
            const titleELement = postcard.querySelector("div.bannerpostcardtitle");
            const selectorElement = postcard.querySelector(".bannerselectbar");
            titleELement.prepend(selectorElement);
            selectorElement.style.setProperty("float", "right");
            selectorElement.style.setProperty("padding", "1em");
        }
        if(respaceBanners && legacySelectorPosition && moveTitleToTop && removeRarity){
            const controlElement = postcard.querySelector("div.bannerchoicecontrols"); ///Removes the rarity (as the only thing remaining in this div)
            controlElement.remove();
        }

        if(displayLockedBanners && bannerLocked){
            const originalImageElement = postcard.querySelector(".bannerpostcardimage");
            const originalImageElementParent = originalImageElement.parentElement;
            const newImageElement = document.createElement("img");

            //Get the image URL that we need.
            let imgURL = "https://www.nationstates.net/images/banners/samples/_1.jpg";
            let imgID = postcard.getAttribute("id").replace("banner_", "");
            if(imgID[0] != "_"){
                imgURL = "https://www.nationstates.net/images/banners/samples/" + imgID + ".jpg";
            }

            newImageElement.src = imgURL;
            newImageElement.classList.add("bannerpostcardimage", "placeholder");
            newImageElement.style.zIndex = -1;

            originalImageElementParent.replaceChild(newImageElement, originalImageElement);

            //Change it to reflect other changes as required.
            if(spaceFillingBanners){
                wideImage(postcard)
            }

            //Add a lock in front of it, like I had before!
            const lockElement = document.createElement("i");
            lockElement.classList.add("icon-lock");
            lockElement.style.zIndex = 1;
            lockElement.style.position = "absolute";
            lockElement.style.left = "43%";

            //Otherwise the lock icon looks out of position on the banner.
            if(moveTitleToTop){
                lockElement.style.top = "42%";
            }
            else{
                lockElement.style.top = "27%";
            }
            
            lockElement.style.fontSize = "200%";
            //lockElement.style.filter = "drop-shadow(2px 2px 40px #ffffff)"; Looked terrible.
            lockElement.style.webkitTextStroke = "1px white"; //Provides better contrasting.
            originalImageElementParent.appendChild(lockElement);

        }
    }

    //Banner counter information display.
    if(countUnlockedOrLockedBanners){
        const selectorExposition = document.querySelector("h1").nextElementSibling.nextElementSibling;
        const unlockedAmount = document.createElement("div");

        const results = getNumberOfVisibleLockedAndUnlockedBanners(postcards);
        unlockedAmount.id = "unlockedText";
        unlockedAmount.innerText = ("\n Completion: " + results.get("unlocked") + "/" + (results.get("locked")+results.get("unlocked")) + " (" + (((results.get("unlocked")/(results.get("locked")+results.get("unlocked")))*100).toFixed(2)) + "%)");

        unlockedAmount.style.fontSize = "145%";
        unlockedAmount.style.fontFamily = "Georgia,Garamond,Times New Roman,serif";
        unlockedAmount.style.display = "flex";
        unlockedAmount.style.justifyContent = "center";
        selectorExposition.appendChild(unlockedAmount);
    }

    //Filters
    let activeFilters = [];

    //Filter by category
    if(addFilteringFunction){
        //BannerMonitorEnhanced (my first public release of this sort of userscript)
        //had terrible DOM modification as a result of my inexperience with it.
        //This will hopefully be an easier to maintain version.

        const selectionInput = document.createElement("select");
        selectionInput.classList.add("button");
        let availableCategories =
            ['Answering Issues','Authoritarianism','Business Subsidization','Charmlessness',
             'Cheerfulness','Civil Rights','Compassion','Corruption','Crime','Culture',
             'Customizable Field','Deaths','Defense Forces','Dispatches','Easter Egg',
             'Eco-Friendliness','Economic Freedom','Economy','Environmental Beauty',
             'Foreign Aid','Government Size','Health','Inclusiveness','Income','Income Equality',
             'Industries','Intelligence','Law Enforcement','Lifespan','Misc','Notable',
             'Patriotism','Policy','Political Freedom','Population',
             'Public Education','Public Healthcare','Public Transport',
             'Recreational Drug Use','Religiousness','Scientific Advancement',
             'Sector: Agriculture','Sector: Manufacturing','Tourism','Weather','Welfare','World Assembly',
             'Youth Rebelliousness'];

        for (const category in availableCategories) {
            const newOption = document.createElement("option");
            newOption.textContent = availableCategories[category];
            selectionInput.appendChild(newOption);
        }

        const searchButton = document.createElement("button");
        searchButton.classList.add("button");
        const searchIcon = document.createElement("span");
        searchIcon.style.fontFamily = "nationstates";
        searchIcon.innerText = "";
        const searchButtonText = document.createTextNode(" Filter");

        searchButton.appendChild(searchIcon);
        searchButton.appendChild(searchButtonText);
        searchButton.style.marginLeft = "1em";

        const clearButton = document.createElement("Button");
        clearButton.innerText = "Clear";
        clearButton.classList.add('button', 'icon-block', 'danger');
        $(clearButton).hide()

        clearButton.style.marginLeft = "1em";

        const bannerNavBox = document.createElement("div");
        bannerNavBox.appendChild(selectionInput);
        bannerNavBox.appendChild(searchButton);
        bannerNavBox.appendChild(clearButton);

        document.querySelector("h1").nextElementSibling.nextElementSibling.after(bannerNavBox);

        assigningClasses();

        selectionInput.value = "Population";

        searchButton.addEventListener("click", function(){
            removeOtherActiveFilter();
            activeFilters.push(sanatizeSearchTerm(selectionInput.value));
            activeFilterApply();
            $(clearButton).fadeIn(250);
            $(searchButton).fadeOut(250);
            selectionInput.disabled = true;
        });

        clearButton.addEventListener("click", function(){
            removeOtherActiveFilter();
            activeFilterApply();
            $(clearButton).fadeOut(250);
            $(searchButton).fadeIn(250);
            selectionInput.disabled = false;
        });

    }

    //A tool bar for showing only locked banners or unlocked banners.
    if(lockedOrUnlockedFilterBar){
        const buttonGroup = document.createElement("div");
        buttonGroup.setAttribute("class", "button-group");
        buttonGroup.style.paddingBottom = "0.5em";
        buttonGroup.style.float = "right";

        const buttonDefault = document.createElement("button");
        buttonDefault.setAttribute("class", "button active ecobutton");
        const spanDefault = document.createElement("span");
        spanDefault.title = "Both unlocked and locked (default view)";
        spanDefault.style.fontFamily = "nationstates";
        spanDefault.innerText = "";
        buttonDefault.appendChild(spanDefault);
        buttonGroup.appendChild(buttonDefault);

        const buttonUnlocked = document.createElement("button");
        buttonUnlocked.setAttribute("class", "button ecobutton");
        const spanUnlocked = document.createElement("span");
        spanUnlocked.title = "Only unlocked";
        spanUnlocked.style.fontFamily = "nationstates";
        spanUnlocked.innerText = "";
        buttonUnlocked.appendChild(spanUnlocked);
        buttonGroup.appendChild(buttonUnlocked);

        const buttonLocked = document.createElement("button");
        buttonLocked.setAttribute("class", "button ecobutton");
        const spanLocked = document.createElement("span");
        spanLocked.title = "Only locked";
        spanLocked.style.fontFamily = "nationstates";
        spanLocked.innerText = "";
        buttonLocked.appendChild(spanLocked);
        buttonGroup.appendChild(buttonLocked);

        document.querySelector("h1").nextElementSibling.nextElementSibling.after(buttonGroup);

        buttonDefault.addEventListener("click", () => {
            removeLockUnlockActiveFilter();
            activeFilterApply();
        });
        buttonUnlocked.addEventListener("click", () => {
            removeLockUnlockActiveFilter();
            activeFilters.push("unlocked");
            activeFilterApply();
        });
        buttonLocked.addEventListener("click", () => {
            removeLockUnlockActiveFilter();
            activeFilters.push("locked");
            activeFilterApply();
        });

        $('.ecobutton').on('click', function() {
            $('.active').toggleClass('active');
            $(this).addClass("active");

            buttonDefault.disabled = true;
            buttonUnlocked.disabled = true;
            buttonLocked.disabled = true;

            setTimeout(function() {
                buttonDefault.disabled = false;
                buttonUnlocked.disabled = false;
                buttonLocked.disabled = false;
            }, 200);

        });

    }

    //-------------------------------------------------------------------------------------------
    //Utility functions / other code.

    //Performs CSS modifications to banner images.
    function wideImage(postcard){
        const imageElement = postcard.querySelector(".bannerpostcardimage");
        imageElement.style.setProperty("border", "0px", "important");
        postcard.firstChild.style.padding = "0px";
    }

    //Show all banners
    function showAllBanners(){
        for (let postcard of postcards) {
            postcard.style.display = "block";
        }
    }

    //Apply active filters
    function activeFilterApply(){
        showAllBanners();
        for(let filter of activeFilters){
            filterBanner(filter);
        }
        recalcLockedUnlockedInfobox();
    }

    //Hide any banner that *doesn't* have this class.
    function filterBanner(classToFilter){
        if(!(classToFilter === undefined)){
            for (let postcard of postcards) {
                if(!postcard.classList.contains(classToFilter)){
                    postcard.style.display = "none";
                }
            }
        }
    }

    function removeLockUnlockActiveFilter(){
        let activeFilter = "";
        for(let filter of activeFilters){
            if(!(filter == "locked") && !(filter == "unlocked")){
                activeFilter = filter
            }
        }
        activeFilters = [];
        if(activeFilter != ""){
            activeFilters.push(activeFilter);
        }
    }

    function removeOtherActiveFilter(){
        let lockFilter = "";
        for(let filter of activeFilters){
            if((filter == "locked") || (filter == "unlocked")){
                lockFilter = filter
            }
        }
        activeFilters = [];
        if(lockFilter != ""){
            activeFilters.push(lockFilter);
        }
    }

    //Assign Banner Classes
    function ABC(bannerID, classesList){
        const bannerElement = document.getElementById(bannerID);
        const classesToAdd = classesList.split(",");

        if(classesToAdd.constructor === Array){
            classesToAdd.forEach(classDiscovered=>{
                bannerElement.classList.add(classDiscovered);
            });
        }else{
            bannerElement.classList.add(classesList);
        }
    }

    function assigningClasses(){
        ABC("banner_p4","Industries");
        ABC("banner_y167","Lifespan,PublicHealthcare,Welfare");
        ABC("banner_t22","AnsweringIssues");
        ABC("banner_m3","DefenseForces,CivilRights");
        ABC("banner_l19","Misc");
        ABC("banner_i29","Industries");
        ABC("banner_wa1","WorldAssembly");
        ABC("banner_l13","Lifespan");
        ABC("banner_t25","Inclusiveness,Compassion,Charmlessness");
        ABC("banner_y54","Culture,SectorAgriculture");
        ABC("banner_b1","Compassion,Industries,Charmlessness");
        ABC("banner_t1","Economy");
        ABC("banner_e9","Industries");
        ABC("banner_e5","Corruption,IncomeEquality,Economy");
        ABC("banner_i18","PublicHealthcare,Health");
        ABC("banner_y187","Industries");
        ABC("banner_y243","Policy");
        ABC("banner_m16","Industries");
        ABC("banner_y108","Industries");
        ABC("banner_c13","EconomicFreedom,Population");
        ABC("banner_c9","Economy,ScientificAdvancement,EnvironmentalBeauty");
        ABC("banner_l26","Policy");
        ABC("banner_x4","Policy");
        ABC("banner_y178","AnsweringIssues");
        ABC("banner_f3","Misc");
        ABC("banner_x6","Misc");
        ABC("banner_o10","Compassion,EnvironmentalBeauty");
        ABC("banner_c19","Population,Economy,EnvironmentalBeauty");
        ABC("banner_k8","IncomeEquality,Policy,DefenseForces");
        ABC("banner_i9","Industries");
        ABC("banner_y474","Lifespan,Culture,YouthRebelliousness,Authoritarianism,RecreationalDrugUse,Industries,Policy");
        ABC("banner_b19","Religiousness");
        ABC("banner_k1","Policy");
        ABC("banner_q1","WorldAssembly");
        ABC("banner_i22","Industries");
        ABC("banner_i17","Culture,Industries");
        ABC("banner_i21","Intelligence,Industries");
        ABC("banner_y219","Industries");
        ABC("banner_l14","Misc");
        ABC("banner_a9","SectorAgriculture");
        ABC("banner_d2","PublicEducation");
        ABC("banner_c1","Population,Economy");
        ABC("banner_n5","RecreationalDrugUse");
        ABC("banner_i32","Industries");
        ABC("banner_b11","BusinessSubsidization");
        ABC("banner_y117","Tourism,Misc");
        ABC("banner_y331","Misc");
        ABC("banner_i34","Industries");
        ABC("banner_l16","Tourism,Eco-Friendliness,BusinessSubsidization,EnvironmentalBeauty");
        ABC("banner_v1","CustomizableField,EasterEgg");
        ABC("banner_y91","Policy");
        ABC("banner_p18","Misc");
        ABC("banner_a1","SectorAgriculture");
        ABC("banner_y90","Weather");
        ABC("banner_y37","ForeignAid");
        ABC("banner_y222","Economy,EnvironmentalBeauty,Eco-Friendliness");
        ABC("banner_c8","Population,EnvironmentalBeauty");
        ABC("banner_t24","EnvironmentalBeauty,Economy");
        ABC("banner_i3","Eco-Friendliness");
        ABC("banner_i30","Industries");
        ABC("banner_b12","PublicHealthcare");
        ABC("banner_z9","Industries");
        ABC("banner_w6","Policy,religiousness");
        ABC("banner_e3","BusinessSubsidization");
        ABC("banner_b18","Religiousness");
        ABC("banner_y439","AnsweringIssues");
        ABC("banner_i15","PublicTransport");
        ABC("banner_d5","Intelligence,EnvironmentalBeauty");
        ABC("banner_h1","Misc,Tourism,Charmlessness,Policy");
        ABC("banner_o4","AnsweringIssues");
        ABC("banner_t21","Culture,Compassion,Population");
        ABC("banner_m4","DefenseForces");
        ABC("banner_l45","Eco-Friendliness,EnvironmentalBeauty");
        ABC("banner__0","Population");
        ABC("banner__1","Population");
        ABC("banner__2","Population");
        ABC("banner__3","Population");
        ABC("banner__4","Population");
        ABC("banner__9","Misc");
        ABC("banner_i50","Industries,Compassion,Misc");
        ABC("banner_y397","Policy");
        ABC("banner_y210","Policy");
        ABC("banner_l70","AnsweringIssues");
        ABC("banner_z2","Misc,PoliticalFreedom");
        ABC("banner_i24","Industries");
        ABC("banner_b8","PoliticalFreedom");
        ABC("banner_r9","Economy,EnvironmentalBeauty");
        ABC("banner_x11","Industries");
        ABC("banner_b15","PoliticalFreedom,Authoritarianism");
        ABC("banner_e14","BusinessSubsidization");
        ABC("banner_b6","PoliticalFreedom");
        ABC("banner_i58","Policy");
        ABC("banner_r10","Eco-Friendliness");
        ABC("banner_h2","EnvironmentalBeauty,Industries");
        ABC("banner_a4","SectorAgriculture");
        ABC("banner_y102","DefenseForces,Eco-Friendliness,EnvironmentalBeauty");
        ABC("banner_eg2","EasterEgg");
        ABC("banner_y261","EasterEgg");
        ABC("banner_y255","AnsweringIssues");
        ABC("banner_i2","Economy,Industries");
        ABC("banner_i5","Industries");
        ABC("banner_b35","PoliticalFreedom,Authoritarianism,Intelligence,Patriotism");
        ABC("banner_y479","Misc");
        ABC("banner_l3","Dispatches");
        ABC("banner_tv1","Industries");
        ABC("banner_d3","Economy,EnvironmentalBeauty");
        ABC("banner_i7","Economy,Industries");
        ABC("banner_p2","CivilRights");
        ABC("banner_p13","CivilRights");
        ABC("banner_p14","CivilRights");
        ABC("banner_p15","CivilRights");
        ABC("banner_p16","CivilRights");
        ABC("banner_p21","CivilRights");
        ABC("banner_p9","CivilRights");
        ABC("banner_p8","CivilRights");
        ABC("banner_p7","CivilRights");
        ABC("banner_p6","CivilRights");
        ABC("banner_p5","CivilRights");
        ABC("banner_p10","CivilRights");
        ABC("banner_p11","CivilRights");
        ABC("banner_p12","CivilRights");
        ABC("banner_c5","Industries,EnvironmentalBeauty");
        ABC("banner_t19","Misc");
        ABC("banner_y279","Patriotism");
        ABC("banner_l20","WorldAssembly");
        ABC("banner_z5","LawEnforcement");
        ABC("banner_y5","Industries");
        ABC("banner_y216","Policy");
        ABC("banner_e10","EconomicFreedom,Misc");
        ABC("banner_g1","PoliticalFreedom,Authoritarianism");
        ABC("banner_b38","Misc");
        ABC("banner_i12","SectorManufacturing");
        ABC("banner_tv9","Policy,PoliticalFreedom");
        ABC("banner_z3","Policy,Cheerfulness,CIvilRights,PoliticalFreedom");
        ABC("banner_y470","Income,Incomeequality,religiousness,policy");
        ABC("banner_m6","DefenseForces");
        ABC("banner_d20","Industries");
        ABC("banner_a5","Policy");
        ABC("banner_k13","Industries,culture,politicalfreedom,policy");
        ABC("banner_y280","Weather,Tourism");
        ABC("banner_b22","Corruption");
        ABC("banner_n2","DefenseForces");
        ABC("banner_m9","Misc,DefenseForces");
        ABC("banner_p22","Lifespan");
        ABC("banner_l65","AnsweringIssues");
        ABC("banner_g2","GovernmentSize,Corruption");
        ABC("banner_l34","Welfare");
        ABC("banner_i11","Policy");
        ABC("banner_y359","Religiousness");
        ABC("banner_y237","Welfare");
        ABC("banner_l22","PublicHealthcare");
        ABC("banner_z1","Culture,Intelligence");
        ABC("banner_y473","Eco-Friendliness,EnvironmentalBeauty");
        ABC("banner_t26","AnsweringIssues");
        ABC("banner_y53","Misc");
        ABC("banner_b20","Religiousness");
        ABC("banner_p3","CivilRights");
        ABC("banner_t33","Welfare");
        ABC("banner_y163","Notable");
        ABC("banner_f4","AnsweringIssues");
        ABC("banner_t57","Industries");
        ABC("banner_y194","ForeignAid,DefenseForces");
        ABC("banner_t5","Culture");
        ABC("banner_l12","EnvironmentalBeauty,Tourism");
        ABC("banner_l2","Misc");
        ABC("banner_y375","Notable");
        ABC("banner_k4","Religiousness,DefenseForces");
        ABC("banner_t10","Religiousness");
        ABC("banner_r5","Economy,IncomeEquality");
        ABC("banner_l35","Inclusiveness,Compassion,Charmlessness");
        ABC("banner_y2","Industries");
        ABC("banner_o2","Tourism");
        ABC("banner_e17","Misc,Charmlessness,Crime");
        ABC("banner_l17","Population,Inclusiveness,Compassion,Charmlessness");
        ABC("banner_y61","PoliticalFreedom");
        ABC("banner_t8","AnsweringIssues");
        ABC("banner_l36","AnsweringIssues");
        ABC("banner_n3","PublicHealthcare");
        ABC("banner_k2","Misc");
        ABC("banner_d7","Misc");
        ABC("banner_c4","Population,Economy");
        ABC("banner_x5","EasterEgg");
        ABC("banner_y202","Policy,Inclusiveness");
        ABC("banner_b4","Industries,Economy");
        ABC("banner_p37","WorldAssembly");
        ABC("banner_e11","EconomicFreedom,GovernmentSize");
        ABC("banner_c14","Population,Economy");
        ABC("banner_i28","Income");
        ABC("banner_y244","Misc");
        ABC("banner_i16","ScientificAdvancement,Industries");
        ABC("banner_y477","Tourism,Culture");
        ABC("banner_y38","Civilrights,Cheerfulness");
        ABC("banner_y58","Weather,Environment");
        ABC("banner_p26","Misc");
        ABC("banner_s1","LawEnforcement");
        ABC("banner_p24","Cheerfulness,CivilRights");
        ABC("banner_y82","Lifespan,Culture,YouthRebelliousness,Authoritarianism,RecreationalDrugUse,Industries");
        ABC("banner_y413","Policy");
        ABC("banner_b32","PublicEducation");
        ABC("banner_y182","Compassion,Charmlessness,Intelligence");
        ABC("banner_y236","EconomicFreedom,Policy");
        ABC("banner_y330","Industries");
        ABC("banner_b7","PoliticalFreedom,Authoritarianism");
        ABC("banner_y454","AnsweringIssues");
        ABC("banner_y475","PublicTransport,Weather");
        ABC("banner_p38","CivilRights,PoliticalFreedom,IncomeEquality");
        ABC("banner_x7","Notable");
        ABC("banner_l41","Religiousness");
        ABC("banner_t6","Misc");
        ABC("banner_b24","Authoritarianism");
        ABC("banner_p31","Misc,Lifespan");
        ABC("banner_i8","Notable");
        ABC("banner_e4","Policy");
        ABC("banner_y476","Lifespan,Industries");
        ABC("banner_y347","Misc");
        ABC("banner_y68","Industries");
        ABC("banner_m8","DefenseForces");
        ABC("banner_n1","PublicHealthcare");
        ABC("banner_b16","ScientificAdvancement");
        ABC("banner_c15","Population,Economy");
        ABC("banner_y169","Deaths,Misc");
        ABC("banner_l40","AnsweringIssues");
        ABC("banner_c3","Population,Economy");
        ABC("banner_a7","Policy,SectorAgriculture");
        ABC("banner_l57","AnsweringIssues");
        ABC("banner_b3","Intelligence");
        ABC("banner_f1","Eco-Friendliness,Industries");
        ABC("banner_i1","Economy,EnvironmentalBeauty");
        ABC("banner_c6","Population,EnvironmentalBeauty,Economy");
        ABC("banner_b2","Intelligence");
        ABC("banner_b37","Misc");
        ABC("banner_t16","Economy,CivilRights,PoliticalFreedom,Misc");
        ABC("banner_p1","YouthRebelliousness,CivilRights,Crime");
        ABC("banner_y154","Inclusiveness,Patriotism,Policy");
        ABC("banner_s3","Policy");
        ABC("banner_b14","Policy");
        ABC("banner_y367","Misc");
        ABC("banner_o9","Misc");
        ABC("banner_y119","Industries");
        ABC("banner_t36","Weather");
        ABC("banner_b17","Economy,IncomeEquality");
        ABC("banner_t27","Culture");
        ABC("banner_y266","Policy");
        ABC("banner_c20","Notable,Misc");
        ABC("banner_w1","EnvironmentalBeauty");
        ABC("banner_y401","DefenseForces,Industries");
        ABC("banner_u1","YouthRebelliousness");
        ABC("banner_d4","Misc");
        ABC("banner_i67","Industries,Policy");
        ABC("banner_r11","Crime");
        ABC("banner_y122","Policy");
        ABC("banner_l24","Misc");
        ABC("banner_eg1","EasterEgg");
        ABC("banner_p20","Cheerfulness");
        ABC("banner_o3","EnvironmentalBeauty");
        ABC("banner_y184","Eco-Friendliness");
        ABC("banner_l31","ScientificAdvancement,Economy");
        ABC("banner_b31","Religiousness,Deaths");
        ABC("banner_t31","Tourism,Misc");
        ABC("banner_i26","PublicTransport");
        ABC("banner_y153","LawEnforcement");
        ABC("banner_a6","Misc");
        ABC("banner_y14","Misc");
        ABC("banner_t9","EnvironmentalBeauty,Economy");
        ABC("banner_e2","BusinessSubsidization");
        ABC("banner_x9","Misc");
        ABC("banner_x14","Crime,corruption");
        ABC("banner_x1","ScientificAdvancement");
        ABC("banner_l11","Health,CivilRights,EnvironmentalBeauty");
        ABC("banner_y49","AnsweringIssues");
        ABC("banner_l27","EnvironmentalBeauty,Deaths");
        ABC("banner_t11","LawEnforcement,ScientificAdvancement");
        ABC("banner_b23","Corruption");
        ABC("banner_y138","DefenseForces,Misc");
        ABC("banner_m5","DefenseForces");
        ABC("banner_l29","Policy,EnvironmentalBeauty,Intelligence");
        ABC("banner_x12","DefenseForces,Authoritarianism");
        ABC("banner_m7","DefenseForces");
        ABC("banner_l18","Policy");
        ABC("banner_y30","Policy");
        ABC("banner_y46","Misc");
        ABC("banner_b28","Misc");
        ABC("banner_b25","Religiousness,Inclusiveness");
        ABC("banner_y132","PublicTransport,Religiousness");
        ABC("banner_g3","GovernmentSize");
        ABC("banner_i4","Industries");
        ABC("banner_i40","Industries,Deaths");
        ABC("banner_i13","Industries");
        ABC("banner_p23","Policy");
        ABC("banner_p17","Misc,PoliticalFreedom");
        ABC("banner_c16","PublicEducation");
        ABC("banner_b27","RecreationalDrugUse,Religiousness");
        ABC("banner_a3","SectorAgriculture,EnvironmentalBeauty");
        ABC("banner_c7","Industries");
        ABC("banner_c10","Economy,EnvironmentalBeauty");
        ABC("banner_k3","PoliticalFreedom,Authoritarianism");
        ABC("banner_i51","Industries");
        ABC("banner_i20","ScientificAdvancement,PublicTransport");
        ABC("banner_t14","AnsweringIssues");
        ABC("banner_i19","Policy,Economy");
        ABC("banner_y99","PublicTransport");
        ABC("banner_y73","Crime,CivilRights,PoliticalFreedom");
        ABC("banner_l1","CustomizableField");
        ABC("banner_y335","Policy");
        ABC("banner_y172","IncomeEquality,Policy");
        ABC("banner_b34","Misc");
        ABC("banner_y471","Policy");
        ABC("banner_l25","Lifespan");
        ABC("banner_b9","Religiousness,compassion");
        ABC("banner_c11","Population,Economy");
        ABC("banner_o5","WorldAssembly");
        ABC("banner_l30","Lifespan");
        ABC("banner_l10","Eco-Friendliness,EnvironmentalBeauty");
        ABC("banner_e1","EconomicFreedom");
        ABC("banner_c2","Population,Economy");
        ABC("banner_l21","Population");
        ABC("banner_l37","AnsweringIssues");
        ABC("banner_y301","Welfare");
        ABC("banner_y360","Misc");
        ABC("banner_y238","Misc");
        ABC("banner_y353","Cheerfulness,ScientificAdvancement");
        ABC("banner_a2","EnvironmentalBeauty,SectorAgriculture");
        ABC("banner_l7","EnvironmentalBeauty,Deaths");
        ABC("banner_l39","EnvironmentalBeauty,Industries");
        ABC("banner_d8","Industries");
        ABC("banner_t17","Culture,GovernmentSize");
        ABC("banner_b29","Religiousness,Policy");
        ABC("banner_b13","LawEnforcement");
        ABC("banner_l28","Population");
        ABC("banner_r6","Economy");
        ABC("banner_r2","Economy");
        ABC("banner_y379","AnsweringIssues");
        ABC("banner_y396","Income");
        ABC("banner_b5","Industries");
        ABC("banner_i47","Industries");
        ABC("banner_o8","EnvironmentalBeauty,Economy");
        ABC("banner_t23","Misc");
        ABC("banner_y96","Industries,CivilRights,Tourism");
        ABC("banner_c17","Population,Economy");
        ABC("banner_y204","Policy,Notable");
        ABC("banner_i25","Industries");
        ABC("banner_d1","Economy,Crime,Population");
        ABC("banner_y179","Industries");
        ABC("banner_r3","Income,IncomeEquality");
        ABC("banner_r4","Economy");
        ABC("banner_l42","AnsweringIssues");
        ABC("banner_l8","Industries");
        ABC("banner_l4","Dispatches");
        ABC("banner_l23","SectorManufacturing");
        ABC("banner_b21","Health");
        ABC("banner_l43","DefenseForces");
        ABC("banner_p19","CivilRights,Economy");
        ABC("banner_c18","Population,Economy");
        ABC("banner_t59","AnsweringIssues");
        ABC("banner_r7","Dispatches");
        ABC("banner_y188","Inclusiveness,Tourism,Culture");
        ABC("banner_y228","Intelligence");
        ABC("banner_y220","Policy,Welfare");
        ABC("banner_t18","Corruption,Culture");
        ABC("banner_m2","DefenseForces");
        ABC("banner_y320","DefenseForces");
        ABC("banner_f5","Industries");
        ABC("banner_m1","DefenseForces");
        ABC("banner_l32","Inclusiveness,Compassion,Charmlessness");
        ABC("banner_y114","Industries");
        ABC("banner_r16","Policy");
        ABC("banner_y76","Income");
        ABC("banner_i23","Industries");
        ABC("banner_w2","EasterEgg");
        ABC("banner_y101","Economicfreedom");
        ABC("banner_y268","ForeignAid");
        ABC("banner_y256","ScientificAdvancement,Crime");
        ABC("banner_z8","Industries,Corruption,PoliticalFreedom,Authoritarianism,Policy");
        ABC("banner_i14","Industries,SectorAgriculture");
        ABC("banner_l44","EnvironmentalBeauty,Population");
        ABC("banner_y206","Misc");
        ABC("banner_t4","Policy,Economy");
        ABC("banner_y85","Industries,ScientificAdvancement,Culture");
        ABC("banner_r8","Misc");
        ABC("banner_t15","Misc");
        ABC("banner_w3","Policy");
        ABC("banner_n4","ScientificAdvancement");
        ABC("banner_x3","Policy");
        ABC("banner_l33","Policy");
        ABC("banner_c21","Population,Economy");
        ABC("banner_s2","LawEnforcement");
        ABC("banner_s4","Policy");
        ABC("banner_p41","Welfare");
        ABC("banner_p25","CivilRights");
        ABC("banner_l9","Culture,Tourism");
        ABC("banner_i6","SectorManufacturing");
        ABC("banner_y62","Industries");
        ABC("banner_y472","PublicTransport");
        ABC("banner_t13","EnvironmentalBeauty,Religiousness");
        ABC("banner_f2","Eco-Friendliness,EnvironmentalBeauty");
        ABC("banner_l5","Policy");
        ABC("banner_r1","IncomeEquality");
        ABC("banner_l6","Misc");
        ABC("banner_t12","IncomeEquality,Culture");
        ABC("banner_z4","YouthRebelliousness,CivilRights");
        ABC("banner_u2","SectorManufacturing,Crime");
        ABC("banner_t38","EconomicFreedom");
        ABC("banner_c12","Population");
        ABC("banner_x2","Policy");
        ABC("banner_i10","Industries");
        ABC("banner_o1","CustomizableField");
        ABC("banner_y22","Industries,Policy,Notable");
        ABC("banner_l64","AnsweringIssues");
        ABC("banner_t2","Culture");
        ABC("banner_l47","Policy,CivilRights,PoliticalFreedom");
        ABC("banner_o6","EnvironmentalBeauty");
        ABC("banner_y478","Policy");
        ABC("banner_p68","Policy,Industries");
        ABC("banner_y100","Misc");
        ABC("banner_l71","CivilRights,EnvironmentalBeauty");
        ABC("banner_d6","Industries");
        ABC("banner_y224","Policy");
        ABC("banner_t20","Population,CivilRights,Culture");
        ABC("banner_l38","AnsweringIssues");
        ABC("banner_y127","Policy,Economy");
        ABC("banner_b10","BusinessSubsidization");
    }

    function sanatizeSearchTerm(term){
        let cleanTerm = "";
        term = term.replaceAll(" ", "");
        cleanTerm = term.replaceAll(":","");
        return cleanTerm;
    }

    function getNumberOfVisibleLockedAndUnlockedBanners(postcards){
        let locked = 0;
        let unlocked = 0;

        //Still needs to check visibility. Display == "none"
        for (let postcard of postcards){
            if(postcard.style.display != "none"){
                let bannerLockQ = postcard.querySelector(".bannerpostcardlocked");
                if(bannerLockQ === null){
                    unlocked += 1;
                }else{
                    locked += 1;
                }
            }
        }

        //Returning in an array means that I get really abstracted code that's hard to read elsewhere...
        //What about a dictionary? Well, a map. ...Still really verbose but at least I can read it.
        let results = new Map();
        results.set("locked", locked);
        results.set("unlocked", unlocked);
        return results;
    }

    function recalcLockedUnlockedInfobox(){
        //Check if the information bar is enabled to start with to avoid errors.
        if(!(document.querySelector("div#unlockedText") === null)){
            const infoline = document.querySelector("div#unlockedText");

            //Need to get unlocked vs. locked values first...
            const results = getNumberOfVisibleLockedAndUnlockedBanners(postcards);
            const unlocked = results.get("unlocked");
            const locked = results.get("locked");

            let lockFilter = "";
            let otherFilter = "";
            for(let filter of activeFilters){
                if((filter == "locked") || (filter == "unlocked")){
                    lockFilter = filter;
                }
                else{
                    otherFilter = filter;
                }
            }

            if((lockFilter == "") && (otherFilter == "")){
                infoline.innerText = ("\n Completion: " + (unlocked) + "/" + (locked+unlocked) + " (" + (((unlocked)/(locked+unlocked))*100).toFixed(2) + "%)");
            }
            else if((lockFilter == "")){
                let selectionInput = document.querySelector("select");
                infoline.innerText = ("\n" + selectionInput.value + " Completion: " + (unlocked) + "/" + (locked+unlocked) + " (" + (((unlocked)/(locked+unlocked))*100).toFixed(2) + "%)");
            }

            if((lockFilter == "locked") && (otherFilter == "")){
                infoline.innerText = ("\n Locked: " + locked);
            }
            else if(lockFilter == "locked"){
                let selectionInput = document.querySelector("select");
                infoline.innerText = ("\n" + selectionInput.value + " Locked: " + locked);
            }

            if((lockFilter == "unlocked") && (otherFilter == "")){
                infoline.innerText = ("\n Unlocked: " + unlocked);
            }
            else if(lockFilter == "unlocked"){
                let selectionInput = document.querySelector("select");
                infoline.innerText = ("\n" + selectionInput.value + " Unlocked: " + unlocked);
            }
        }
    }
})();