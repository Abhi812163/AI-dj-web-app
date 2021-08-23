song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1="";
song2="";
scoreLeftWrist="";

name="";
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    fill('red');
    stroke('black');
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        converted_number=Number(leftWristY);
        remove_decimals=floor(converted_number);
        volume=remove_decimals/500;
        song.setVolume(volume);
        song1.setVolume(volume);
        song2.setVolume(volume);
        document.getElementById("volume").innerHTML="Volume: "+volume;
    }
}

function preload(){
    song=loadSound("Harry_Potter.mp3");
    song1=loadSound("Los_Santos.mp3");
    song2=loadSound("Perfect.mp3");
}

function play(){
    name=document.getElementById("name").value;
    if(name=="harry"){
        song.play();
        song1.stop();
        song2.stop();
    }
    if(name=="perfect"){
        song2.play();
        song.stop();
        song1.stop();
    }    if(name=="los_santos"){
        song1.play();
        song2.stop();
        song.stop();
    }
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
    song1.pause();
    song2.pause();
}

function stop(){
    song.stop();
    song1.stop();
    song2.stop();
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
if(results.length>0){
    console.log(results);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+" leftWristY="+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+" rightWristY="+rightWristY);

    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("Score of the left wrist is: "+scoreLeftWrist);
}
}

