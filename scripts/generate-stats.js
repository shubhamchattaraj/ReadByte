const fs = require("fs");
const path = require("path");

const booksDir = path.join(__dirname, "../assets/books");
const poemsDir = path.join(__dirname, "../assets/poems");

function countWords(folder){

    const files = fs.readdirSync(folder);

    let total = 0;

    files.forEach(file=>{

        if(!file.endsWith(".md")) return;

        const text = fs.readFileSync(
            path.join(folder,file),
            "utf8"
        );

        const words = text
            .replace(/[#>*`_\-\[\]\(\)]/g," ")
            .trim()
            .split(/\s+/)
            .length;

        total += words;

    });

    return total;

}

const storyWords = countWords(booksDir);
const poemWords = countWords(poemsDir);

const stats = {

    totalWords: storyWords + poemWords,
    storyWords,
    poemWords

};

fs.writeFileSync(
    path.join(__dirname,"../assets/stats.json"),
    JSON.stringify(stats,null,4)
);

console.log("Stats generated!");