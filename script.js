const htmlEditor = document.getElementById("htmlEditor")
const cssEditor = document.getElementById("cssEditor")
const jsEditor = document.getElementById("jsEditor")
const runButton = document.getElementById("runButton")
const output = document.getElementById("output")
const themeToggle = document.getElementById("themeToggle")

function updateOutput() {
  const html = htmlEditor.value
  const css = cssEditor.value
  const js = jsEditor.value

  const outputContent = `
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `

  output.srcdoc = outputContent
}

runButton.addEventListener("click", () => {
  updateOutput()
  runButton.classList.add("button-pulse")
  setTimeout(() => {
    runButton.classList.remove("button-pulse")
  }, 300)
})

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")
  const isDarkTheme = document.body.classList.contains("dark-theme")
  themeToggle.innerHTML = isDarkTheme
    ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
})

// Autosave functionality
function saveToLocalStorage() {
  localStorage.setItem("htmlCode", htmlEditor.value)
  localStorage.setItem("cssCode", cssEditor.value)
  localStorage.setItem("jsCode", jsEditor.value)
}

function loadFromLocalStorage() {
  htmlEditor.value = localStorage.getItem("htmlCode") || htmlEditor.value
  cssEditor.value = localStorage.getItem("cssCode") || cssEditor.value
  jsEditor.value = localStorage.getItem("jsCode") || jsEditor.value
}
;[htmlEditor, cssEditor, jsEditor].forEach((editor) => {
  editor.addEventListener("input", saveToLocalStorage)
})

// Load saved code on page load
loadFromLocalStorage()

// Initial run
updateOutput()

