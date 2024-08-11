// NYC City File

// Building Coordinate Storages
let bg_buildings = []; 
let bg_buildings_coords = []; 
let bg_completed = false; 
let buildings = []; 
let buildings_coords = [];
let startingDecay = 100; // Initial "Starting" lvls, with 100 being least decay to 1 being most decay

// Important landmark signals & count
let landmarks = 0; 
let signalSpeed = 1; 
let moved = false; 
let insCol = 255; 

let startSceneHeight = 20; 
let startScene = true; 

let nybg; // Final City Background

// Submarine Variables & Coordinates Store
let sub; 
let bub; 
let bubbleSpeed = 5; 
let control; 
let right = true; 
let left = false; 
let speed = 2; 
let amb; 
let eng; 
let son; 
let lib; 
let playingEng = false; 
let playingAmb = false; 

// Scanning Info
let scanSuccess = false; 
let numScans = 0; 
let numb = 255; 
let lvl = 500; 
let ping = 40; 
let pingup = true; 
let pingdown = false; 

function preload(){ // Loading all external image assets
    sub = loadImage("./assets/sub.png"); 
    bub = loadImage("./assets/bubbles.png");
    amb = loadSound("./assets/amb.mp3");
    eng = loadSound("./assets/engine.mp3"); 
    son = loadSound("./assets/sonar.mp3");
    lib = loadImage("./assets/lib.png"); 
    nybg = loadImage("./assets/nycbg.png");
    apt1 = loadImage("./assets/apt1.png"); 
    apt2 = loadImage("./assets/apt2.png"); 
    apt2 = loadImage("./assets/apt3.png"); 
}

function setup(){
    let cnv = createCanvas(1200, 650); 
    cnv.parent("canvas-parent");
    colorMode(HSL); 

    let bg_builds_incr = round(random(45, 75)); // Background Buildings
    for(let i = 0; i < 3600; i += bg_builds_incr){ // 3600 = Max Width of Map Area Dimension
        let widths = round(random(70, 90)); 
        let heights = round(random(150, 300)); 
        let newbd = new Building(i, widths, heights, 100, 100); 
        newbd.build(); 
        bg_buildings.push(newbd); 
        bg_builds_incr = round(random(45, 75)); 
    }

    bg_completed = true; // Determines that overall scene can begin processing

    for(let i = 0; i < 3600; i += bg_builds_incr){ // Norm. Builds
        let widths = round(random(70, 90)); 
        let heights = round(random(150, 300));
        let newbd = new Building(i, widths, heights, startingDecay, 0); 
        if(startingDecay > 5){
            startingDecay -= 3; 
        }
        newbd.build(); 
        buildings.push(newbd); 
        bg_builds_incr = round(random(90, 100));
    }

    control = new Sub(50, 10); // Declares the sub object
    
}

