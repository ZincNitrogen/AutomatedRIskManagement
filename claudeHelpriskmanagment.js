const prompt = require("prompt-sync")({ sigint: true });

let currentProtocol = {
    startingAccount: 500,
    _liveTotal: 500, // Internal storage for live account total
   
    get baseAccount() {
        return this.startingAccount;
    },
    
    set baseAccount(bufferAdjustmentValue) {
        this.startingAccount += bufferAdjustmentValue;
    },
    
    get liveAccountTotal() {
        return this._liveTotal;
    },
    
    set liveAccountTotal(pnl = 0) {
        this._liveTotal = this.startingAccount + pnl;
    },
    
    get mlpd() {
        return this.baseAccount / 2;
    },
    
    get mlpt() {
        return this.mlpd / 5;
    },
    
    get nextRiskUnit() {
        return this.mlpt * 2;
    },
    
    get goalRiskAdjustmentBuffer() { 
        return this.nextRiskUnit * 5;
    },
    
    get currentBuffer() {
        return this.liveAccountTotal - this.baseAccount;
    },
    
    get currentPercentOfGoalBuffer() {
        return (this.currentBuffer / this.goalRiskAdjustmentBuffer) * 100;
    },
};

function bufferAdjustment() {
    if (currentProtocol.currentBuffer >= currentProtocol.goalRiskAdjustmentBuffer || 
        currentProtocol.currentBuffer <= -currentProtocol.mlpd) {
        
        console.log("\n🎯 BUFFER ADJUSTMENT TRIGGERED!");
        console.log(`Previous Base Account: ${currentProtocol.baseAccount}`);
        console.log(`Buffer Amount: ${currentProtocol.currentBuffer}`);
        
        currentProtocol.baseAccount = currentProtocol.currentBuffer;
        currentProtocol._liveTotal = currentProtocol.startingAccount; // Reset live total to new base
        
        console.log(`New Base Account: ${currentProtocol.baseAccount}`);
        console.log(`Buffer Reset to: ${currentProtocol.currentBuffer}\n`);
    }
}

console.log("=== Initial Protocol State ===");
for (let [key, value] of Object.entries(currentProtocol)) {
    if (!key.startsWith('_')) { // Don't show internal properties
        console.log(`${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`);
    }
}

let inputPnl = +prompt("\nEnter P&L (profit/loss from base): ");
currentProtocol.liveAccountTotal = inputPnl;

console.log("\n=== After P&L Update ===");
for (let [key, value] of Object.entries(currentProtocol)) {
    if (!key.startsWith('_')) {
        console.log(`${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`);
    }
}

bufferAdjustment();

console.log("\n=== Final Protocol State ===");
for (let [key, value] of Object.entries(currentProtocol)) {
    if (!key.startsWith('_')) {
        console.log(`${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`);
    }
}