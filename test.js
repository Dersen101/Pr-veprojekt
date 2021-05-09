let levels = [];

levels[0] = {
  map:[
     [1,1,0,0,1,0],
     [1,0,0,0,0,0],
     [0,0,1,1,0,0],
     [0,0,0,1,0,1],
     [0,1,0,1,0,0]
  ],
  player: {
     x:0,
     y:4
  },
  goal:{
    x:5,
    y:0
  },
  theme:'default'
};

function Game(id, level) {
  
  this.el = document.getElementById(id);
  
  this.tileTypes = ['floor','wall'];
  
  this.tileDim = 32;
  
  this.map = level.map;
  this.theme = level.theme
  this.player = {...level.player};
  this.goal = {...level.goal};
}

Game.prototype.populateMap = function() {
  
  this.el.className = 'game-container ' + this.theme;
  
  let tiles = document.getElementById('tiles');
  
  for (let y = 0; y < this.map.length; y++) {
    
    for (let x = 0; x < this.map[y].length; x++) {
              
           let tileCode = this.map[y][x];
       
           let tileType = this.tileTypes[tileCode];
       
           let tile = this.createEl(x, y, tileType);
       
           tiles.appendChild(tile); 
     }
  }
}

Game.prototype.createEl = function(x,y,type) {
   
  let el = document.createElement('div');
       
  
  el.className = type;
  
  el.style.width = el.style.height = this.tileDim + 'px';
  el.style.left = x*this.tileDim + 'px';
  el.style.top = y*this.tileDim + 'px';
      
  return el;
}

Game.prototype.placeSprite = function(type) {
  let x = this[type].x
  let y = this[type].y;
  
  
  let sprite  = this.createEl(x,y,type);
  sprite.id = type;
  
  sprite.style.borderRadius = this.tileDim + 'px';
  
  let layer = this.el.querySelector('#sprites');
  layer.appendChild(sprite);
  
  return sprite;
}

Game.prototype.sizeUp = function() {
  
  let map  = this.el.querySelector('.game-map');
  
  
  map.style.height = this.map.length * this.tileDim + 'px';
  map.style.width = this.map[0].length * this.tileDim + 'px';
 }
 
Game.prototype.movePlayer = function(event) {
  
  event.preventDefault();
  
  if (event.keyCode < 37 || event.keyCode > 40) {
      return;
  }
   switch (event.keyCode) {
   
        case 37:
        this.moveLeft();
        break;
        
        case 38:
        this.moveUp();
        break;
        
        case 39:
        this.moveRight();
        break;
       
        case 40:
        this.moveDown();
        break;
    }
}

Game.prototype.checkGoal = function() {
  
    let body = document.querySelector('body');
  
    if (this.player.y == this.goal.y && 
        this.player.x == this.goal.x) {
        body.className = 'success';
     }
     else {
        body.className = '';
     }
  
}

Game.prototype.keyboardListener = function() {
  
  document.addEventListener('keydown', event => {
      
      this.movePlayer(event);
    
      this.checkGoal();
  });
}

Game.prototype.moveLeft = function() {   
  
   if (this.player.x == 0) {
       return;
   }
  
   let nextTile = this.map[this.player.y][this.player.x - 1];
   if (nextTile == 1) {
       return;
   }
    
   this.player.x -=1;
   
   this.updateHoriz();
}

Game.prototype.moveUp = function() {    
  
   if (this.player.y == 0) {
        return;
   }
  
   let nextTile = this.map[this.player.y-1][this.player.x];
   if (nextTile ==1) {
        return;
   }
    
   this.player.y -=1;
   
   this.updateVert();
}

Game.prototype.moveRight = function() {   

   if (this.player.x == this.map[this.player.y].length - 1) {
        return;
   }
   let nextTile = this.map[this.player.y][this.player.x + 1];
        
   if (nextTile == 1) {
        return;
   }
    
   this.player.x +=1;
   
   this.updateHoriz();
}

Game.prototype.moveDown = function() {   
  
   if (this.player.y == this.map.length - 1) {
        return;
   }
   let nextTile = this.map[this.player.y+1][this.player.x];
  
   if (nextTile == 1) {
        return;
   }
    
   this.player.y +=1;
   
   this.updateVert();
}

Game.prototype.updateHoriz = function() {      
   this.player.el.style.left = this.player.x * this.tileDim+ 'px';    
};

Game.prototype.updateVert = function() {
   this.player.el.style.top = this.player.y * this.tileDim+ 'px'; };


function init() {
   let myGame = new Game('game-container-1',levels[0]);
    
   myGame.populateMap();
  
   myGame.sizeUp();
  
   myGame.placeSprite('goal');
  
   let playerSprite = myGame.placeSprite('player');
  
   myGame.player.el = playerSprite;
  
   myGame.keyboardListener();
}

init();