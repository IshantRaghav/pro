Status = "";
input_text = "";

function setup()
{
    canvas = createCanvas(400,390);
    canvas.position(500,250);
    video = createCapture(VIDEO);
    video.hide();
}
function start()
{
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    input_text = document.getElementById("input_id").value;
}
function modelLoaded()
{
    console.log("Model_Loaded");
    status = true;
}
function draw()
{
    image(video, 0,0,400,390)
    if(Status !="")
    {
        object_Detector.detect(video, gotResults);
        for(i = 0; i < object.lenght;i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(object.lenght);
            fill("#ff0000");
            percent = floor(object[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }
        }
    }
}