const { exec } = require("child_process");
const path = require("path");

const SET_TOPMOST_SCRIPT = path.join(__dirname, "..", "scripts", "set-topmost.ps1");

exports.open = (req, res) => {
  // Open a new Chrome window
  exec(`start chrome --new-window`, (err) => {
    if (err) return res.status(500).json({ error: "Failed to open Chrome", details: err.message });

    // Give Chrome a moment to create the window, then pin it always-on-top
    setTimeout(() => {
      exec(
        `powershell -ExecutionPolicy Bypass -File "${SET_TOPMOST_SCRIPT}"`,
        (psErr) => {
          if (psErr) console.error("Failed to set topmost:", psErr.message);
        }
      );
    }, 1500);

    res.json({ success: true, message: "Chrome opened as always-on-top" });
  });
};
