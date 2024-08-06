let bg_buildings = []; 
let bg_buildings_coords = []; 
let bg_completed = false; 

let buildings = []; 
let buildings_coords = [];

let sub; 
let control; 
let right = true; 
let left = false; 
let speed = 2; 

let scanSuccess = false; 
let numScans = 0; 
let numb = 255; 
let lvl = 500; 

let quick; 

function preload(){
    sub = loadImage("./assets/sub.png"); 
}

function setup(){
    let cnv = createCanvas(1200, 650); 
    cnv.parent("canvas-parent");
    // colorMode(HSL); 

    let bg_builds_incr = round(random(90, 100)); 
    for(let i = 0; i < 3600; i += bg_builds_incr){ // 3600 = Max Width of Map Area Dimension
        let widths = round(random(70, 90)); 
        let heights = round(random(150, 300)); 
        let newbd = new Building(i, widths, heights, 50, 100); 
        newbd.build(); 
        bg_buildings.push(newbd); 
        bg_builds_incr = round(random(90, 100)); 
    }
    bg_completed = true; 

    for(let i = 0; i < 3600; i += bg_builds_incr){
        let widths = round(random(70, 90)); 
        let heights = round(random(150, 300));
        let newbd = new Building(i, widths, heights, 50, 0); 
        newbd.build(); 
        buildings.push(newbd); 
        bg_builds_incr = round(random(90, 100));
    }

    control = new Sub(50, 250); 
    

}

function draw(){

    if(numScans < 5){
        background(255); 
    } else{
        background(40, 55, 87);
    }
    
    fill(0); 
    rect(0, 400, 3600, 250); // 650 - 250 (Ground), then (650-250) - createGrahpics Height

    for(let i = 0; i < bg_buildings.length; ++i){
        bg_buildings[i].update(bg_buildings_coords[i]); 
    }

    for(let i = 0; i < buildings.length; ++i){
        buildings[i].update(buildings_coords[i]);
    }

    if(keyIsDown(68)){
        
        right = true; 
        left = false; 
        if(control.x >= (width - 200) || numScans >= 5){
            for(let i = 0; i < bg_buildings.length; ++i){
                
                bg_buildings[i].x -= 5; 
                
                bg_buildings[i].update(bg_buildings_coords[i]); 
                
            }

            for(let i = 0; i < buildings.length; ++i){
                buildings[i].x -= 5; 
                buildings[i].update(buildings_coords[i]);
            }
        } else {
            control.x += speed; 
            if(speed < 5){
                speed *= 1.01; 
            }
        }
        
    }

    if(keyIsDown(65)){

        right = false; 
        left = true; 
        if(control.x <= (0 + 50) || numScans >= 5){
            for(let i = 0; i < bg_buildings.length; ++i){
                bg_buildings[i].x += 5;
                
                bg_buildings[i].update(bg_buildings_coords[i]); 
            }

            for(let i = 0; i < buildings.length; ++i){
                buildings[i].x += 5; 
                buildings[i].update(buildings_coords[i]);
            }
        } else {
            control.x -= speed; 
            if(speed < 5){
                speed *= 1.01; 
            }
        }
        
    }

    if(keyIsDown(87)){
        if(control.y >= 10){
            control.y -= 1; 
        }
    }

    if(keyIsDown(83)){
        if(control.y <= (height - 75)){
            control.y += 1; 
        }
    }

    if(numScans < 5){
        control.update(); 
    }
    

    // pg = createGraphics(50, 300); // Deterimining the width and height with createGraphics
    // pg.background(100); 
    // image(pg, 100, 100); // Positioning it with image
    // image(pg, 165, 150); 

    // quick = new Building(165, 50, 250, 50); 
    // quick.build(); 
    // for(let i = 0; i < bg_buildings.length; ++i){
    //     image(bg_buildings[i], )
    // }

    if(numScans >= 5){
        for(let i = 0; i < buildings.length; ++i){
            buildings[i].scanning(i); 
        }
        fill(numb, lvl); 
        rect(0, 0, 3600, height);
        if(lvl > 0){
            lvl -= 5; 
        }
    }
    
}

