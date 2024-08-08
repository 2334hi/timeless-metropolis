let map; 

function preload(){
    map = loadImage("./assets/WorldMap.PNG");
}

function setup(){
    let cnv = createCanvas(1000, 550); 
    cnv.parent("canvas-parent");
    

}

function draw(){
    background(255); 
    
    image(map, -25, 0);
    //let a = createA("./New_York/NewYork.js", "*NYC");
    //a.position(235, 275); 
    
    
}
