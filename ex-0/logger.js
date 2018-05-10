
module.exports = class Logger {
    constructor(){
        this.logs = [];
    }

    addLog(message){        
        console.log(message);
        
        this.logs.push(message);
    }

    getLogs(){    
        return this.logs;
    }
}