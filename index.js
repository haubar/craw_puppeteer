const craw = require('./craw')

if(process.argv[2]){
    let tag = process.argv[2]
    craw.twdvd(tag)
  } else {
    craw.toutiao('toutiao')
  }
