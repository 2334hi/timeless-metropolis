// To add--
// - Water Dive affect 
// - Seaweed. . .? (Not Priority)
// - Underwater Rays affect 
// - Map Coordinate System
// - Two other cities (Besides NYC)
// - Images for the Decaying Buildings
// - Web Page Upgrades


let map; 
let textbox; 
let lon; 
let ny; 
let bang; 
let disHor = -4; 
let displayingPanel = false; 
let signal = 10; 
let hover; 

let leftHorx1; 
let leftHory1; 
let leftHorx2;
let leftHory2;

let rightHorx1; 
let rightHory1; 
let rightHorx2; 
let rightHory2; 

let topVertx1; 
let topVerty1; 
let topVertx2; 
let topVerty2; 

let botVertx1; 
let botVerty1; 
let botVertx2; 
let botVerty2;







function preload(){
    map = loadImage("./assets/WorldMap.PNG");
    textbox = loadImage("./assets/textbox.png");
    lon = loadImage("./assets/Lon.png"); 
    ny = loadImage("./assets/NYC.png");
    bang = loadImage("./assets/Bang.png"); 
    hover = loadSound("./assets/hover.mp3"); 

}

function setup(){
    let cnv = createCanvas(1000, 550); 
    cnv.parent("canvas-parent");

    
    

}

function coordsys(){
    push(); 
    stroke(255); 
    strokeWeight(2); 
    leftHorx1 = 0; 
    leftHory1 = mouseY; 
    leftHorx2 = mouseX; 
    leftHory2 = mouseY; 
    line(leftHorx1, leftHory1, leftHorx2, leftHory2); 
    rightHorx1 = width; 
    rightHory1 = mouseY; 
    rightHorx2 = mouseX; 
    rightHory2 = mouseY; 
    line(rightHorx1, rightHory1, rightHorx2, rightHory2);
    topVertx1 = mouseX; 
    topVerty1 = 0; 
    topVertx2 = mouseX; 
    topVerty2 = mouseY; 
    line(topVertx1, topVerty1, topVertx2, topVerty2);
    botVertx1 = mouseX; 
    botVerty1 = height; 
    botvertx2 = mouseX; 
    botverty2 = mouseY; 
    line(botVertx1, botVerty1, botvertx2, botverty2);
    pop(); 
}

function nyc(x, y){
    let pan = new Panel(x, y, ny); 
    pan.display(); 
}

function london(x, y){
    let pan = new Panel(x, y, lon); 
    pan.display(); 
}

function bangkok(x, y){
    let pan = new Panel(x, y, bang); 
    pan.display(); 
}

function draw(){
    background(255); 
    noCursor(); 
    
    image(map, -25, 0);

    // city1 NYC
    push(); 
    noStroke(); 
    noFill(); 
    stroke(67, 167, 222)
    strokeWeight(2); 
    circle(230, 205, signal); 
    fill(255); 
    stroke(0); 
    rect(225, 200, 10, 10); 
    // city2 London 
    noStroke(); 
    noFill(); 
    stroke(67, 167, 222)
    circle(485, 145, signal); 
    fill(255); 
    stroke(0); 
    rect(480, 140, 10, 10); 
    // city3 Bangkok
    noStroke(); 
    noFill(); 
    stroke(67, 167, 222);
    circle(850, 305, signal); 
    fill(255); 
    stroke(0); 
    rect(845, 300, 10, 10); 
    if(signal < 30){
        signal += 0.5; 
    } else{
        signal = 10; 
    }
    pop(); 
    
    coordsys(); 
    if((mouseX > 225 && mouseX < 235) && (mouseY > 200 && mouseY < 210)){
        if(displayingPanel == false){
            hover.play(); 
        }
        displayingPanel = true; 
        nyc(230, 205); 
    } else if((mouseX > 480 && mouseX < 490) && (mouseY > 140 && mouseY < 150)){
        if(displayingPanel == false){
            hover.play(); 
        }
        displayingPanel = true; 
        london(485, 145); 
    } else if((mouseX > 845 && mouseX < 855) && (mouseY > 300 && mouseY < 310)){
        if(displayingPanel == false){
            hover.play(); 
        }
        displayingPanel = true; 
        bangkok(850, 305); 
    } else{
        displayingPanel = false; 
        disHor = 0; 
    }
    
}

function mousePressed(){
    if((mouseX > 225 && mouseX < 235) && (mouseY > 200 && mouseY < 210)){
        hover.play(); 
        window.location.href = "./New_York/index.html"; 
    }
    
}

class Panel{
    constructor(x, y, img){
        this.x = x; 
        this.y = y; 
        this.img = img; 
    }

    display(){
        push(); 

        // push(); 
        translate(this.x, this.y); 
        // Textbox here
        
        if(displayingPanel && this.img != bang){
            if(disHor < 10){
                disHor += 2; 
            }
            
            image(textbox, disHor, -175); 
        } else if(this.img == bang){
            if(disHor > -80){
                disHor -= 2;
            }
             
            image(textbox, disHor, -175); 
        }

        // Images on left
        scale(0.2); 
        image(this.img, -disHor - 800, 100); 

        if(this.img == ny){
            fill(255); 
            textSize(75); 
            text("New York City. . . a once vibrant, ", disHor + 150, -650); 
            text("bustling metropolis known as", disHor + 150, -550);
            text("for its melting pot of cultures.", disHor + 150, -450);
            text("Even under the sea, landmarks", disHor + 150, -350);
            text("still proudly stand.", disHor + 150, -250);
        } else if(this.img == lon){
            fill(255); 
            textSize(75); 
            text("Captial of a sunken nation,", disHor + 150, -650); 
            text("its old age history and iconic", disHor + 150, -550); 
            text("landmarks still leaves much", disHor + 150, -450); 
            text("to be rediscovered... or even", disHor + 150, -350); 
            text("newly discovered.", disHor + 150, -250); 
        } else if(this.img == bang){
            fill(255); 
            textSize(75); 
            text("Once showcasing vibrant street", disHor - 200, -650);
            text("life and ornate temples, its ", disHor - 200, -550);
            text("traditional cultural atmosphere ", disHor - 200, -450);
            text("can still be felt even after all ", disHor - 200, -350);
            text("these years. ", disHor - 200, -250);
        }

        pop(); 
    }


}
