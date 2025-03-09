document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        displayResults(content);
    };

    reader.readAsText(file);
});

function displayResults(content) {
    const lines = content.split("\n");
    let output = "<h2>Rezultatele Testului</h2>";

    lines.forEach(line => {
        if (line.startsWith("?intreb")) {
            output += `<p><strong>Întrebare:</strong> ${extractValue(line)}</p>`;
        } else if (line.startsWith("res=")) {
            output += `<p><strong>Răspuns dat:</strong> ${extractValue(line)}</p>`;
        } else if (line.startsWith("corect=")) {
            output += `<p><strong>Răspuns corect:</strong> ${extractValue(line)}</p>`;
        } else if (line.startsWith("scor=")) {
            output += `<h3>Scor Final: ${extractValue(line)}</h3>`;
        } else if (line.startsWith("timp=")) {
            output += `<h3>Timp Total: ${extractValue(line)}</h3>`;
        }
    });

    document.getElementById("result").innerHTML = output;
}

function extractValue(line) {
    return line.split("=")[1].replace(/"/g, "");
}
