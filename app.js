const logger = require('./logger')

function myFirstNodeApplication(name) {
    console.log('Hello ' + name)
    logger.log()
}

myFirstNodeApplication('Ishita')