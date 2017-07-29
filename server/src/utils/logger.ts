import * as winston from 'winston'
import * as config from 'config'
import * as path from 'path'
import * as mkdirp from 'mkdirp'

interface LoggerConf {
  file: winston.FileTransportInstance[]
  console: winston.ConsoleTransportInstance[]
}

const conf = config.get<LoggerConf>('log')

const fileConf = conf.file.map(c => {
  mkdirp.sync(path.dirname(c.filename))
  return new winston.transports.File(c)
})

const consoleConf = conf.console.map(c => {
  return new winston.transports.Console(c)
})

const logger = new winston.Logger({
  transports: fileConf.concat(consoleConf)
})

export default logger

