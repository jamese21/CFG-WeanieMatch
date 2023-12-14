var express = require("express");
var router = express.Router();
const { spawn } = require('child_process');

router.get('/run-python/:id', (req, res) => {
  // Define the Python script and its arguments
  const pythonScript = 'algorithm.py';
  var arg1 = req.params["id"]; // Replace with your desired arguments

  // Spawn a new Python process
  const pythonProcess = spawn(`python3 routes/${pythonScript} ${arg1}`);

  // Handle data from the Python script (optional)
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Script Output: ${data}`);
  });

  // Handle errors from the Python script (optional)
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  // Handle the Python process exit (optional)
  pythonProcess.on('close', (code) => {
    console.log(`Python Script Exited with code ${code}`);
  });

  res.send('Python script is running...');
});

module.exports = router;