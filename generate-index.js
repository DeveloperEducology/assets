const fs = require("fs");
const path = require("path");

const repoOwner = "DeveloperEducology";
const repoName = "assets";
const branch = "main";

const svgFiles = fs
  .readdirSync(".")
  .filter((f) => f.endsWith(".svg") || f.endsWith(".png") || f.endsWith(".jpg"));

function generateCard(file) {
  const emoji =
    file.includes("apple") ? "🍎" :
    file.includes("banana") ? "🍌" :
    file.includes("orange") ? "🍊" :
    file.includes("watermelon") ? "🍉" :
    file.includes("road") ? "🛣️" :
    file.includes("cake") ? "🎂" : "📄";

  return `
  <div class="card">
    <img src="${file}" alt="${file}">
    <div>${emoji} ${file}</div>
    <div class="links">
      <a href="${file}" target="_blank">GitHub Pages Link</a>
      <a href="https://cdn.jsdelivr.net/gh/${repoOwner}/${repoName}@${branch}/${file}" target="_blank">jsDelivr CDN</a>
    </div>
  </div>`;
}

const cards = svgFiles.map(generateCard).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${repoOwner} ${repoName} CDN</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      color: #333;
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { text-align: center; }
    .asset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .card {
      background: #fff;
      border-radius: 10px;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      text-align: center;
    }
    .card img {
      max-width: 100%;
      max-height: 150px;
    }
    .links {
      font-size: 12px;
      margin-top: 10px;
      word-break: break-all;
    }
    .links a {
      display: block;
      color: #007bff;
      text-decoration: none;
    }
    .links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

<h1>📦 ${repoOwner}/${repoName} CDN</h1>
<p>Auto-generated preview of all files with GitHub Pages + jsDelivr CDN links.</p>

<div class="asset-grid">
${cards}
</div>

</body>
</html>`;

fs.writeFileSync("index.html", html);
console.log(`✅ index.html generated with ${svgFiles.length} files`);
