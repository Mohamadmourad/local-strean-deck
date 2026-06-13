const robotjs = require("robotjs");

exports.musicPlayerHandler = (req, res) =>{
 const { action } = req.body;

 switch(action){
    case "PLAY":
    case "PAUSE":
      robotjs.keyTap("audio_play");
      break;
    case "NEXT":
      robotjs.keyTap("audio_next");
      break;
    case "PREVIOUS":
      robotjs.keyTap("audio_prev");
      break;
    case "VOL_UP":
      robotjs.keyTap("audio_vol_up");
      break;
    case "VOL_DOWN":
      robotjs.keyTap("audio_vol_down");
      break; 
 }

 return res.status(200).json({message:"Completed"});
}