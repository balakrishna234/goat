img=" "
status=" "
object= []
function setup()
{
canvas=createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380, 380);
objectdetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML= "Baby Status";    
}

function modelLoaded()
{
    console.log("ModelLoaded");
status = true;
}

function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object= results;
    }
}

function preload()
{
img=loadImage("dog_cat.jpg");
song=loadSound("krishna_flute.mp3");
}

function draw()
{
image(video, 0, 0, 380, 380);

if (status!=" ") {
    objectdetector.detect(video, gotResult);
    r = random(255);
    g = random(255);
    b = random(255);
    for (i=0; i<object.length; i++){
        fill(r, g, b);
        percent= floor(object[i].confidence * 100);
        text(object[i].label + " " + percent+"%", object[i].x+10, object[i].y+10);
        noFill();
        stroke(r, g, b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        if (object[i].label == "person"){
            document.getElementById("status").innerHTML = "Baby Detected";
            song.stop();
        }
        else{
            document.getElementById("status").innerHTML = "Baby Not Detected";
            song.play();
        }
        
    }
    if (object.length == 0) {
        document.getElementById("status").innerHTML = "Baby Not Detected";
            song.play();
    }
}
}


