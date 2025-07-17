const fs = require("fs");

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
  const cdnLink = `https://cdn.jsdelivr.net/gh/${repoOwner}/${repoName}@main/${file}`;
  return `
    <div class="card" data-name="${file.toLowerCase()}">
      <img src="${file}" alt="${file}">
      <div>${emojiForFile(file)} ${file}</div>
      <div class="links">
        <a href="${file}" target="_blank">GitHub Pages Link</a>
        <a href="${cdnLink}" target="_blank">jsDelivr CDN</a>
        <select class="size-select" data-link="${cdnLink}">
          <option value="">Original</option>
          <option value="50">50px</option>
          <option value="100">100px</option>
          <option value="200">200px</option>
          <option value="400">400px</option>
        </select>
        <button class="copy-btn" data-link="${cdnLink}">📋 Copy</button>
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
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
    .copy-btn {
      background: #007bff;
      color: #fff;
      border: none;
      padding: 6px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 5px;
    }
    .copy-btn:hover {
      background: #0056b3;
    }
    .size-select {
      margin-top: 5px;
      padding: 5px;
      font-size: 12px;
    }
  </style>
</head>
<body>

<h1>📦 ${repoOwner}/${repoName} CDN</h1>
<p style="text-align:center;">Search, view & copy CDN links with preset sizes</p>

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

// 📋 Copy CDN Link with selected size
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const baseLink = this.dataset.link;
    const parent = this.closest(".links");
    const sizeSelect = parent.querySelector(".size-select");
    const selectedSize = sizeSelect.value;

    let snippet = "";
    if (selectedSize) {
      snippet = \`<img src="\${baseLink}" width="\${selectedSize}" height="\${selectedSize}"></img>\`;
    } else {
      snippet = baseLink; // original
    }

    navigator.clipboard.writeText(snippet).then(() => {
      this.textContent = "✅ Copied!";
      setTimeout(() => { this.textContent = "📋 Copy"; }, 1500);
    });
  });
});
</script>

</body>
</html>`;

fs.writeFileSync("index.html", html);
console.log(`✅ index.html generated with search + preset size + copy features for ${files.length} files`);



