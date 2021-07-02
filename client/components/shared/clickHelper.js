var axios = require('axios');

// Returns the active product
const clickHelper = (func)=>{
  var d = new Date()

    return (e)=>{
      log(e.nativeEvent.path)
      log(e.nativeEvent.path.splice(-7)[0])
      log('Time:',d.toLocaleTimeString())
      func()
    }
}



module.exports = {
    clickHelper:clickHelper

}