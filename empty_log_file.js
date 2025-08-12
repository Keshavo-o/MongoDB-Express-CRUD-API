const fs = require("fs");
fs.writeFile("./log.txt","", (err) => {
    if (err) {
        console.error("Error creating log file:", err);
    } else {
        console.log("Log file emptied successfully.");
    }
});
