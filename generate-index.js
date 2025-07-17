const fs = require("fs");
const path = require("path");

const repoOwner = "DeveloperEducology";
const repoName = "assets";
const branch = "main";

// Get all SVG/PNG/JPG files
const files = fs.readdirSync(".").filter(f =>
  f.match(/\.(svg|png|jpg|jpeg|gif)$/i)
);

function emojiForFile(file) {
  const name = file.toLowerCase();
  if (name.includes("apple")) return "🍎";
  if (name.includes("banana")) return "🍌";
  if (name.includes("orange")) return "🍊";
  if (name.includes("watermelon")) return "🍉";
  if (name.includes("road")) return "🛣️";
  if (name.includes("cake")) return "🎂";
  return "📄";
}

function generateCard(file) {
  const cdnLink = `https://cdn.jsdelivr.net/gh/${repoOwner}/${repoName}@${branch}/${file}`;
  return `
    <div class="card" data-name="${file.toLowerCase()}">
      <img src="${file}" alt="${file}">
      <div>${emojiForFile(file)} ${file}</div>
      <div class="links">
        <a href="${file}" target="_blank">GitHub Pages Link</a>
        <a href="${cdnLink}" target="_blank">jsDelivr CDN</a>
        <button class="copy-btn" data-link="${cdnLink}">📋 Copy CDN Link</button>
      </div>
    </div>`;
}

const cards = files.map(generateCard).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${repoOwner}/${repoName} CDN</title>
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
    .search-box {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .search-box input {
      width: 300px;
      padding: 10px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
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
      transition: transform 0.2s;
    }
    .card:hover { transform: scale(1.02); }
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
      margin-bottom: 5px;
    }
    .links a:hover { text-decoration: underline; }
    .copy-btn {
      background: #007bff;
      color: #fff;
      border: none;
      padding: 6px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .copy-btn:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>

<h1>📦 ${repoOwner}/${repoName} CDN</h1>
<p style="text-align:center;">Search, view, and copy CDN links</p>

<div class="search-box">
  <input type="text" id="searchInput" placeholder="🔍 Search files...">
</div>

<div class="asset-grid" id="assetGrid">
${cards}
</div>

<script>
// 🔍 Search filter
document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    const name = card.dataset.name;
    card.style.display = name.includes(query) ? 'block' : 'none';
  });
});

// 📋 Copy CDN Link
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const link = this.dataset.link;
    navigator.clipboard.writeText(link).then(() => {
      this.textContent = "✅ Copied!";
      setTimeout(() => { this.textContent = "📋 Copy CDN Link"; }, 1500);
    });
  });
});
</script>

</body>
</html>`;

fs.writeFileSync("index.html", html);
console.log(`✅ index.html generated with search & copy features for ${files.length} files`);