function draw(){

    if(numScans < landmarks){ // When image not fully completed, build basic background
        background(215, 38, 50); 
        
        push(); 
        colorMode(RGB); 
        noStroke(); 
        fill(168, 191, 230); 
        rect(0, 0, 3600, 55); 
        
        fill(255); 
        rect(0, 55, 3600, 10); 
        pop(); 
        
    } else{ // Loads icons & Colors
        background(208, 50, 50);
        image(lib, 250, -175); 
        push(); 
        scale(0.3); 
        image(nybg, 0, 75); 
        pop(); 
        
    }
    
    fill(0); 
    rect(0, 400, 3600, 250); // 650 - 250 (Ground), then (650-250) - createGrahpics Height

    // Building Coordinate Updaters
    if(numScans < landmarks){
        for(let i = 0; i < bg_buildings.length; ++i){
            bg_buildings[i].update(bg_buildings_coords[i]); 
        }
    }
    
    for(let i = 0; i < buildings.length; ++i){
        buildings[i].update(buildings_coords[i]);
    }

    // Sub Controls to vary the location of the buildings
    // Map only begins to move once the sub has reached one end
    // or the other to "push" the scene forward. 
    if(keyIsDown(68)){ // Right

        if(!playingEng){ // Should play only when sub moving
            eng.play(); 
            playingEng = true; 
        }

        // Declared and Swapped between for 
        // sub turning purposes
        right = true; 
        left = false; 
        if((control.x >= (width - 200) || numScans >= 5)){
            // Building Coordinate Updaters
            if(buildings[buildings.length - 1].x > control.x){
                if(numScans < landmarks){
                    for(let i = 0; i < bg_buildings.length; ++i){
        
                        bg_buildings[i].x -= 5; 
                        
                        bg_buildings[i].update(bg_buildings_coords[i]); 
                        
                    }
                }
                
                for(let i = 0; i < buildings.length; ++i){
                    buildings[i].x -= 5; 
                    buildings[i].update(buildings_coords[i]);
                }
            }

        } else { // Speed Control, allows sub to slowly speed up (More realistic)
            if(control.x < 1200){
                control.x += speed; 
                if(speed < 5){
                    speed *= 1.01; 
                }
            }
            
        }
        
    }

    if(keyIsDown(65)){ // Left
        if(!playingEng){
            eng.play(); 
            playingEng = true; 
        }
        
        right = false; 
        left = true; 
        if((control.x < (0 + 200) || numScans >= 5)){

            if(buildings[0].x < control.x){
                if(numScans < landmarks){
                    for(let i = 0; i < bg_buildings.length; ++i){
                        bg_buildings[i].x += 5;
                        
                        bg_buildings[i].update(bg_buildings_coords[i]); 
                    }
                }
                
                for(let i = 0; i < buildings.length; ++i){
                    buildings[i].x += 5; 
                    buildings[i].update(buildings_coords[i]);
                }
            }

        } else{
            if(control.x > 0){
                control.x -= speed; 
                if(speed < 5){
                    speed *= 1.01; 
                }
            }
            
            
        }
        
    }

    if(keyIsDown(87)){ // Up
        if(!playingEng){
            eng.play(); 
            playingEng = true; 
        }
        if(control.y >= 10){
            control.y -= 1; 
        }
    }

    if(keyIsDown(83)){  // Down
        if(!playingEng){
            eng.play(); 
            playingEng = true; 
        } 
        if(control.y <= (height - 75)){
            control.y += 1; 
        }
    }

    if(numScans < 5){ // Keep displaying the sub if not fully explored
        control.update(); 
    }

    // Frontal HUD Details
    push();
    fill(255); 
    translate(0, height-200); 
    rotate(radians(30)); 
    noStroke(); 
    rect(0, 0, 450, 300); 
    rotate(radians(-15)); 
    rect(225, 40, 550, 300); 
    rotate(radians(-30)); 
    rect(450, 275, 550, 300); 
    rotate(radians(45)); 
    rect(950, -450, 550, 300); 
    pop(); 

    if(moved == false){ // Instructions to briefly display
        push(); 
        fill(insCol); //168, 191, 230
        if(insCol <= 255){
            insCol -= 5; 
        }

        if(insCol == 5){
            insCol = 255;
        }
        textSize(12); 
        translate(-200, -450); 
        text("W", 500, 475);
        text("S", 500, 500);
        text("A", 475, 500);
        text("D", 525, 500);
        text("Tap Sub Structure with control to ping and return to base.", 550, 475);
        pop(); 
    }

    // For Building Full City Image
    if(numScans >= 5){ 
        for(let i = 0; i < buildings.length; ++i){
            buildings[i].landMarked = true; 
            buildings[i].scanning(i); 
            buildings[i].landMarked = false; 
        }

        // Screen Flash revealing the ancient city
        push(); 
        colorMode(RGB); 
        fill(numb, lvl); 
        rect(0, 0, 3600, height);
        if(lvl > 0){
            lvl -= 5; 
        }
        amb.stop(); 
        pop(); 
    }
    
}

class Building{
    constructor(x, width, height, decay, color){
        this.x = x; 
        this.y = 400 - height; 
        this.wid = width; 
        this.hei = height; 
        this.dec = decay; 
        this.color = color; 
        this.scanned = false; 
        this.landMarked = false; 

        this.bd = createGraphics(this.wid, this.hei);
    }

    decay(){
        
        let orgDecay = this.dec; // Keeps track of the original decay levels set for building
        let decFactor = 0; 
        this.bd.erase(); 
        this.bd.noStroke(); 

        for(let i = 0; i < this.y; i += round(this.dec * 0.3)){

            this.dec = orgDecay; 
            decFactor += 1;
            this.dec += decFactor; 
            //let rotVar = 45; 
            push(); 
            
            for(let k = 0; k < this.wid; k += round(this.dec * 0.3)){
                //push(); 
                translate(i, k); 
                //rotate(radians(rotVar));
                if(this.dec > 30){
                    rotate(radians(round(random(0, 45))));
                }
                //
                if(this.dec > 70){
                    if(round(random(0, 1)) == 0){
                        this.bd.rect(i + 5, k - round(random(5, this.hei - 400)), round(random(5, 25)), round(random(5, 25)));
                    } else {
                        this.bd.ellipse(i + 5, k - round(random(5, this.hei - 400)), round(random(5, 25)), round(random(5, 25)));
                    }
                     
                    
                } else {
                    //this.bd.rect(i, k - round(random(5, 35)), 25, 10);
                    this.bd.rect(i, k - round(random(5, this.hei - 400)), round(random(5, 15)), round(random(5, 15)));
                }
                
            }
            pop(); 

        }

        this.bd.noErase(); 

    }

    checkIfPressed(){
        push(); 
        if(mouseX > this.x && mouseX < (this.x + this.wid) && mouseY > this.y && mouseY < (this.y + this.hei)){
            scanSuccess = true; 
            if(this.landMarked){
                son.play(); 
            }
            
        }
        pop(); 
    }

