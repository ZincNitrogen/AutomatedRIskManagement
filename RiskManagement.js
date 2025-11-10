const prompt = require("prompt-sync")({ sigint: true});



let currentProtocol = {
    startingAccount: 500,
    baseAccount: 0,
    liveAccountTotal: 0,
    mlpd: 0,
    mlpt: 0,
    nextRiskUnit: 0,
    goalRiskAdjustmentBuffer: 0,
    currentBuffer: 0,
    currentPercentOfGoalBuffer: 0,
    

    get readBaseAccount() {
        
        return this.startingAccount-this.currentBuffer;

    },
    set readBaseAccount(bufferadjustmentvalue){

        this.baseAccount + bufferadjustmentvalue;

    },
    get readLiveAccountTotal(){
        return this.startingAccount;
    },
    set readLiveAccountTotalccountTotal(pnl){
        this.startingAccount + pnl;
    },
    get readMlpd(){
        return this.baseAccount/2;
    },
    get readMlpt(){
        return this.mlpd/5;
    },
    get readNextRiskUnit(){
        return this.mlpt * 2;
    },
    get readGoalRiskAdjustmentBuffer(){ 
        return this.nextRiskUnit * 5;

    },
    get readCurrentBuffer(){
        return this.liveAccountTotal-this.baseAccount;

    },
    get readCurrentPercentOfGoalBuffer(){
        return (this.currentBuffer/this.goalRiskAdjustmentBuffer)/100;
    },


}



function bufferAdjustment(){
    if (currentProtocol.readCurrentBuffer>=currentProtocol.readGoalRiskAdjustmentBuffer || currentProtocol.readCurrentBuffer<=currentProtocol.readMlpd){
        currentProtocol.readBaseAccount(currentProtocol.readCurrentBuffer);

    }
        
}




for (let [key, value] of Object.entries(currentProtocol)) {
    console.log(key,value);
}

let inputpnl = +prompt("pnl?: ");

currentProtocol.liveAccountTotal = inputpnl;



for (let [key, value] of Object.entries(currentProtocol)) {
    console.log(key,value);
}