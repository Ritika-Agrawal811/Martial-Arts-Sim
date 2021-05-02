let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let loadImage = (src , callback) => {
    let myImg = document.createElement("IMG");
    myImg.onload = () => callback(myImg);
    myImg.src = src;
   
};

let ImagePath = (frameNumber , animation) => {
  return "/images/" + animation +"/" + frameNumber + ".png";
}

let frames = {
    idle : [1,2,3,4,5,6,7,8],
    kick : [1,2,3,4,5,6,7],
    punch : [1,2,3,4,5,6,7],
    forward : [1,2,3,4,5,6],
    block : [1,2,3,4,5,6,7,8,9]
};

let loadImages = (callback) => {

    let images = { idle : [] , kick : [] , punch : [] , forward : [] , block : []};
    let imagesToLoad = 0;

    //calls back with an array of loaded images
    ["idle" , "kick" , "punch" , "forward" , "block"].forEach( (animation) => {
        
        let animationFrames = frames[animation];
        imagesToLoad += animationFrames.length;

        animationFrames.forEach((frameNumber) => {
            let path = ImagePath(frameNumber , animation);

            loadImage( path , (img) => {
                  images[animation][frameNumber -1 ] = img;
    
                  imagesToLoad--;
    
                  if(imagesToLoad == 0){
                      callback(images);
                  }
            });

        });
    
    });
}

let animate = (ctx , images , animation, callback) => {

    images[animation].forEach( (image , index) => {
       
        setTimeout( () => {
            ctx.clearRect( 0 , 0 , canvas.width , canvas.height);
            ctx.drawImage(image , 0 , 0 , 500 , 500 );
        } , index * 100);

    });

    setTimeout( callback , images[animation].length * 100);
}

loadImages((images) => {

    let queuedAnimations = [];
    

    let aux = () => {
        let selectedAnimation;

        if(queuedAnimations.length === 0){
            selectedAnimation = "idle";
        }else{
            selectedAnimation = queuedAnimations.shift();
            
        }

        animate( ctx , images , selectedAnimation , aux);
    }
   
    aux();

    document.getElementById('kick').onclick = () => {
        queuedAnimations.push("kick");
    }

    document.getElementById('punch').onclick = () => {
        queuedAnimations.push("punch");
    }

    document.getElementById('forward').onclick = () => {
        queuedAnimations.push("forward");
    }

    document.getElementById('block').onclick = () => {
        queuedAnimations.push("block");
    }



    document.addEventListener('keyup' , (event) => {
         const key = event.key;

         if(key === "ArrowLeft"){
            queuedAnimations.push("kick");
         }else if(key === "ArrowRight"){
            queuedAnimations.push("punch");
         }else if(key === "ArrowUp"){
            queuedAnimations.push("forward");
         }else if(key === "ArrowDown"){
            queuedAnimations.push("block");
         }
    });
});

