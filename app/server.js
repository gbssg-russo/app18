const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || "student-app-template";

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>${appName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 900px;
            margin: auto;
          }
          .box {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 24px;
          }
          code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>${appName}</h1>
          <p>Your app is running successfully.</p>
          <p>Hostname: <code>${req.hostname}</code></p>
          <p>Container port: <code>${port}</code></p>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});