const fs = require('fs');
const path = require('path');

const excludes = [".git", ".idea", "node_modules"];
const directories = [];

fs.readdirSync(path.join(__dirname)).forEach(file => {
    if (fs.lstatSync(path.join(__dirname, file)).isDirectory()) {
        if (!excludes.includes(file)) {
            directories.push(file);
        }
    }
});

let gameTemplate = ``;

directories.forEach(directory => {
    let info = fs.readFileSync(path.join(__dirname, directory, "info.json"));
    info = JSON.parse(info.toString());

    const template = `
        <div class="game">
            <a class="head" href="/${directory}"><h3>${info.name}</h3></a>
            <p style="color: #ccc">${info.description}</p>
            <a href="${info.facebook}" target="_blank" class="author">${info.author}</a>
        </div>`

    gameTemplate += template;
});

let htmlTemplate = fs.readFileSync(path.join(__dirname, "template.html")).toString();
htmlTemplate = htmlTemplate.replace("#include-template", gameTemplate);

fs.writeFileSync("index.html", htmlTemplate);
console.log("Done~");