function scan(x, y, wid, hei){
    fill(0, 0, 235, 127); 
    rect(x, y, wid, hei); 
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
    }

    decay(){



    }

    checkIfPressed(){
        push(); 
        if(mouseX > this.x && mouseX < (this.x + this.wid)){
            scanSuccess = true; 
        }
        pop(); 
    }

    scanning(pos){
        // let timeStart = frameCount; 
        // let timeEnd = frameCount + 5000; 
        this.checkIfPressed(); 
        if(numScans >= 5){
            scanSuccess = true; 
        }
        if(scanSuccess && this.scanned == false){
            // for(let i = timeStart; i < timeEnd; i += 0.5){
            //     fill(0); 
            //     rect(50, 50, 50, 50); 
            // }
            // scan(this.x, this.y, this.wid, this.hei);
            let bd = buildings_coords[pos]; 
            let chance = round(random(0, 2)); 
            if(chance == 0){
                bd.background(56, 12, 3); 
            } else if(chance == 1){
                bd.background(84, 61, 57);
            } else {
                bd.background(161, 102, 92); 
            }

            this.scanned = true; 
            numScans += 1; 
            if(this.wid <= 80){
                let windx = this.wid / 2; 
                bd.fill(72, 133, 108); 
                bd.noStroke(); 
                for(let i = this.y - 400; i < this.hei; i += 60){
                    if(chance == 2 || chance == 1){
                        bd.fill(149, 163, 42); 
                    }
                    bd.rect(windx - 25, i, 20, 30);
                    bd.rect(windx + 10, i, 20, 30);    
                }
            } else {
                let windx = this.wid / 3; 
                bd.fill(72, 133, 108); 
                bd.noStroke(); 
                for(let i = this.y - 400; i < this.hei; i += 60){
                    if(chance == 2 || chance == 1){
                        bd.fill(149, 163, 42); 
                    }
                    bd.rect(windx - 20, i, 15, 25);
                    bd.rect(windx + 7, i, 15, 25);
                    bd.rect(windx + 35, i, 15, 25);
                }
            }
            // this.scanned(pos); 

              
        }

        scanSuccess = false; 

    }

    // scanned(pos){
    //     let bd = buildings_coords[pos];

    //     bd.background(0, 0, this.color); 

    //     if(this.wid <= 80){
    //         let windx = this.wid / 2; 
    //         bd.fill(255); 
    //         bd.noStroke(); 
    //         for(let i = this.y - 400; i < this.hei; i += 60){
    //             bd.rect(windx - 25, i, 20, 30);
    //             bd.rect(windx + 10, i, 20, 30);    
    //         }
    //     } else {
    //         let windx = this.wid / 3; 
    //         bd.fill(255); 
    //         bd.noStroke(); 
    //         for(let i = this.y - 400; i < this.hei; i += 60){
    //             bd.rect(windx - 20, i, 15, 25);
    //             bd.rect(windx + 7, i, 15, 25);
    //             bd.rect(windx + 35, i, 15, 25);
    //         }
    //     }
    // }

    build(){

        let bd = createGraphics(this.wid, this.hei); 

        bd.background(this.color); 

        if(this.wid <= 80){
            let windx = this.wid / 2; 
            bd.fill(255); 
            bd.noStroke(); 
            for(let i = this.y - 400; i < this.hei; i += 60){
                bd.rect(windx - 25, i, 20, 30);
                bd.rect(windx + 10, i, 20, 30);    
            }
        } else {
            let windx = this.wid / 3; 
            bd.fill(255); 
            bd.noStroke(); 
            for(let i = this.y - 400; i < this.hei; i += 60){
                bd.rect(windx - 20, i, 15, 25);
                bd.rect(windx + 7, i, 15, 25);
                bd.rect(windx + 35, i, 15, 25);
            }
        }


        
        if(!bg_completed){
            bg_buildings_coords.push(bd);
        } else {
            print(bd.pixels.length); 
            buildings_coords.push(bd); 
        }
                 

    }

    update(bd){
        image(bd, this.x, this.y); // 400 is ground level calculations
    }


}

class Sub{
    constructor(x, y){
        this.x = x; 
        this.y = y; 

    }

    dive(){
        rotate(radians(45)); 
    }

    surface(){

    }

    update(){
        push(); 
        translate(this.x, this.y);  

        if(right){
            scale(0.2, 0.2);
        }

        if(left){
            scale(-0.2, 0.2);
        }
         
        image(sub, 0, 0); 
        pop();
    }

    scan(){

    }


}

function keyReleased(){
    if(key == "d"){
        // control.x += speed; 
        // if(speed > 1){
        //     speed *= 0.7; 
        // }
        speed = 1; 
    }

    if(key == "a"){
        // control.x -= speed;
        // if(speed > 1){
        //     speed *= 0.7; 
        // }
        speed = 1; 
    }
}

function mousePressed(){
    for(let i = 0; i < buildings.length; ++i){
        buildings[i].scanning(i); 
    }
}