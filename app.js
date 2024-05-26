//part 1
// let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext('2d');
// let boardHeight = 800;
// let boardwidth = 1200;
// let square = 50;
// let snakeCell = [[0,0]];


// function draw(){

// }
// function update(){

// }
// setInterval(function (){

// },200);


// --------------------------------------------
// part2
// let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext('2d');
// let boardHeight = 800;
// let boardWidth = 1200;
// let square = 50;
// let snakeCell = [[0,0],[50,0]];


// function draw(){
//     ctx.clearRect(0,0,boardWidth,boardHeight)
//     for(let cell of snakeCell){

//         ctx.fillStyle = "brown"
//         ctx.fillRect(cell[0],cell[1],square,square)

//     }

// }
// function update(){
//     let headX = snakeCell[snakeCell.length-1][0]
//     let headY = snakeCell[snakeCell.length-1][1]
//     let  newHeadX = headX + square;
//     let newHeadY = headY;
//     snakeCell.push([newHeadX,newHeadY]);
//     snakeCell.shift();

// }
// setInterval(function (){
//     update();
//     draw();

// },200);

// -----------------------------------------------
// part 3
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let boardHeight = 800;
let boardWidth = 1200;
let square = 50;
let snakeCell = [[0,0],[50,0]];
let direction = "right";
let gameOver = "false";
let foodCell = generateRandomFood();
let score = 0;

document.addEventListener('keydown' ,function(event){
    if(event.key === "ArrowDown"){direction= "down"}
    else if (event.key ==="ArrowUp"){direction = "up"}
    else if (event.key ==="ArrowLeft"){direction = "left"}
    else if (event.key ==="ArrowRight"){direction = "right"}

})


function draw(){
    if(gameOver === true){
        clearInterval(id);
        ctx.fillStyle = "red"
        ctx.font = "50px sans-serif"
        ctx.fillText('GAME OVER !!' , 430,400)
        return;
    }
    ctx.clearRect(0,0,boardWidth,boardHeight)
    for(let cell of snakeCell){
        ctx.fillStyle = "brown"
        ctx.fillRect(cell[0],cell[1],square,square)
        ctx.strokeStyle = "golden"
        ctx.strokeRect(cell[0],cell[1],square,square)
    }
    //draw food
    ctx.fillStyle = "orange";
    ctx.fillRect(foodCell[0],foodCell[1],square,square)
    // DRAW SCORE
    ctx.fillStyle = "white"
    ctx.font = " 20px monospace"
    ctx.fillText(`Score: ${score}` , 20,30)

}
function update(){
    let headX = snakeCell[snakeCell.length-1][0];
    let headY = snakeCell[snakeCell.length-1][1];
    let  newHeadX = headX + square;
    let newHeadY = headY;
    if(direction === 'up' || ex()){
       newHeadX = headX;
       newHeadY = headY-square;
       if(newHeadY<0){gameOver = true}
    }
   else if(direction === 'down'|| ex()){
        newHeadX = headX;
        newHeadY = headY+square;
        if(newHeadY === boardHeight){gameOver =  true}
     }
     else if(direction === 'left' || ex() ){
        newHeadX = headX - square;
        newHeadY = headY;
        if(newHeadX<0){gameOver = true}
     }
     else if(direction === 'right' || ex()){
        newHeadX = headX + square;
        newHeadY = headY;
        if(newHeadX===boardWidth)(gameOver = true)
     }
    snakeCell.push([newHeadX,newHeadY]);
    if(newHeadX === foodCell[0] && newHeadY === foodCell[1]){
        foodCell = generateRandomFood()
        score += 1;
    }else{
        snakeCell.shift();
    }
   
}
function generateRandomFood(){
    return[
        Math.round(Math.random()*(boardWidth - square)/square)*square ,
        Math.round(Math.random()*(boardHeight - square)/square)*square
    ]

}
function ex(newHeadX , newHeadY){
    for(let item of snakeCell){
        if(item[0] === newHeadX && item[1] === newHeadY){
            return true;
        }
    }
     return false;
}

  let id = setInterval(function (){
    update();
    draw();

},150);