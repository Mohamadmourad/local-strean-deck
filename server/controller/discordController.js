const robotjs = require("robotjs");

exports.mute = (req, res) =>{
    robotjs.keyTap("m", ["control"]);

    return res.status(200).json({message:"Completed"});
}