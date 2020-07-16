const fs = require('fs')
const chalk = require('chalk')
const os = require('os')


const addNote = (title, body) => {
    notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('Note successfully added!'))
        console.log('Yes. It is true. Your note has been added!')
        console.log('One more logging added!')
    } else {
        console.log('')
        console.log(chalk.bgRed('Note title taken !. Please provide alternate title.'))
    }
}

const removeNote = (title) => {
    notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length === notesToKeep.length){
        console.log(chalk.bgRed('No note found !'))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed!'))
    }
    saveNotes(notesToKeep)
    
}

const readNotes = (title) =>{
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)

    if(foundNote === undefined){
        console.log(chalk.red.inverse('There is no note with title:', title))
    }else{
        console.log(chalk.blue.underline(foundNote.title))
        console.log(foundNote.body)
    }
}

const listNotes = () =>{
    console.log(chalk.blue.underline('Your Notes'))
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title))
}

const saveNotes = (notes) => {
    dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    try{
        dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const notes = JSON.parse(dataJSON)
        return notes

    }catch(exception) {
        return []
    }
}
module.exports = {
    add: addNote,
    remove: removeNote,
    list: listNotes,
    read: readNotes
}