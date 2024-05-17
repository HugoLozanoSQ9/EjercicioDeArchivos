// todo add "limpiar mi cuarto"
// todo done 10 
// todo ls
// todo alv 

//necesitamos 
/*
necesitamos: 

-un archivo para guardar todos los(.json)
-una función para cada comando
-usar process.argv para leer los comandos
-usar fs para leer y escribir el archivo 

*/

const fs = require('node:fs')


//crear el archivo de base de datos
const dbFile = 'db.json'


//Se comenzó desde acá 
function init() {

    //se valida si existe el archivo
    const fileExists = fs.existsSync(dbFile)

    if (!fileExists) {
        fs.writeFileSync(dbFile, JSON.stringify({ todos: [] }))
    }
}

function getTodos() {
    //1.- leer el archivo
    const content = fs.readFileSync(dbFile, 'utf-8')
    return JSON.parse(content).todos //dado que tenemos todos como llave dentro de init entonces se procede a asignar el json.parse
}

/*
    const todos = getTodos()
    todos.push('texto de ejemplo')
    update(todos)

    //borrar 
    updateTodos([])
*/
function updateTodos(todos) {
    //el objeto creado con la nueva info
    const newTodos = { todos: todos }
    //el objeto como string
    const newTodosasString = JSON.stringify(newTodos)
    //Re escribiendo el archivo ya con las actualizaciones
    fs.writeFileSync(dbFile, newTodosasString)


}

function add(task) {
    // Leer archivo
    const todos = getTodos()
    //agregar al archivo
    todos.push(task)
    //se actualiza el update
    updateTodos(todos)

}

function done(taskIndex) {
    // Leer archivo
    const todos = getTodos()
    //Eliminar el elemento de la lista
    todos.splice(taskIndex, 1)
    //actualizar el archivo (con el elemento de la lista eliminado)
    updateTodos(todos)
}

function ls() {
    //leer archivo
    const todos = getTodos()

    if (!todos.length) {
        console.log('[EMPTY]')
        process.exit(0)
    }

    todos.forEach((task, i) => {
        console.log(`${i} - ${task}`)
    })

}

function alv() {
    //se hace update con una lista vacía 
    updateTodos([])
}

function main() {
    const command = process.argv[2]
    const arg = process.argv[3]

    init()

    if (command == 'ls') {
        ls()
    }else if (command == 'add') {
        if (!arg) {
            console.error('missing task')
            process.exit(1)
        } else {
            add(arg)
            console.log(`Task added ${ls()}`)
        }
    } else if (command == 'done') {
        if (!arg) {
            console.error('missing task index')
            process.exit(1)
        }

        const idx = parseInt(arg)

        if (isNaN(idx)) {
            console.error('invalid index')
            process.exit(1)
        }

        const todos = getTodos()

        if (idx < 0 || idx >= todos.length) {
            console.error('index out of range')
            process.exit(1)
        }

        done(idx)
        console.log(`Task completed ${ls()}`)

    } else if (command == 'alv') {
        alv()
        console.log('Algo lindo vendra Owo (borraste todo bro jajaja)')
    } else {
        console.error('Invalid command: ', command)
        process.exit(1)
    }
}
main()