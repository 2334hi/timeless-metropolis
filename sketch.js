let map; 

function preload(){
    map = loadImage("./assets/WorldMap.PNG");
}

function setup(){
    let cnv = createCanvas(windowWidth, windowHeight); 
    cnv.parent("canvas-parent");
    

}

function draw(){
    background(255); 
    scale(1.5); 
    image(map, -25, 0);
    
    
}
