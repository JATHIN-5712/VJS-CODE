// script.js const html = document.getElementById("html"); const css = document.getElementById("css"); const js = document.getElementById("js"); const preview = document.getElementById("preview"); const consoleDiv = document.getElementById("console"); const projectSelector = document.getElementById("projectSelector");

function updatePreview() { const doc = <!DOCTYPE html><html><head><style>${css.value}</style></head><body>${html.value}<script>${js.value}<\/script></body></html>; const blob = new Blob([doc], { type: 'text/html' }); preview.src = URL.createObjectURL(blob); }

function autoSave() { const name = document.getElementById("projectName").value || "default"; const data = { html: html.value, css: css.value, js: js.value }; localStorage.setItem(name, JSON.stringify(data)); refreshProjects(); }

function refreshProjects() { const keys = Object.keys(localStorage); projectSelector.innerHTML = keys.map(k => <option>${k}</option>).join(''); }

function loadProject() { const name = projectSelector.value; const data = JSON.parse(localStorage.getItem(name)); if (data) { html.value = data.html; css.value = data.css; js.value = data.js; updatePreview(); } }

function saveProject() { autoSave(); alert("Project saved!"); }

function saveCurrentFile() { const blob = new Blob([html.value], { type: 'text/html' }); saveAs(blob, 'index.html'); }

function downloadZip() { const zip = new JSZip(); zip.file("index.html", html.value); zip.file("style.css", css.value); zip.file("script.js", js.value); zip.generateAsync({ type: "blob" }).then(content => saveAs(content, "project.zip")); }

function openTab(type) { html.classList.remove("active"); css.classList.remove("active"); js.classList.remove("active"); document.getElementById(type).classList.add("active"); }

function toggleTheme() { document.body.classList.toggle("dark"); }

function formatCode() { html.value = html.value.trim(); css.value = css.value.trim(); js.value = js.value.trim(); updatePreview(); }

function createFile() { alert("File creation simulated"); }

function createFolder() { alert("Folder creation simulated"); }

function enableExtension(ext) { if (ext === 'colorPicker') { css.addEventListener("input", () => { const colors = css.value.match(/#[0-9a-fA-F]{6}/g); if (colors) consoleDiv.innerText = Colors: ${colors.join(", ")}; }); } else if (ext === 'formatter') { formatCode(); } }

// Load last project refreshProjects(); if (projectSelector.options.length > 0) { projectSelector.selectedIndex = 0; loadProject(); } openTab("html");
