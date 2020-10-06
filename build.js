const fs = require('fs')
const path = require('path')

const excludes = ['.git', '.idea', 'node_modules', '.netlify']
const directories = []

const { years, title, banner } = require('./config')

fs.readdirSync(path.join(__dirname)).forEach(file => {
  if (fs.lstatSync(path.join(__dirname, file)).isDirectory()) {
    if (!excludes.includes(file)) {
      directories.push(file)
    }
  }
})

let gameTemplateMap = {}
let isBttonExist = false
for (const { year, header, description } of years) {
  gameTemplateMap[year] = `
    <div class="main-container">
        <div class="topic">
            <h1 class="heading">${header}</h1>
            <p class="desc">${description}</p>
            ${
              isBttonExist
                ? ''
                : `<a
            class="hacking"
            href="https://github.com/chunza2542/noobtoberfest"
            target="_blank"
            >START HACKING</a>`
            }
        </div>
    </div>
    `
  isBttonExist = true
}

directories.forEach(directory => {
  let info = fs.readFileSync(path.join(__dirname, directory, 'info.json'))
  info = JSON.parse(info.toString())

  const template = `
        <div class="main-container">
            <div class="game">
                <a class="head" href="/${directory}" target="_blank">
                <h3 class="play-keyword">Play - </h3>
                <h3>${info.name}</h3>
                </a>
                <p style="color: #57606f">${info.description}</p>
                👉 <a href="${info.facebook}" target="_blank" class="author">${info.author}</a>
            </div>
        </div>
        `

  gameTemplateMap[info.year] += template
})

const totalTemplate = years.map(({ year }) => gameTemplateMap[year]).join('')

let htmlTemplate = fs
  .readFileSync(path.join(__dirname, 'template.html'))
  .toString()

htmlTemplate = htmlTemplate.replace('#include-banner-title', banner.title)
htmlTemplate = htmlTemplate.replace(
  '#include-banner-description',
  banner.description
)
htmlTemplate = htmlTemplate.replace('#include-template', totalTemplate)
htmlTemplate = htmlTemplate.replace('#include-title', title)

fs.writeFileSync('index.html', htmlTemplate)
console.log('Done~')
