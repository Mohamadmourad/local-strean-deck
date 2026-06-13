const { exec } = require("child_process");

exports.open = (req, res) => {
  exec(`start chrome --new-window`, (err) => {
    if (err) return res.status(500).json({ error: "Failed to open Chrome", details: err.message });
    res.json({ message: "Completed" });
  });
};
