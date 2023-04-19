const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const server = http.createServer(app);
const { initMeetingServer } = require("./meeting-server");

initMeetingServer(server);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/meeting-app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database connected");
})
.catch((error) => {
    console.error("Database connection failed:", error);
});

app.use(express.json());
app.use("/api", require("./routes/app.routes"));

const PORT = process.env.PORT || 4000;
server.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});
