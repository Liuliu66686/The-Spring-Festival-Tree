let modInfo = {
	name: "The Spring Festival Tree",
	id: "liuliuzaicizhueveryonehappyspringfstv111",
	author: "Liuliu66686 vs. 溜溜溜达嘿",
	pointsName: "春节点",
	modFiles: ["layers.js", "tree.js","functions.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), 
	offlineLimit: 114514, 
}

// Set your version in num and name
let VERSION = {
	num: "春节快乐",
	name: "祝大家春节快乐!!!",
}

let changelog = `<h1>更新日志:</h1><br>
	<h3>v春节快乐</h3><br>
		- 春节快乐!这边就不剧透了!<br>
		- ???`

let winText = `恭喜通关,春节快乐!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = one
	let exp = one
	if(hasUpgrade("t",34)) gain = gain.mul(upgradeEffect("t",34))
	if(hasUpgrade("t",25)) gain = gain.mul(upgradeEffect("t",25))
	if(hasUpgrade("y",11)) gain = gain.mul(upgradeEffect("y",11))
	gain = gain.mul(layers.t.getGridEffects("p"))

	if(inChallenge("y",11)) exp = exp.div(2)
	if(inChallenge("y",21)) exp = exp.mul(0)
		
	return gain.pow(exp)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"QQ群号: 951232913"
]

// Determines when the game "ends"
function isEndgame() {
	return hasChallenge("q",11)||player.q.jump
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}