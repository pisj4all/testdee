function generateQuery() {
  const query = document.getElementById('query').value;
  const sources = Array.from(document.getElementById('sources').selectedOptions).map(opt => opt.value);
  const niche = document.getElementById('niche').value;

  if (!query) {
    alert('Please enter a search query.');
    return;
  }

  const searchQuery = sources.map(source => \`\${source} "\${query} \${niche}"\`).join(" OR ");
  const encoded = encodeURIComponent(searchQuery);
  const searchURL = \`https://www.google.com/search?q=\${encoded}\`;

  document.getElementById('searchOutput').innerHTML = \`
    <p><strong>Search Query:</strong> \${searchQuery}</p>
    <button onclick="window.open('\${searchURL}', '_blank')">Open Search in Google</button>
    <button onclick="navigator.clipboard.writeText('\${searchQuery}')">Copy to Clipboard</button>
  \`;

  generateSuggestions(query);
}

function generateSuggestions(query) {
  const base = query.toLowerCase();
  const suggestions = [
    \`alternatives to \${base}\`,
    \`top tools for \${base}\`,
    \`cheapest \${base} options\`,
    \`\${base} for beginners\`,
    \`trusted \${base} providers\`
  ];
  document.getElementById('relatedSuggestions').innerHTML = '<h3>Related Search Suggestions</h3><ul>' + 
    suggestions.map(s => '<li>' + s + '</li>').join('') + '</ul>';
}

function copyPrompt(text) {
  navigator.clipboard.writeText(text);
  alert("Prompt copied!");
}

function clearTracker() {
  localStorage.removeItem("forumTracker");
  document.getElementById("trackerBody").innerHTML = "";
}

function loadTracker() {
  const data = JSON.parse(localStorage.getItem("forumTracker") || "[]");
  const body = document.getElementById("trackerBody");
  body.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = \`<td>\${row.url}</td><td>\${row.notes}</td><td>\${row.status}</td>\`;
    body.appendChild(tr);
  });
}

function addTrackerEntry(url, notes, status) {
  const data = JSON.parse(localStorage.getItem("forumTracker") || "[]");
  data.push({ url, notes, status });
  localStorage.setItem("forumTracker", JSON.stringify(data));
  loadTracker();
}

window.onload = loadTracker;