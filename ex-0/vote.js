var events = require('events'),
    eventsConfig = require('./config').events;

var log= Array();

class Vote extends events.EventEmitter{
    constructor(maxVote,group,groupList){
        super();
        //initiate
        this.groupList = groupList;
        this.group = group;
        this.maxVote = maxVote;
        this.voteCount = 0;

        this.on("checkMax",(that,name)=>{
            if (that.voteCount == that.maxVote){      
                addLog("You've reached the max votes.");
                return;
            }
            addLog(`Adding a ${that.group} vote`);
            that.groupList[name] += 1;
            that.voteCount += 1;
        })


        addLog(`In the Category: ${group}, The Options Are: ${groupList}`);
        addLog(`The Max Votes Are: ${maxVote}`);
        addLog(`------------------`);
    

    }

    resetVotes(){       
        addLog(`Reseting all  the votes in ${this.group}`);
        addLog(`------------------`);
        this.voteCount = 0;

        for(var key in this.groupList)
            this.groupList[key] = 0;
    
        this.emit(eventsConfig.displayVotes);
    }

    addVote(name){

       
        this.emit("checkMax", this,name);
        this.emit(eventsConfig.displayVotes);       
    }

    getAllVotesRecord(){
        return log;
    }

    showResults(){   
        addLog(`The Votes Results for ${this.group} are: `);
        addLog(`Total Votes: ${this.voteCount}`);

        for(var key in this.groupList)
            addLog(`${key} ${this.groupList[key]}`);     
    }

 
}

function displayVotes(){
    for(var key in this.groupList)
        addLog(`${this.groupList[key]} ${key}`);
    addLog("--------------------");
}


module.exports = (maxVote,group,groupList) => {
    var vote = new Vote(maxVote, group, groupList);
    vote.on(eventsConfig.displayVotes, displayVotes);
    if(group=="Prime Minister"){
        vote.addVote("Netanyau");
        vote.addVote("Netanyau");
        vote.addVote("Netanyau");
        vote.addVote("Netanyau");
        vote.addVote("Netanyau");
        vote.addVote("Netanyau");
        vote.addVote("Netanyau");
        vote.addVote("Netanyau");



        vote.resetVotes();

        vote.addVote("Herzog");
        vote.addVote("Herzog");
        vote.addVote("Lapid");
        vote.addVote("Benet");

        vote.showResults();
    }
    else{
        vote.addVote("Netanyau");
        vote.addVote("Erdan");
        vote.addVote("Erdan");
        vote.addVote("Netanyau");
        vote.addVote("Kats");
        vote.addVote("Netanyau");
        vote.addVote("Regev");
        vote.addVote("Kats");

        vote.showResults();

    }
    return vote;
}

var addLog = (msg) => {
    console.log(msg);
    log.push(`${msg}<br>`);
}
