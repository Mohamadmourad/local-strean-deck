const express = require('express');

const musicPlayerRoutes = require("./routes/musicPlayerRouter");
const discordRoutes = require("./routes/discordRouter");
const browserRoutes = require("./routes/chromeRouter");

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try{
    app.listen(5005, () => {
      console.log(`Server is running on port 5005`);
    });
  }
  catch(error){
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

app.use("/music", musicPlayerRoutes);
app.use("/discord", discordRoutes);
app.use("/browser", browserRoutes);
