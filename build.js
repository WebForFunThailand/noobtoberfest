const fs = require('fs')
const path = require('path')

const excludes = ['.git', '.idea', 'node_modules']
const directories = []

const { years, title } = require('./config')

fs.readdirSync(path.join(__dirname)).forEach(file => {
  if (fs.lstatSync(path.join(__dirname, file)).isDirectory()) {
    if (!excludes.includes(file)) {
      directories.push(file)
    }
  }
})

let gameTemplateMap = {}

for (const { year, header, description } of years) {
  gameTemplateMap[year] = `
    <div class="topic">
        <h1 class="heading">${header}</h1>
        <p class="desc">${description}</p>
        <a
        class="hacking"
        href="https://github.com/chunza2542/noobtoberfest"
        target="_blank"
        >START HACKING</a>
    </div>
    `
}

directories.forEach(directory => {
  let info = fs.readFileSync(path.join(__dirname, directory, 'info.json'))
  info = JSON.parse(info.toString())

  const template = `
        <div class="game">
            <a class="head" href="/${directory}" target="_blank">
            <h3 class="play-keyword">Play - </h3>
            <h3>${info.name}</h3>
            </a>
            <p style="color: #ccc">${info.description}</p>
            <a href="${info.facebook}" target="_blank" class="author">${info.author}</a>
        </div>`

  gameTemplateMap[info.year] += template
})

const totalTemplate = years
  .map(({ year }) => gameTemplateMap[year])

  .join()

let htmlTemplate = fs
  .readFileSync(path.join(__dirname, 'template.html'))
  .toString()

htmlTemplate = htmlTemplate.replace('#include-template', totalTemplate)
htmlTemplate = htmlTemplate.replace('#include-title', title)

fs.writeFileSync('index.html', htmlTemplate)
console.log('Done~')
