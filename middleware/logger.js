const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    //
    const dateTime = format(new Date(), 'yyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid}\t${message}`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
                }
            await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName, logItem))
        } catch (err){
            console.log(err)
        }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.methond} ${req.path}`)
    next()
}

module.exports = {logEvents, logger}