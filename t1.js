const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.width = 600;
ctx.height=600;

const formiga = new function(){
    this.image = new Image();
   
    this.image.src = "./ant.png"
    this.width = 25;
    this.height = 25;
    this.frames = 1;
    this.actualFrame = 0;
    this.X = 0;
    this.Y = 0;
    this.direcao =0;
    this.desc=0;
    this.passo=0;
    
    this.setDesc = function(d){
        this.desc = d;
    }
    
    this.setPosition = function(x, y){
        this.X = x;
        this.Y = y;
    }
    
    this.moveUp = function(){
        if (this.Y > 0) {
            this.setPosition(this.X, Math.max(0, this.Y-5));
        }
    }
    
    this.moveDown = function(){
        if (this.Y+this.height < ctx.height) {
            this.setPosition(this.X, Math.min(ctx.height, this.Y+5));
        }
    }
    
    this.moveLeft = function(){
        if (this.X > 0) {
            this.setPosition(Math.max(0, this.X-5), this.Y);
        }
    }
    
    this.moveRight = function(){      
        if (this.X+this.width < ctx.width) {
            this.setPosition(Math.min(this.X+5, ctx.width), this.Y);
        }    
    }
  
    this.desenha = function(){
        this.passo++;
        if (this.passo==10) {
            this.passo=0;
            this.direcao=Math.floor(Math.random()*11)%4;
            this.desc=this.direcao*this.width*2;
        }
        if (this.direcao==0) this.moveLeft(); 
        else if (this.direcao==3) this.moveDown();
        else if (this.direcao==2) this.moveUp(); 
        else if (this.direcao==1) this.moveRight(); 
        
        try {   
            ctx.drawImage(this.image, this.desc+(this.actualFrame*this.width), 0 , this.width, this.height, this.X, this.Y, this.width, this.height);
        } 
        catch (e) {};
    
        this.actualFrame = this.actualFrame==0?1:0;
    }  
}

const t =  new function(){
    this.x=0;
    this.y=300;
    this.w=50;
    this.h=50
    this.frame=0;
    this.sx=50;
    this.direcao= 0; //0: cima; 1:baixo; 2: direita; 3: esquerda
    this.img = new Image();
    this.img.src = './Turtle.png';  
      
    this.sobe = function() {
        this.direcao=0;
        this.setSx();
        if (this.y>0) this.y-=5;
    }
    this.desce = function() {
        this.direcao=1;
        this.setSx();
        if (this.y<ctx.height-this.h) this.y+=5;
    }
    
    this.direita = function() {
        this.direcao=2;
        this.setSx();
        if (this.x<(ctx.width-this.w)) this.x+=5;
    }
    
    this.esquerda = function() {
        this.direcao=3;
        this.setSx();
        if (this.x>0) this.x-=5;
    }
    this.setSx= function() {
        this.sx=this.w*this.direcao*2;
    }
}

function desenha(){
    limpa();
    formiga.desenha();
    t.frame = t.frame==0?1:0;
   
    try {
        ctx.drawImage(t.img, t.sx+t.w*t.frame, 0 ,t.w,t.h,
            t.x, t.y, t.w,t.h); 
    } 
    catch (e) {
        alert(e.toString());
    };
}

function limpa(){
    ctx.fillStyle = '#d0e7f9';  
    ctx.rect(0, 0,  ctx.width,  ctx.height);    
    ctx.fill();  
}

function desenhaFundo(){
    ctx.drawImage(fundo.img,0,0);  
}

const testaColisao = function() {
    if (t.x >= formiga.X) {
        if (t.y>= formiga.Y) {
            if (formiga.X+formiga.width>=t.x && formiga.Y+formiga.height>=t.y) {
                return true;
            }
        } else {
           if (formiga.X+formiga.width>=t.x && t.y+t.hh>=formiga.Y) {
                return true;
            }  
        }
    } else {
        if (t.y>= formiga.Y) {
            if (t.x+t.w>=formiga.X && formiga.Y+formiga.height>=t.y) {
                return true;
            }
        } else {
            if (t.x+t.w>=formiga.X && t.y+t.h>formiga.Y) {
                return true;
            }
        }
    }
    return false;
}


document.addEventListener('keydown', event => {
    switch(event.code) {
        case "KeyS":
        case "ArrowDown":
          t.desce();
          break;
        case "KeyW":
        case "ArrowUp":
           t.sobe();
          break;
        case "KeyA":
        case "ArrowLeft":
          t.esquerda();
          break;
        case "KeyD":
        case "ArrowRight":
          t.direita()
          break;
      }

     if (testaColisao()) {
         alert("bateu"); 
         return;
     }
     desenha();
})

const GameLoop = function(){
    desenha();
    setTimeout(GameLoop, 1000);
}

GameLoop();