    scanning(){

        if(numScans >= 5){
            scanSuccess = true; 
        } else{
            this.checkIfPressed(); 
        }

        if(scanSuccess && this.scanned == false && this.landMarked){
            
            let chance = round(random(0, 2)); 
            if(chance == 0){
                this.bd.background(56, 12, 3); 
            } else if(chance == 1){
                this.bd.background(84, 61, 57);
            } else {
                this.bd.background(161, 102, 92); 
            }

            this.scanned = true; 
            if(this.landMarked){
                numScans += 1; 
            }
            
            if(this.wid <= 80){
                let windx = this.wid / 2; 
                this.bd.fill(72, 133, 108); 
                this.bd.noStroke(); 
                for(let i = this.y - 400; i < this.hei; i += 60){
                    if(chance == 2 || chance == 1){
                        this.bd.fill(149, 163, 42); 
                    }
                    this.bd.rect(windx - 25, i, 20, 30);
                    this.bd.rect(windx + 10, i, 20, 30);    
                }
            } else {
                let windx = this.wid / 3; 
                this.bd.fill(72, 133, 108); 
                this.bd.noStroke(); 
                for(let i = this.y - 400; i < this.hei; i += 60){
                    if(chance == 2 || chance == 1){
                        this.bd.fill(149, 163, 42); 
                    }
                    this.bd.rect(windx - 20, i, 15, 25);
                    this.bd.rect(windx + 7, i, 15, 25);
                    this.bd.rect(windx + 35, i, 15, 25);
                }
            }

        }

        scanSuccess = false; 

    }

    build(){

        this.bd.background(this.color);  
        // bd.erase(); // Code for making damage
        // bd.noStroke(); 
        // bd.circle(3, 30, 30); 

        if(this.color == 0){

            let markedChance = round(random(0, 100)); 
            if(markedChance <= 20){
                this.landMarked = true; 
                landmarks += 1; 
            }

            if(this.wid <= 80){
                let windx = this.wid / 2; 
                this.bd.fill(255); 
                this.bd.noStroke(); 
                for(let i = this.y - 400; i < this.hei; i += 60){
                    this.bd.rect(windx - 25, i, 20, 30);
                    this.bd.rect(windx + 10, i, 20, 30);    
                }

            } else {
                let windx = this.wid / 3; 
                this.bd.fill(255); 
                this.bd.noStroke(); 
                for(let i = this.y - 400; i < this.hei; i += 60){
                    this.bd.rect(windx - 20, i, 15, 25);
                    this.bd.rect(windx + 7, i, 15, 25);
                    this.bd.rect(windx + 35, i, 15, 25);
                }
            }

            this.decay(); 

        }
        
        if(!bg_completed){
            bg_buildings_coords.push(this.bd);
        } else {
            buildings_coords.push(this.bd); 
        }
                 
    }

    update(bd){
        image(bd, this.x, this.y); // 400 is ground level calculations
        if(this.landMarked){
            push(); 
            strokeWeight(0.4); 
            if(pingup){
                ping += 0.05; 
                if(ping >= 70){
                    pingup = !pingup; 
                }
            } else if(!pingup){
                ping -= 0.05; 
                if(ping <= 40){
                    pingup = !pingup; 
                }
            }
            fill(199, 126, ping);
            
            if(ping >= 55){
                arc(this.x + 40, this.y, 40, 10, PI, TWO_PI);
            }
            pop();
        }
    }
}

class Sub{
    constructor(x, y){
        this.x = x; 
        this.y = y; 
        this.bx = this.x; 
        this.dir = 0.2;

    }

    bubbles(){
        push(); 
        scale(0.01); 

        image(bub, this.bx, this.y); 
        pop(); 
    }

    update(){
        push(); 
        translate(this.x, this.y);  

        if(right){
            scale(this.dir, 0.2);
            if(this.dir < 0.2){
                this.dir += 0.005; 
                this.turned = false; 
            }
            
        }

        if(left){
            scale(this.dir, 0.2);
            if(this.dir > -0.2){
                this.dir -= 0.005; 
            } 
        }
         
        image(sub, 0, 0);  
        pop(); 
    }

    // Sub function that returns user back to main map when clicked
    return(){
        if(right){
            if(mouseX > this.x && mouseX < this.x + 200 && mouseY > this.y && mouseY < this.y + 60){
                window.location.href = "../index.html";
            }
        } else if(left){
            if(mouseX < this.x && mouseX > this.x - 200 && mouseY > this.y && mouseY < this.y + 60){
                window.location.href = "../index.html";
            }
        }
    }
}

function keyReleased(){ // Stops and resets sub speed
    moved = true; 
    if(playingAmb == false){
        amb.loop(); 
        playingAmb = true; 
    }
    if(key == "d"){
        eng.stop(); 
        playingEng = false; 
        speed = 1; 
    }

    if(key == "a"){
        eng.stop(); 
        playingEng = false; 
        speed = 1; 
    }

    if(key == "w"){
        eng.stop(); 
        playingEng = false; 
    }

    if(key =="s"){
        eng.stop(); 
        playingEng = false; 
    }
}

// Two purposes: 
// - For Scanning 
// - And for returning to map
function mousePressed(){
    for(let i = 0; i < buildings.length; ++i){
        buildings[i].scanning(i); 
    }

    control.return(); 
}