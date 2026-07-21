const fs = require("fs");
const path = require("path");

const booksDir = path.join(__dirname, "../assets/books");
const poemsDir = path.join(__dirname, "../assets/poems");
const seriesDir = path.join(__dirname, "../assets/series");
const novelsDir = path.join(__dirname, "../assets/novels");

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

function countSeriesWords(folder){

    let total = 0;

    const entries = fs.readdirSync(folder, {
        withFileTypes: true
    });

    entries.forEach(entry => {

        const fullPath = path.join(folder, entry.name);

        if(entry.isDirectory()){

            total += countSeriesWords(fullPath);

        }

        else if(entry.name.endsWith(".md")){

            const text = fs.readFileSync(fullPath,"utf8");

            const words = text
                .replace(/[#>*`_\-\[\]\(\)]/g," ")
                .trim()
                .split(/\s+/)
                .length;

            total += words;

        }

    });

    return total;

}

const storyWords = countWords(booksDir);
const poemWords = countWords(poemsDir);
const seriesWords = countSeriesWords(seriesDir);
const novelWords = countWords(novelsDir);

const stats = {
    totalWords: storyWords + poemWords + seriesWords + novelWords,
    storyWords,
    poemWords,
    seriesWords,
    novelWords
};

fs.writeFileSync(
    path.join(__dirname,"../assets/stats.json"),
    JSON.stringify(stats,null,4)
);

console.log("Stats generated!");