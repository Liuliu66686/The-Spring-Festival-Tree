addLayer("t", {
    name: "t", 
    symbol: "时",
    position: 0, 
    startData(){ return {
        unlocked: true,
		points: zero,
        unstable: 0,
        speed: one,
        energy: three,
    }},
    color: "white",
    requires: new Decimal(5), 
    resource: "时间", 
    baseResource: "春节点",
    baseAmount(){return player.points}, 
    type: "normal",
    exponent: 0.01,
    gainMult(){ 
        mult = this.unstableMult()
        if(hasUpgrade("t",12)) mult = mult.mul(upgradeEffect("t",12))
        if(hasUpgrade("y",15)) mult = mult.mul(upgradeEffect("y",15))
        if(hasUpgrade("y",21)) mult = mult.mul(upgradeEffect("y",21))
        if(hasUpgrade("y",22)) mult = mult.mul(upgradeEffect("y",22))
        if(getBuyableAmount("y",21).gte(1)) mult = mult.mul(buyableEffect("y",21))
        if(hasChallenge("y",11)) mult = mult.mul(challengeEffect("y",11))
        mult = mult.mul(layers.t.getGridEffects("t"))
        if(inChallenge("y",22)) mult = mult.div(1e43)
        return mult
    },
    gainExp(){ 
        exp = one
        if(inChallenge("y",11)) exp = exp.div(2)
        if(inChallenge("y",12)) exp = exp.div(5)
        return exp
    },
    unstableMult(){
        mult = one.add(hasUpgrade("t",32)+0).sub(n(player.t.unstable)).max(0).mul(player.t.speed)
        return mult
    },
    passiveGeneration() { 
        let a = zero
        if(getBuyableAmount("y",11).gte(1)) a = a.add(buyableEffect("y",11))
        if(a.eq(0)) return
        return a
    },
    doReset(resettingLayer){
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            if(resettingLayer=="y"){
                if(hasUpgrade("y",42)){
                    kept.push("energy");kept.push("grid")
                }
            }
            layerDataReset(this.layer, kept)
        }
    },
    row: 0,
    hotkeys:[
        {key: "t", description: "T: 进行时间重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{    
            title: "时间加速...",
            description: "解锁时间加速和第二行时间升级",
            cost: new Decimal(1),
            unlocked(){return true},
        },
        12:{    
            title: "再次加速...",
            description: "时间获取量基于春节点倍增,解锁第三行时间升级",
            cost: new Decimal(50),
            effect(){
                let eff = player.points.max(2).log(2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",11)},
        },
        13:{    
            title: "突破上限?",
            description: "再解锁两个第二行时间升级,加速倍率可以突破加速倍率上限,但超过上限的部分更难增长",
            cost: new Decimal(7500),
            unlocked(){return hasUpgrade("t",12)},
        },
        14:{    
            title: "时间穿越...",
            description: "解锁时间穿越和第四行时间升级",
            cost: new Decimal(250000),
            unlocked(){return hasUpgrade("t",13)},
        },
        15:{    
            title: "曙光降临",
            description: "解锁新层级",
            cost: new Decimal(1e22),
            unlocked(){return hasUpgrade("t",14)},
        },
        21:{    
            title: "轻柔加速",
            description: "降低加速对时空稳定性的影响",
            cost(){
                let costB = hasUpgrade("t",21)+hasUpgrade("t",22)+hasUpgrade("t",23)+hasUpgrade("t",24)+hasUpgrade("t",25)
                return two.pow(costB).mul(10)
            },
            effect(){
                let eff = 2
                return eff
            },
            effectDisplay(){return "/"+format(n(this.effect()))},
            unlocked(){return hasUpgrade("t",11)},
        },
        22:{    
            title: "强化加速",
            description: "加速的单次增加倍率翻倍",
            cost(){
                let costB = hasUpgrade("t",21)+hasUpgrade("t",22)+hasUpgrade("t",23)+hasUpgrade("t",24)+hasUpgrade("t",25)
                return two.pow(costB).mul(10)
            },
            effect(){
                let eff = n(0.5)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("t",11)},
        },
        23:{    
            title: "扩容加速",
            description: "提高加速倍率上限",
            cost(){
                let costB = hasUpgrade("t",21)+hasUpgrade("t",22)+hasUpgrade("t",23)+hasUpgrade("t",24)+hasUpgrade("t",25)
                return two.pow(costB).mul(10)
            },
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",11)},
        },
        24:{    
            title: "倍增加速",
            description: "基于时间倍增加速的单次增加倍率",
            cost(){
                let costB = hasUpgrade("t",21)+hasUpgrade("t",22)+hasUpgrade("t",23)+hasUpgrade("t",24)+hasUpgrade("t",25)
                return two.pow(costB).mul(3750)
            },
            effect(){
                let eff = player.t.points.max(5).log(5)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",13)},
        },
        25:{    
            title: "重构加速",
            description: "时空稳定性和时间速度的效果也会影响春节点获取",
            cost(){
                let costB = hasUpgrade("t",21)+hasUpgrade("t",22)+hasUpgrade("t",23)+hasUpgrade("t",24)+hasUpgrade("t",25)
                return two.pow(costB).mul(3750)
            },
            effect(){
                let eff = layers.t.unstableMult()
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",13)},
        },
        31:{    
            title: "快速修复",
            description: "加速时空稳定性自我修复的速度",
            cost(){
                let costB = hasUpgrade("t",31)+hasUpgrade("t",32)+hasUpgrade("t",33)+hasUpgrade("t",34)+hasUpgrade("t",35)
                return two.pow(costB).mul(50)
            },
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",12)},
        },
        32:{    
            title: "降低影响",
            description: "增加时空稳定性对时间倍率影响的部分因数",
            cost(){
                let costB = hasUpgrade("t",31)+hasUpgrade("t",32)+hasUpgrade("t",33)+hasUpgrade("t",34)+hasUpgrade("t",35)
                return two.pow(costB).mul(75)
            },
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("t",12)},
        },
        33:{    
            title: "辗转加速",
            description: "基于时间倍增时间速度上限",
            cost(){
                let costB = hasUpgrade("t",31)+hasUpgrade("t",32)+hasUpgrade("t",33)+hasUpgrade("t",34)+hasUpgrade("t",35)
                return two.pow(costB).mul(100)
            },
            effect(){
                let eff = player.t.points.max(20).log(20)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",12)},
        },
        34:{    
            title: "反向倍增",
            description: "基于时间倍增春节点获取",
            cost(){
                let costB = hasUpgrade("t",31)+hasUpgrade("t",32)+hasUpgrade("t",33)+hasUpgrade("t",34)+hasUpgrade("t",35)
                return two.pow(costB).mul(125)
            },
            effect(){
                let eff = player.t.points.root(player.t.points.max(1).log(1e10).add(2)).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",12)},
        },
        35:{    
            title: "自我倍增",
            description: "基于时间倍增时间获取",
            cost(){
                let costB = hasUpgrade("t",31)+hasUpgrade("t",32)+hasUpgrade("t",33)+hasUpgrade("t",34)+hasUpgrade("t",35)
                return two.pow(costB).mul(150)
            },
            effect(){
                let eff = player.t.points.max(15).log(15)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("t",12)},
        },
        41:{    
            title: "激发穿越I",
            description: "获得2个穿越能量,重置路径后生效",
            cost(){
                let costB = hasUpgrade("t",41)+hasUpgrade("t",42)+hasUpgrade("t",43)+hasUpgrade("t",44)+hasUpgrade("t",45)
                return two.pow(costB).mul(4e5)
            },
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("t",14)},
        },
        42:{    
            title: "激发穿越II",
            description: "获得2个穿越能量,重置路径后生效",
            cost(){
                let costB = hasUpgrade("t",41)+hasUpgrade("t",42)+hasUpgrade("t",43)+hasUpgrade("t",44)+hasUpgrade("t",45)
                return two.pow(costB).mul(4e6)
            },
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("t",14)},
        },
        43:{    
            title: "激发穿越III",
            description: "获得2个穿越能量,重置路径后生效",
            cost(){
                let costB = hasUpgrade("t",41)+hasUpgrade("t",42)+hasUpgrade("t",43)+hasUpgrade("t",44)+hasUpgrade("t",45)
                return two.pow(costB).mul(4e8)
            },
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("t",14)},
        },
        44:{    
            title: "激发穿越IV",
            description: "获得3个穿越能量,重置路径后生效",
            cost(){
                let costB = hasUpgrade("t",41)+hasUpgrade("t",42)+hasUpgrade("t",43)+hasUpgrade("t",44)+hasUpgrade("t",45)
                return two.pow(costB).mul(4e11)
            },
            effect(){
                let eff = three
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("t",14)},
        },
        45:{    
            title: "激发穿越V",
            description: "获得3个穿越能量,重置路径后生效",
            cost(){
                let costB = hasUpgrade("t",41)+hasUpgrade("t",42)+hasUpgrade("t",43)+hasUpgrade("t",44)+hasUpgrade("t",45)
                return two.pow(costB).mul(4e15)
            },
            effect(){
                let eff = three
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("t",14)},
        },
    },
    clickables:{
        11:{    
            title: "时间加速...",
            display() {
                let textp = ""
                if(player.t.speed.gt(this.speedMax())) textp += "(+"+format(this.speedMax().div(player.t.speed.div(this.speedMult()).max(1)))+")"
                return "加速时间,但会破坏时空稳定性<br>(时空稳定性会自己修复)<br><h3>当前时间速度: x"+format(player.t.speed)+"<br>时间速度上限: x"+format(this.speedMax())+"<br>单次增加倍率: +"+format(this.speedMult())+textp},
            canClick(){return player.t.unstable<=1},
            onClick() {          
                let a = 0.1
                if(hasUpgrade("t",21)) a/=upgradeEffect("t",21) 
                if(hasUpgrade("y",13)) a/=upgradeEffect("y",13) 
                if(hasUpgrade("y",23)) a = 0
                player.t.unstable += a
                if(!hasUpgrade("t",13)) player.t.speed = player.t.speed.add(this.speedMax().sub(player.t.speed).div(3).min(this.speedMult()))
                else player.t.speed = player.t.speed.add(this.speedMax().div(player.t.speed.div(this.speedMult()).max(1)))        
            },
            speedMult(){
                let mult = n(0.5)
                if(hasUpgrade("t",22)) mult = mult.add(upgradeEffect("t",22))
                if(hasUpgrade("t",24)) mult = mult.mul(upgradeEffect("t",24))
                if(hasUpgrade("y",14)) mult = mult.mul(upgradeEffect("y",14))
                mult = mult.mul(layers.t.getGridEffects("a"))
                return mult
            },
            speedMax(){
                let max = n(5)
                if(hasUpgrade("t",23)) max = max.mul(upgradeEffect("t",23))
                if(hasUpgrade("t",33)) max = max.mul(upgradeEffect("t",33))
                if(hasUpgrade("y",14)) max = max.mul(upgradeEffect("y",14))
                max = max.mul(layers.t.getGridEffects("m"))
                return max
            },
            style() {return {'background-color':this.canClick()?"#FFFFFF":"#bf8f8f",'border-radius': "0px", height: "120px", width: "200px" } },
        },
        12:{    
            title: "清空时间穿越路径",
            display: "清空后,返还穿越能量,但清空已有的春节点和时间",
            canClick(){return getGridData("t",101)||player.y.unlocked},
            onClick() {          
                const list = quickSpawnConst(6,6,true)
                for(id in list){player.t.grid[list[id]]=false}
                player.t.points = player.points = zero
                player.t.energy = layers.t.energyMax()
            },
            style() {return {'background-color':this.canClick()?"#FFFFFF":"#bf8f8f",'border-radius': "0px", height: "120px", width: "200px" } },
        },
    },
    grid: {
        rows: 6,
        cols: 6,
        getStartData(id) {
            return false
        },
        getUnlocked(id) {
            return hasUpgrade("y",12)||hasUpgrade("t",14)
        },
        getCanClick(data, id) {
            if(id==101&&!getGridData(this.layer,id)) return true
            if(this.getIDs.includes(id)&&!data&&checkAroundGrid(this.layer,id)&&player.t.energy.gte(1)) return true
            else return false
        },
        onClick(data, id) { 
            player.t.energy = player.t.energy.sub(1)  
            player[this.layer].grid[id] = true
            if(id==401||id==303) player.t.energy = player.t.energy.add(1)
            if(id==106) player.t.speed = gridEffect("t",106)
            if(id==602) player.t.energy = player.t.energy.add(gridEffect("t",602))
            if(id==206) player.t.energy = player.t.energy.add(gridEffect("t",206))
        },
        getTitle(data, id) {
            if(!this.getIDs.includes(id)) return "时空墙"
            if(id==101) return "起始点"
            if(id==601) return "立春"
            if(id==602) return "小雨"
            if(id==502) return "惊蛰"
            if(id==402) return "春分"
            if(id==401) return "清明"
            if(id==302) return "谷雨"
            if(id==202) return "立夏"
            if(id==201) return "小满"
            if(id==102) return "芒种"
            if(id==103) return "夏至"
            if(id==104) return "小暑"
            if(id==204) return "大暑"
            if(id==304) return "立秋"
            if(id==303) return "处暑"
            if(id==205) return "白露"
            if(id==206) return "秋分"
            if(id==106) return "寒露"
            if(id==306) return "霜降"
            if(id==406) return "立冬"
            if(id==405) return "小雪"
            if(id==404) return "大雪"
            if(id==504) return "冬至"
            if(id==604) return "小寒"
            if(id==605) return "大寒"
            if(id==606) return "除夕"
        },
        getDisplay(data, id) {
            if(!this.getIDs.includes(id)) return "你无法经过这里"
            if(id==101) return "出发的地方"
            if(id==601) return "所有的'春节点获取x2'和'时间获取x2'的效果都变为x3"
            if(id==602) return "穿越到此时,基于时间获得穿越能量(1e7起)<br>当前: +"+format(this.getEffect(data,id),0)
            if(id==502) return "时间获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==402) return "春节点获取基于穿越到的春节气数量倍增<br>当前: x"+format(this.getEffect(data,id))
            if(id==401) return "穿越到此时获得1个穿越能量"
            if(id==302) return "时间获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==202) return "时间获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==201) return "春节点获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==102) return "春节点获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==103) return "基于时空穿越对春节点的所有效果倍增时间获取<br>当前: x"+format(this.getEffect(data,id))
            if(id==104) return "时间速度上限x5<br>当前: x"+format(this.getEffect(data,id))
            if(id==204) return "单次增加倍率基于穿越到的夏节气数量倍增<br>当前: x"+format(this.getEffect(data,id))
            if(id==304) return "时间速度上限基于穿越到的秋节气数量倍增<br>当前: x"+format(this.getEffect(data,id))
            if(id==303) return "穿越到此时获得1个穿越能量"
            if(id==205) return "春节点获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==206) return "穿越到此时,基于当前时间速度获得穿越能量(x2000起)<br>当前: +"+format(this.getEffect(data,id),0)
            if(id==106) return "穿越到此时,将当前时间速度设置为时间速度上限和单次增加倍率的积的两倍<br>当前: x"+format(this.getEffect(data,id))
            if(id==306) return "时间获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==406) return "时间获取基于穿越到的冬节气数量倍增<br>当前: x"+format(this.getEffect(data,id))
            if(id==405) return "时间获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==404) return "春节点获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==504) return "单次增加倍率x5<br>当前: x"+format(this.getEffect(data,id))
            if(id==604) return "春节点获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==605) return "时间获取x2<br>当前: x"+format(this.getEffect(data,id))
            if(id==606) return "基于穿越到的所有时间的数量倍增时间获取<br>当前: x"+format(this.getEffect(data,id))
        },
        getStyle(data, id){
            if(!this.getIDs.includes(id)) color = "red"
            else{
                if(getGridData(this.layer,id)) color = "#77BF5F"
                else if(this.getCanClick(data,id)) color = "white"
                else color = "#BF8F8F"
            }
            return { 'background-color':color,'border-radius': "0px", height: "90px", width: "90px" }
        },
        getEffect(data,id){
            const doublePids = [102,201,205,404,604]
            const doubleTids = [202,302,306,502,405,605]
            if(doublePids.includes(id)) return two.add(getGridData("t",601)?1:0)
            if(doubleTids.includes(id)) return two.add(getGridData("t",601)?1:0)
            if(id==103) return layers.t.getGridEffects("p").max(1).log(2).add(1)
            if(id==104||id==504) return five
            if(id==602) return player.t.points.div(1e5).max(1).log(100).floor().min((hasUpgrade("y",22)&&!inChallenge("y",11))?1e309:5)
            if(id==206) return player.t.speed.div(200).max(1).log(10).floor().min((hasUpgrade("y",22)&&!inChallenge("y",11))?1e309:4)
            if(id==106) return tmp.t.clickables[11].speedMax.mul(tmp.t.clickables[11].speedMult).mul(2)
            if(id==402){
                let ids = this.sprIDs;let eff = one
                for(id in ids){
                    if(getGridData("t",ids[id])) eff = eff.mul(4)
                }
                return eff
            }
            if(id==204){
                let ids = this.sumIDs;let eff = one
                for(id in ids){
                    if(getGridData("t",ids[id])) eff = eff.add(1) 
                }
                return eff
            }
            if(id==304){
                let ids = this.autIDs;let eff = one
                for(id in ids){
                    if(getGridData("t",ids[id])) eff = eff.add(1)
                }
                return eff
            }
            if(id==406){
                let ids = this.winIDs;let eff = one
                for(id in ids){
                    if(getGridData("t",ids[id])) eff = eff.mul(2)
                }
                return eff
            }
            if(id==606){
                let ids = this.getIDs;let eff = one
                for(id in ids){
                    if(getGridData("t",ids[id])) eff = eff.mul(1.5).add(1)
                }
                return eff
            }
        },
        sprIDs:[302,401,402,502,601,602],
        sumIDs:[102,103,104,201,202,204],
        autIDs:[106,205,206,303,304,306],
        winIDs:[404,405,406,504,604,605],
        getIDs:[101,102,103,104,106,201,202,204,205,206,302,303,304,306,401,402,404,405,406,502,504,601,602,604,605,606]
    },
    bars:{
        unstableBar: {
            direction: RIGHT,
            width: 600,
            height: 40,
            fillStyle: {'background-color' : "blue"},
            progress() {return player.t.unstable},
            zt(){
                if(player.t.unstable<0.11) return "稳定"//0
                if(player.t.unstable<0.22) return "平静"//1
                if(player.t.unstable<0.33) return "良好"//2
                if(player.t.unstable<0.44) return "扰动"//3
                if(player.t.unstable<0.55) return "震动"//4
                if(player.t.unstable<0.66) return "破损"//5
                if(player.t.unstable<0.77) return "开裂"//6
                if(player.t.unstable<0.88) return "爆裂"//7
                if(player.t.unstable<1) return "崩解"   //8
                return "被破坏"                         //9
            },
            display(){return "时空稳定性-当前状态:"+this.zt()+"("+format(n(player.t.unstable*100))+"%)"}
        },
    },
    infoboxes:{
        time:{
            title: "目标",
            body() {return `时间的脚步逐渐加快,转眼间,2024已经过去.<br>
                        2025年已经来临,而春节---也在加快来临.<br>
                        本层内容:操控时间,穿越时空,到达春节前夕!
                `},
            unlocked(){return true},
        },
    },
    getGridEffects(r){
        let eff = one;let IDs = []
        if(r=="p") IDs = [102,201,205,402,404,604]
        if(r=="t") IDs = [103,202,302,306,406,502,405,605,606]
        if(r=="m") IDs = [104,304]
        if(r=="a") IDs = [204,504]
        for(id in IDs){
            if(getGridData(this.layer,IDs[id])) eff = eff.mul(gridEffect(this.layer,IDs[id]))
        }
        return eff
    },
    energyMax(){
        let max = three
        const ids = [41,42,43]
        for(id in ids){
            if(hasUpgrade("t",ids[id])) max = max.add(2)
        }
        if(hasUpgrade("t",44)) max = max.add(3)
        if(hasUpgrade("t",45)) max = max.add(3)
        return max
    },
    update(diff){
        if(player.t.unstable>diff/50) player.t.unstable -= diff/50*(1+hasUpgrade("t",31))
        else player.t.unstable = 0
        player.t.speed = player.t.speed.mul(n(0.995).pow(diff)).max(1)
        if(hasUpgrade("y",34)) player.t.speed = gridEffect("t",106).max(player.t.speed)
        if(hasUpgrade("y",41)) autobuyUpgrades("t")
    },
    microtabs:{
        main:{
            "Infobox":{
                buttonStyle: {
                    "border-color": "white"
                },
                content:[
                    ["infobox","time"]
                ],
            },
            "Upgrades":{
                buttonStyle: {
                    "border-color": "white"
                },
                content:[
                    "upgrades",["display-text",function(){
                        if(hasUpgrade("t",11)) return "除第一行外,购买每个升级会使所有同行升级的价格翻倍"
                    }],"blank"
                ],
            },
            "Time":{
                buttonStyle: {
                    "border-color": "cyan"
                },
                content:[
                    ["clickable",11],"blank",["bar","unstableBar"]
                    ,["display-text",function(){return "时空稳定性和时间速度会影响时间获取倍率,当前: x"+format(layers.t.unstableMult())}]
                    ,"blank"
                ],
                unlocked(){return hasUpgrade("t",11)}
            },
            "Travel":{
                buttonStyle: {
                    "border-color": "green"
                },
                content:[                    
                    ["display-text",function(){if(inChallenge("q",11)&&!hasUpgrade("y",12)&&!hasUpgrade("t",14)) return "你好啊,我技高一筹,你很聪明,但是我有后手"}],
                    ["display-text",function(){return "你有 <h2 style='color:cyan;text-shadow:0px 0px 10px;'>" +format(player.t.energy,0)+"</h2> /"+format(layers.t.energyMax(),0)+" 穿越能量"
                    }],
                    ,"blank",
                    "grid","blank",["clickable",12],["display-text",function(){return "你开始有 3 穿越能量<br>每进行一次时间穿越,消耗 1 穿越能量"
                    }],"blank"
                ],
                unlocked(){return hasUpgrade("t",14)||hasUpgrade("y",12)}
            },
        },
    },
    tabFormat:{
        "Main": {   
            content: [
                "main-display","prestige-button","resource-display",
                ["microtabs","main"]
            ],
            unlocked(){return true},
        },
    },
})
addLayer("s", {
    name: "s", 
    symbol: "蛇",
    position: 0, 
    branches: ["t"],
    startData(){ return {
        unlocked: true,
		points: zero,
        page: 1,
        snake: [],
        hp: five,
        coins: zero,
        waiting: 0,
        ftimes: 0,
        rebirth: 1,
    }},
    color: "#88ff88",
    resource: "蛇",
    type: "none",
    exponent: 0.1,
    gainMult(){ 
        mult = one
        return mult
    },
    gainExp(){ 
        exp = one
        return exp
    },
    row: 1,
    layerShown(){return hasUpgrade("t",15)||player.y.unlocked},
    upgrades:{
        11:{
            title: "锐化武器",
            description: "伤害x2,解锁一个新的可购买",
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(3),
            unlocked(){return true},
        },
        12:{
            title: "武器晋升",
            description: "伤害x2,解锁一个新的可购买",
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(4),
            unlocked(){return hasUpgrade("s",11)},
        },
        13:{
            title: "转生武器",
            description: "解锁转生武器,转生可以大幅提高伤害",
            cost: new Decimal(8),
            unlocked(){return hasUpgrade("s",12)},
        },
        21:{
            title: "转生强化",
            description: "修改转生增幅伤害的公式",
            cost: new Decimal(20),
            unlocked(){return hasUpgrade("s",13)},
        },
        22:{
            title: "曙光再临!",
            description: "解锁新层级",
            cost: new Decimal(25),
            unlocked(){return hasUpgrade("s",21)},
        },
    },
    buyables:{
        11:{
            title: "强化武器",
            cost(x) {
                let a = two.pow(x)
                return a
            },
            display() { return "额外增加伤害<br>价格: " + format(this.cost()) + "金币<br>效果: +"+format(this.effect())},
            canAfford() { return player.s.coins.gte(this.cost())},
            buy() {
                player.s.coins = player.s.coins.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = x
                return eff
            },
            unlocked(){return true},
            style() { return { 'background-color': this.canAfford()?"yellow":"#BF8F8F", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:yellow;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a
            },
        },
        12:{
            title: "强化武器II",
            cost(x) {
                let a = three.pow(x).mul(300)
                return a
            },
            display() { return "基于已杀死的蛇的种类数量额外增加伤害<br>价格: " + format(this.cost()) + "金币<br>效果: +"+format(this.effect())},
            canAfford() { return player.s.coins.gte(this.cost())},
            buy() {
                player.s.coins = player.s.coins.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = x.mul(player.s.snake.length)
                return eff
            },
            unlocked(){return hasUpgrade("s",11)},
            style() { return { 'background-color': this.canAfford()?"yellow":"#BF8F8F", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:yellow;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a
            },
        },
        21:{
            title: "晋升武器",
            cost(x) {
                let a = n(100).pow(x).mul(1e4)
                return a
            },
            display() { return "晋升武器,双倍伤害<br>价格: " + format(this.cost()) + "金币<br>效果: x"+format(this.effect())},
            canAfford() { return player.s.coins.gte(this.cost())},
            buy() {
                player.s.coins = player.s.coins.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = two.pow(x)
                return eff
            },
            unlocked(){return hasUpgrade("s",12)},
            style() { return { 'background-color': this.canAfford()?"yellow":"#BF8F8F", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:yellow;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a
            },
        },
        31:{
            title: "转生武器",
            cost(x) {
                let a = two.pow(x)
                return a
            },
            display() { return "重置你击败过的蛇和可购买,花费所有的金币进行转生<br>当前转生效果: 伤害x"+format(this.effect())+"<br>转生后转生效果: 伤害x"+format(this.Peffect())+"<br>转生需求: "+format(this.cost())+"金币"},
            canAfford() { return player.s.coins.gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer, this.id, this.prestige())
                player.s.coins = player.s.points = player.s.buyables[11] = player.s.buyables[12] = player.s.buyables[21] = zero   
                player.s.snake = []
                player.s.page = 1
                player.s.hp = tmp.s.snakes[player.s.page].hp
            },
            effect(x){
                let eff = x.add(1).pow(2)
                if(hasUpgrade("s",21)) eff = n(eff.mul("e500").log("e500")).pow(eff).min("5e590")
                return eff
            },
            Peffect(){
                let eff = this.prestige().add(1).pow(2)
                if(hasUpgrade("s",21)) eff = n(eff.mul("e500").log("e500")).pow(eff).min("5e590")
                return eff
            },
            prestige(){
                return player.s.coins.max(2).log(2)
            },
            unlocked(){return hasUpgrade("s",13)},
            style() { return { 'background-color': this.canAfford()?"cyan":"#BF8F8F", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
        },
        32:{
            title: "无效果转生",
            cost(x) {
                return x
            },
            display() { return "进行一次无效果转生"},
            canAfford() { return true},
            buy() {
                player.s.coins = player.s.points = player.s.buyables[11] = player.s.buyables[12] = player.s.buyables[21] = zero   
                player.s.snake = []
                player.s.page = 1
                player.s.hp = tmp.s.snakes[player.s.page].hp
            },
            effect(x){
                return x
            },
            unlocked(){return hasUpgrade("s",13)},
            style() { return { 'background-color': this.canAfford()?"cyan":"#BF8F8F", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
        },
    },
    clickables:{
        11:{
            title: "上一蛇",
            display(){return "切换到上个编号的蛇"},
            canClick(){return !(player.s.page==1)},
            onClick() {          
                player.s.page -= 1
                player.s.hp = tmp.s.snakes[player.s.page].hp
                player.s.ftimes = 0
                player.s.rebirth = 1
            },
            style() {return {'background-color':this.canClick()?"#88FF88":"#bf8f8f",'border-radius': "0px", height: "120px", width: "120x" } },
        },
        12:{
            title: "下一蛇",
            display(){return "切换到下个编号的蛇,需击败过这个编号的蛇"},
            canClick(){return hasFsnake(player.s.page)&&!(player.s.page==25)},
            onClick() {          
                player.s.page += 1
                player.s.hp = tmp.s.snakes[player.s.page].hp
                player.s.ftimes = 0
                player.s.rebirth = 1
            },
            style() {return {'background-color':this.canClick()?"#88FF88":"#bf8f8f",'border-radius': "0px", height: "120px", width: "120x" } },
        },
        21:{
            title(){return "对 "+tmp.s.snakes[player.s.page].name+" 发动攻击"},
            display(){return "你的伤害为: <h2>"+format(this.atk())+"</h2><br>你可以对其造成 <h2>"+format(this.atkR())+"</h2> 点伤害"},
            canClick(){
                let a = tmp.s.snakes[player.s.page].oth.includes(4)?player.s.ftimes<10:true
                return player.s.waiting==0&&a},
            onClick() {
                let a = tmp.s.snakes[player.s.page].oth
                player.s.hp = player.s.hp.sub(this.atkR()).max(0)
                player.s.ftimes += 1
                if(a.includes(2)) player.s.waiting += 2
                if(a.includes(8)&&player.s.rebirth>0&&player.s.hp.eq(0)){
                    player.s.rebirth -= 1
                    player.s.hp = tmp.s.snakes[player.s.page].hp
                    return
                } 
                deadSnake()
                player.s.rebirth = 1
            },
            atk(){
                let atk = one
                if(getBuyableAmount("s",11).gte(1)) atk = atk.add(buyableEffect("s",11))
                if(getBuyableAmount("s",12).gte(1)) atk = atk.add(buyableEffect("s",12))

                if(getBuyableAmount("s",21).gte(1)) atk = atk.mul(buyableEffect("s",21))
                if(hasUpgrade("s",13)) atk = atk.mul(buyableEffect("s",31))
                if(hasUpgrade("s",11)) atk = atk.mul(upgradeEffect("s",11))
                if(hasUpgrade("s",12)) atk = atk.mul(upgradeEffect("s",12))
                return atk
            },
            atkR(){
                let atk = this.atk().sub(tmp.s.snakes[player.s.page].def).max(0)
                let a = tmp.s.snakes[player.s.page].oth
                if(a.includes(6)) atk = atk.root(2)
                if(a.includes(1)) atk = atk.div(2)
                return atk
            },
            style() {return {'background-color':this.canClick()?"red":"#bf8f8f",'border-radius': "0px", height: "120px", width: "360px" } },
        },
    },
    snakes:{
        1:{
            name:"小蛇",
            hp(){return n(5)},
            def(){return n(0)},
            coins(){return one},
            oth: [],
        },
        2:{
            name:"阴暗蛇",
            hp(){return n(10)},
            def(){return n(0)},
            coins(){return five},
            oth: [1],
        },
        3:{
            name:"荆棘蛇",
            hp(){return n(15)},
            def(){return n(5)},
            coins(){return n(30)},
            oth: [2],
        },
        4:{
            name:"铁甲小蛇",
            hp(){return n(5)},
            def(){return n(25)},
            coins(){return n(50)},
            oth: [],
        },
        5:{
            name:"修复蛇",
            hp(){return n(500)},
            def(){return n(0)},
            coins(){return n(2e2)},
            oth: [3],
        },
        6:{
            name:"反甲蛇",
            hp(){return n(200)},
            def(){return n(30)},
            coins(){return n(5e2)},
            oth: [2],
        },
        7:{
            name:"控制蛇",
            hp(){return n(500)},
            def(){return n(14)},
            coins(){return n(3e3)},
            oth: [4],
        },
        8:{
            name:"黑暗蛇",
            hp(){return n(2000)},
            def(){return n(300)},
            coins(){return n(1e4)},
            oth: [1],
        },
        9:{
            name:"法师蛇",
            hp(){return n(3600)},
            def(){return n(100)},
            coins(){return n(5e4)},
            oth: [3,4],
        },
        10:{
            name:"精英小蛇",
            hp(){return n(32767)},
            def(){return n(1024)},
            coins(){return n(3e5)},
            oth: [],
        },
        11:{
            name:"叠甲蛇",
            hp(){return n(1e4)},
            def(){
                let def = two.pow(player.s.ftimes).mul(10)
                return def},
            coins(){return n(2e5)},
            oth: [5],
        },
        12:{
            name:"毒液蛇",
            hp(){return n(2e4)},
            def(){return n(100)},
            coins(){return n(5e5)},
            oth: [1,2],
        },
        13:{
            name:"中蛇",
            hp(){return n(1e5)},
            def(){return n(0)},
            coins(){return n(2e6)},
            oth: [],
        },
        14:{
            name:"黑皮蛇",
            hp(){return n(1e5)},
            def(){return n(100)},
            coins(){return n(8e6)},
            oth: [1],
        },
        15:{
            name:"阵法蛇",
            hp(){return n(2e4)},
            def(){return n(300)},
            coins(){return n(1e8)},
            oth: [2,3],
        },
        16:{
            name:"黑血蛇",
            hp(){return n(1e8)},
            def(){return n(0)},
            coins(){return n(1e9-1)},
            oth: [1],
        },
        17:{
            name:"叠法蛇",
            hp(){return n(66666666)},
            def(){
                let def = two.pow(player.s.ftimes)
                return def},
            coins(){return n(5e9)},
            oth: [2,3,5],
        },
        18:{
            name:"酸液蛇",
            hp(){return n(55555)},
            def(){return n(0)},
            coins(){return n(5e10)},
            oth: [4,6],
        },
        19:{
            name:"机关蛇",
            hp(){return n(233333333)},
            def(){return n(0)},
            coins(){return n(5e11)},
            oth: [2,3,4],
        },
        20:{
            name:"buff小蛇",
            hp(){return n(16384)},
            def(){
                let def = two.pow(player.s.ftimes).mul(4000)
                return def},
            coins(){return n(5e12)},
            oth: [1,2,3,4,5,6],
        },
        21:{
            name:"红温蛇",
            hp(){
                let hp = two.pow(player.s.ftimes).mul(1e6)
                return hp},
            def(){return n(0)},
            coins(){return n(1e15)},
            oth: [3,6,7],
        },
        22:{
            name:"复活蛇",
            hp(){
                let hp = two.pow(player.s.ftimes).mul(4e15)
                return hp},
            def(){return n(1000)},
            coins(){return n(1e20)},
            oth: [7,8],
        },
        23:{
            name:"无敌蛇",
            hp(){return n(1)},
            def(){return (getBuyableAmount("s",11).add(getBuyableAmount("s",12)).add(getBuyableAmount("s",21)).gt(0))?two.pow(1024):zero},
            coins(){return n(1e50)},
            oth: [9],
        },
        24:{
            name:"大蛇",
            hp(){return n(1e130)},
            def(){return n(0)},
            coins(){return n(1e150)},
            oth: [],
        },
        25:{
            name:"无限蛇",
            hp(){
                let hp = two.pow(player.s.ftimes).mul(1.79e308)
                return hp},
            def(){
                let def = two.pow(player.s.ftimes)
                return (getBuyableAmount("s",11).add(getBuyableAmount("s",12)).add(getBuyableAmount("s",21)).gt(0))?two.pow(1024):def},
            coins(){return n(1e308)},
            oth: [1,2,3,4,5,6,7,8,9],
        },
    },
    bars:{
        hp:{
            direction: RIGHT,
            width: 600,
            height: 40,
            fillStyle: {'background-color' : "red"},
            progress() {return this.req()},
            req(){
                return player.s.hp.div(tmp.s.snakes[player.s.page].hp)
            },
            display(){return tmp.s.snakes[player.s.page].name+"-编号:"+player.s.page+" 血量: "+format(player.s.hp)+" /"+format(tmp.s.snakes[player.s.page].hp,0)+" 防御: "+format(tmp.s.snakes[player.s.page].def)+" 金币: "+format(tmp.s.snakes[player.s.page].coins,0)}
        },
    },
    infoboxes:{
        snake:{
            title: "剧情",
            body() {return `在进行时空穿越的过程中,春节越来越近<br>
                        但...你发现了一群蛇???<br>
                        它们挡住了你通往春节的道路<br>
                        有些蛇还摆出loop的样子,甚至还有Infinity的样子,<br>
                        看来你不得不使用一些暴力手段了...<br>
                        本层内容:把挡路蛇赶走,前往春节!
                `},
            unlocked(){return true},
        },
    },
    update(diff){
        if(player.s.waiting>diff) player.s.waiting -= diff
        else player.s.waiting = 0
        if(tmp.s.snakes[player.s.page].oth.includes(3)) player.s.hp = player.s.hp.add(tmp.s.snakes[player.s.page].hp.mul(0.1*diff)).min(tmp.s.snakes[player.s.page].hp)
    },
    microtabs:{
        main:{
            "Infobox":{
                buttonStyle: {
                    "border-color": "#88ff88"
                },
                content:[
                    ["infobox","snake"]
                ],
            },
            "Fight":{
                buttonStyle: {
                    "border-color": "red"
                },
                content:[
                    "blank",["bar","hp"],["display-text",function(){
                        let oths = "";let a = tmp.s.snakes[player.s.page].oth
                        if(a.length==0) oths += "无"
                        if(a.includes(1)) oths += "<br>潜伏: 你对其造成的伤害减半"
                        if(a.includes(2)) oths += "<br>荆棘: 你每对其造成一次伤害,你无法攻击 2s"
                        if(a.includes(3)) oths += "<br>恢复: 每秒恢复血量上限的 10% 的血量"
                        if(a.includes(4)) oths += "<br>控制: 你只能对其造成 10 次伤害"
                        if(a.includes(5)) oths += "<br>叠甲: 你每对其造成一次伤害,其防御翻倍"
                        if(a.includes(6)) oths += "<br>酸液: 你对其造成的伤害被算术平方根"
                        if(a.includes(7)) oths += "<br>红温: 你每对其造成一次伤害,其血量上限翻倍"
                        if(a.includes(8)) oths += "<br>复活: 其 hp=0 时,复活一次"
                        if(a.includes(9)) oths += "<br>无敌: 当购买过任意强化武器的 可购买 时,其防御力变为2^1024"
                        return "被动: "+oths
                    }],"blank",["clickable",21],"blank",["clickables",[1]],"blank",["display-text",function(){
                        return "当你第一次击败一个新编号的蛇时<br>你会获得 1 蛇,同时获得等同于 蛇的编号*掉落金币 数量的 金币"
                    }],
                ],
            },
            "Buyables":{
                buttonStyle: {
                    "border-color": "yellow"
                },
                content:[
                    ["row",[["buyable",11],["buyable",12]]],["buyable",21]
                    ,"blank",["row",[["buyable",31],["buyable",32]]]
                ],
            },
            "Upgrades":{
                buttonStyle: {
                    "border-color": "cyan"
                },
                content:[
                    "upgrades"
                ],
            },
        },
    },
    tabFormat:{
        "Main": {   
            content: [
                "main-display",["display-text",function(){
                    return "你有 <h2 style='color:yellow;text-shadow:0px 0px 10px;'>"+format(player.s.coins)+"</h2> 金币"
                }],
                ["microtabs","main"]
            ],
            unlocked(){return true},
        },
    },
})
addLayer("y", {
    name: "y", 
    symbol: "年",
    position: 1, 
    branches: ["t"],
    startData(){ return {
        unlocked: false,
		points: zero,
        foints: zero,
    }},
    color: "pink",
    requires: new Decimal(1e22), 
    resource: "年味", 
    baseResource: "时间",
    baseAmount(){return player.t.points}, 
    type: "normal",
    exponent: 0.2,
    gainMult(){ 
        mult = one
        if(getBuyableAmount("y",12).gte(1)) mult = mult.mul(buyableEffect("y",12))
        if(hasChallenge("y",12)) mult = mult.mul(challengeEffect("y",12))
        if(hasChallenge("y",21)) mult = mult.mul(challengeEffect("y",21))
        return mult
    },
    gainExp(){ 
        exp = one
        return exp
    },
    row: 1,
    hotkeys:[
        {key: "y", description: "Y: 进行年味重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("s",22)||player.y.unlocked},
    upgrades:{
        11:{
            title: "清蒸鱼",
            description: "春节点获取基于最大烹饪点倍增",
            cost: new Decimal(1),
            effect(){
                let eff = ten.pow(layers.y.fMax())
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.y.unlocked},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",                        
        },
        12:{
            title: "白灼虾",
            description: "初始解锁时空穿越",
            cost: new Decimal(1),
            unlocked(){return player.y.unlocked},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",            
        },
        13:{
            title: "白切鸡",
            description: "时间加速对时空稳定性的影响再次降低",
            cost: new Decimal(1),
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            unlocked(){return player.y.unlocked},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",            
        },
        14:{
            title: "珍珠藕圆",
            description: "单次增加倍率与时间速度上限基于最大烹饪点倍增",
            cost: new Decimal(1),
            effect(){
                let eff = two.pow(layers.y.fMax().div(2))
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.y.unlocked},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",            
        },
        15:{
            title: "烙饼",
            description: "时间获取基于时间倍增",
            cost: new Decimal(1),
            effect(){
                let eff = player.t.points.max(2).log(2)
                eff = powsoftcap(eff,n(20),n(1.1))
                if(hasUpgrade("y",25)) eff = eff.pow(upgradeEffect("y",25))
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.y.unlocked},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",            
        },
        21:{
            title: "红烧鱼",
            description: "时间获取基于春节点倍增",
            cost: new Decimal(1),
            canAfford(){return hasUpgrade("y",this.id-10)},
            effect(){
                let eff = player.points.max(10).log(10)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("y",33)},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",            
        },
        22:{
            title: "油焖大虾",
            description: "移除 小雨 和 秋分 的效果上限,基于剩余穿越能量倍增时间获取",
            cost: new Decimal(1),
            canAfford(){return hasUpgrade("y",this.id-10)},
            effect(){
                let eff = two.pow(player.t.energy)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("y",33)},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",  
        },
        23:{
            title: "小鸡炖蘑菇",
            description: "时间加速不再影响时空稳定性",
            cost: new Decimal(1),
            canAfford(){return hasUpgrade("y",this.id-10)},
            unlocked(){return hasUpgrade("y",33)},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",  
        },
        24:{
            title: "四喜丸子",
            description: "当时间速度低于 寒露 的效果时,寒露 的效果生效",
            cost: new Decimal(1),
            canAfford(){return hasUpgrade("y",this.id-10)},
            unlocked(){return hasUpgrade("y",33)},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",  
        },
        25:{
            title: "饺子",
            description: "基于最大烹饪点强化 烙饼 的效果",
            cost: new Decimal(1),
            canAfford(){return hasUpgrade("y",this.id-10)},
            effect(){
                let eff = layers.y.fMax().max(1).root(3)
                return eff
            },
            effectDisplay(){return "^"+format(this.effect())},
            unlocked(){return hasUpgrade("y",33)},
            currencyDisplayName:"烹饪点",
            currencyInternalName:"foints",
            currencyLayer:"y",  
        },
        31:{
            title: "学习菜谱I",
            description: "最大烹饪点 +2",
            cost: new Decimal(1),
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return player.y.unlocked},
        },
        32:{
            title: "学习菜谱II",
            description: "最大烹饪点 +2",
            cost: new Decimal(3),
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("y",31)},
        },
        33:{
            title: "学习菜谱III",
            description: "最大烹饪点 +2,解锁第二行进阶菜谱(制作需先制作第一行的对应菜谱)",
            cost: new Decimal(5),
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("y",32)},
        },
        34:{
            title: "学习菜谱IV",
            description: "最大烹饪点 +2",
            cost: new Decimal(100),
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("y",33)},
        },
        35:{
            title: "学习菜谱V",
            description: "最大烹饪点 +2,解锁'年'层的 物品 部分",
            cost: new Decimal(666),
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("y",34)},
        },
        41:{
            title: "贴春联",
            description: "春联 的购买上限 +5,自动购买时间层的所有升级",
            cost: new Decimal(1e16),
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return true},
        },
        42:{
            title: "包红包",
            description: "红包 的购买上限 +5,年味重置时不再重置时空穿越的有关内容",
            cost: new Decimal(3e17),
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return true},
        },
        43:{
            title: "点爆竹",
            description: "爆竹 的购买上限 +5",
            cost: new Decimal(5e19),
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return true},
            onPurchase(){
                confirm("爆竹声: bengbengbeng...                                                                       一碎岁岁零衣一壹岁天同衣岁新一桃用岁岁前一贰一岁转一十一")
            },
        },
        44:{
            title: "放烟花",
            description: "烟花 的购买上限 +5,解锁'年'层的 活动 部分",
            cost: new Decimal(5e20),
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return true},
            onPurchase(){
                confirm("烟花声: chua~fuuuuuuuuuuuuuu!abonggggggg!")
            },
        },
    },
    buyables:{
        11:{
            title: "春联",
            cost(x) {
                let a = ten.pow(x.add(1))
                return a
            },
            display() { return "每秒自动获取重置可获取的时间<br>(从 1% 开始,之后每级x10)<br>价格: " + format(this.cost()) + "年味<br>效果: +"+format(this.effect().mul(100))+"%<br>购买上限: "+format(this.purchaseLimit(),0)},
            canAfford() { return player.y.points.gte(this.cost())},
            buy() {
                player.y.points = player.y.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                if(x.eq(0)) return zero
                if(x.eq(2)) return n(0.1) //傻逼b_e.js把10的-1次方算成1了,傻逼
                let eff = ten.pow(x.sub(3))
                return eff
            },
            purchaseLimit(){
                let max = eight
                if(hasUpgrade("y",41)) max = max.add(upgradeEffect("y",41))
                return max
            },
            unlocked(){return true},
            style() { 
                let color = "red"
                if(!this.canAfford()) color = "#BF8F8F"
                if(getBuyableAmount(this.layer,this.id).gte(this.purchaseLimit())) color = "#77BF5F"
                return {'background-color': color, filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:red;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a
            },
        },
        12:{
            title: "红包",
            cost(x) {
                let a = five.pow(x.add(1)).mul(100)
                return a
            },
            display() { return "双倍年味获取<br>价格: " + format(this.cost()) + "年味<br>效果: x"+format(this.effect())+"<br>购买上限: "+format(this.purchaseLimit(),0)},
            canAfford() { return player.y.points.gte(this.cost())},
            buy() {
                player.y.points = player.y.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = two.pow(x)
                return eff
            },
            purchaseLimit(){
                let max = n(16)
                if(hasUpgrade("y",42)) max = max.add(upgradeEffect("y",42))
                return max
            },
            unlocked(){return true},
            style() { 
                let color = "red"
                if(!this.canAfford()) color = "#BF8F8F"
                if(getBuyableAmount(this.layer,this.id).gte(this.purchaseLimit())) color = "#77BF5F"
                return {'background-color': color, filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:red;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a
            },
        },
        21:{
            title: "爆竹",
            cost(x) {
                let a = three.pow(x).mul(3000)
                return a
            },
            display() { return "十倍时间获取<br>价格: " + format(this.cost()) + "年味<br>效果: x"+format(this.effect())+"<br>购买上限: "+format(this.purchaseLimit(),0)},
            canAfford() { return player.y.points.gte(this.cost())},
            buy() {
                player.y.points = player.y.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = ten.pow(x)
                return eff
            },
            purchaseLimit(){
                let max = n(20)
                if(hasUpgrade("y",43)) max = max.add(upgradeEffect("y",43))
                return max
            },
            unlocked(){return true},
            style() { 
                let color = "red"
                if(!this.canAfford()) color = "#BF8F8F"
                if(getBuyableAmount(this.layer,this.id).gte(this.purchaseLimit())) color = "#77BF5F"
                return {'background-color': color, filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:red;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a
            },
        },
        22:{
            title: "烟花",
            cost(x) {
                let a = five.pow(x.add(1)).mul(10000)
                return a
            },
            display() { return "额外获得 2 烹饪点<br>价格: " + format(this.cost()) + "年味<br>效果: +"+format(this.effect())+"<br>购买上限: "+format(this.purchaseLimit(),0)},
            canAfford() { return player.y.points.gte(this.cost())},
            buy() {
                player.y.points = player.y.points.sub(this.cost())
                player.y.foints = player.y.foints.add(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = two.mul(x)
                return eff
            },
            purchaseLimit(){
                let max = n(10)
                if(hasUpgrade("y",44)) max = max.add(upgradeEffect("y",44))
                return max
            },
            unlocked(){return true},
            style() { 
                let color = "red"
                if(!this.canAfford()) color = "#BF8F8F"
                if(getBuyableAmount(this.layer,this.id).gte(this.purchaseLimit())) color = "#77BF5F"
                return {'background-color': color, filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:red;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a
            },
        },
    },
    clickables:{
        11:{
            title: "烹饪~",
            display(){return "刷新已花费的烹饪点<br>进行一次无奖励的年味重置"},
            canClick(){return hasUpgrade("y",31)&&hasUpgrade("s",22)},
            onClick() {          
                quickUpgBuyorSell("y",quickSpawnConst(2,5),false)
                player.y.foints = layers.y.fMax()
                layerDataReset("t",[]);player.points = zero
            },
            style() {return {'background-color':this.canClick()?"orange":"#bf8f8f",'border-radius': "0px", height: "120px", width: "240px" } },
        },
    },
    challenges:{
        11:{
            name: "散步",
            challengeDescription(){return "进入活动<br>在活动中,春节点,时间获取^0.5<br>小雨 和 秋分 的效果上限回归<br>重置穿越时间部分的内容"},
            canComplete() {return player.t.points.gte(1e45)},
            goalDescription: "1e45 时间",
            rewardDescription(){return "解锁下个活动,基于年味倍增时间获取<br>当前: x"+format(this.rewardEffect())},
            onEnter() {
                layerDataReset("t",[])
            },
            rewardEffect(){
                let eff = player.y.points.root(player.y.points.max(1).log(1e20).add(4)).max(1)
                return eff
            },
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "292px", width: "292px"}},
            unlocked(){return true},
        },
        12:{
            name: "看戏",
            challengeDescription(){return "进入活动<br>在活动中,'散步'的效果同时生效,时间获取再^0.2"},
            canComplete() {return player.t.points.gte(2.5e18)},
            goalDescription: "2.5e18 时间",
            rewardDescription(){return "解锁下个活动,基于时间倍增年味获取<br>当前: x"+format(this.rewardEffect())},
            onEnter() {
                layerDataReset("t",[])
            },
            rewardEffect(){
                let eff = player.t.points.root(player.t.points.max(1).log(1e20).add(20)).max(1)
                return eff
            },
            countsAs:[11],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "292px", width: "292px"}},
            unlocked(){return hasChallenge("y",11)},
        },
        21:{
            name: "看春晚",
            challengeDescription(){return "进入活动<br>在活动中,'散步','看戏'的效果同时生效,同时,春节点获取^0"},
            canComplete() {return player.t.points.gte(2.5e18)},
            goalDescription: "2.5e18 时间",
            rewardDescription(){return "解锁下个活动,基于春节点倍增年味获取<br>当前: x"+format(this.rewardEffect())},
            onEnter() {
                layerDataReset("t",[])
            },
            rewardEffect(){
                let eff = player.points.root(player.points.max(1).log(1e20).add(10)).max(1)
                return eff
            },
            countsAs:[11,12],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "292px", width: "292px"}},
            unlocked(){return hasChallenge("y",12)},
        },
        22:{
            name: "串门",
            challengeDescription(){return "进入活动<br>在活动中,'散步','看春晚'的效果同时生效,时间获取/1e43"},
            canComplete() {return player.t.points.gte(1e24)},
            goalDescription: "1e24 时间",
            rewardDescription(){return "解锁新的层级"},
            onEnter() {
                layerDataReset("t",[])
            },
            countsAs:[11,21],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "292px", width: "292px"}},
            unlocked(){return hasChallenge("y",21)},
        },
    },
    infoboxes:{
        year:{
            title: "剧情",
            body() {return `你终于击败了这些...蛇?<br>
                        总之,你终于到达了春节,年味真是越来越浓了!<br>
                        参加各种过年的活动吧!<br>
                        玩的开心!<br>
                        本层内容:获得越来越"浓"的年味,过年啦!
                `},
            unlocked(){return true},
        },
    },
    fMax(){
        let max = zero;let ids = [31,32,33,34,35]
        for(id in ids){
            if(hasUpgrade("y",ids[id])) max = max.add(2)
        }
        if(getBuyableAmount("y",22).gte(1)) max = max.add(buyableEffect("y",22)) 
        return max
    },
    update(diff){
        
    },
    microtabs:{
        main:{
            "Infobox":{
                buttonStyle: {
                    "border-color": "pink"
                },
                content:[
                    ["infobox","year"]
                ],
            },
            "Foods":{
                buttonStyle: {
                    "border-color": "orange"
                },
                content:[
                    ["display-text",function(){
                        return "你有 <h2 style='color:orange;text-shadow:0px 0px 10px;'>"+format(player.y.foints,0)+"</h2> /"+format(layers.y.fMax(),0)+" 烹饪点"
                    }],["clickable",11],"blank",["upgrades",[1,2]],["upgrades",[3]]
                ],
                unlocked(){return player.t.unlocked},
            },
            "Items":{
                buttonStyle: {
                    "border-color": "red"
                },
                content:[
                    "blank",
                    ["row",[["buyable",11],["buyable",12]]],
                    ["row",[["buyable",21],["buyable",22]]],
                    "blank",,["upgrades",[4]]
                ],
                unlocked(){return hasUpgrade("y",35)},
            },
            "Activities":{
                buttonStyle: {
                    "border-color": "#88ffff"
                },
                content:[
                    "challenges"
                ],
                unlocked(){return hasUpgrade("y",44)},
            },
        },
    },
    tabFormat:{
        "Main": {   
            content: [
                "main-display","prestige-button","resource-display",
                ["microtabs","main"]
            ],
            unlocked(){return true},
        },
    },
})
addLayer("q", {
    name: "q", 
    symbol: "快",
    position: 0, 
    branches: ["s","y"],
    startData(){ return {
        unlocked: true,
		points: zero,
        unl: false,
        time: zero,
        Ftime: n(1.2e308),
        jump: false,
    }},
    color: "yellow", 
    resource: "快速通关", 
    type: "none",
    gainMult(){ 
        mult = one
        return mult
    },
    gainExp(){ 
        exp = one
        return exp
    },
    row: 2,
    layerShown(){return hasChallenge("y",22)||player.q.unl},
    challenges:{
        11:{
            name: "开始速通游戏",
            challengeDescription(){return "进入速通<br>在速通中,花费的时间将被记录<br>同时,当没有购买完蛇层的第五个升级时,无法刷新烹饪<br>(注:玩到这已经算通关了,如果你没有这方面的兴趣,你无需进行速通)<br>(附:你其实可以边打蛇边刷时间)<br>已花费时间: "+formatTime(player.q.time)},
            canComplete() {return hasChallenge("y",22)},
            goalDescription: "完成'串门'",
            rewardDescription(){
                let ttext = player.q.time.lt(1e308)?formatTime(player.q.Ftime):"未通过"
                return "通关游戏,解锁最后的层级<br>你的成绩为: " + ttext},
            onEnter() {
                player.q.unl = true;player.s.snake = []
                layerDataReset("t",[]);layerDataReset("s",[]);layerDataReset("y",[]);player.points = zero
            },
            onExit(){
                if(hasChallenge("y",22)) player.q.Ftime = player.q.time
                player.q.time = zero
            },
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "352px", width: "352px"}},
            unlocked(){return true},
        },
    },
    clickables:{
        11:{
            title: "跳过",
            display(){return "跳过速通,通关游戏"},
            canClick(){return !player.q.jump},
            onClick() {          
                player.q.jump = true
            },
            style() {return {'background-color':this.canClick()?"orange":"#bf8f8f",'border-radius': "0px", height: "120px", width: "120px" } },
        },
    },
    infoboxes:{
        speed:{
            title: "剧情",
            body() {return `春节已经过去...<br>
                        时间过的越来越快了,你开始回忆你过年的过往<br>
                        记忆如潮水般涌来,又滚去<br>
                        不知不觉间,你仿佛又过了一次年...<br>
                        本层内容:重温以前的内容,速通游戏!
                `},
            unlocked(){return true},
        },
    },
    update(diff){
        if(inChallenge("q",11)) player.q.time = player.q.time.add(diff)
    },
    microtabs:{
        main:{
            "Infobox":{
                buttonStyle: {
                    "border-color": "yellow"
                },
                content:[
                    ["infobox","speed"]
                ],
            },
            "Speedrun!":{
                buttonStyle: {
                    "border-color": "purple"
                },
                content:[
                    ["challenge",11]
                ],
                unlocked(){return true},
            },
            "jump?":{
                buttonStyle: {
                    "border-color": "red"
                },
                content:[
                    ["clickable",11]
                ],
                unlocked(){return true},
            },
        },
    },
    tabFormat:{
        "Main": {   
            content: [
                ["microtabs","main"]
            ],
            unlocked(){return true},
        },
    },
})
addLayer("h", {
    name: "h", 
    symbol: "乐",
    position: 0, 
    branches: ["q"],
    startData(){ return {
        unlocked: true,
		points: zero,
    }},
    color: "orange", 
    resource: "乐炸了", 
    type: "none",
    gainMult(){ 
        mult = one
        return mult
    },
    gainExp(){ 
        exp = one
        return exp
    },
    row: 3,
    layerShown(){return hasChallenge("q",11)||player.q.jump},
    infoboxes:{
        final:{
            title: "结尾",
            body() {return `恭喜通关!<br>
                        感谢你的游玩...<br>
                        总之,祝你春节快乐!<br>
                        本层内容:无?
                `},
            unlocked(){return true},
        },
        puzzle:{
            title: "符号科目谜",
            body() {return `稳定是0,春分是1<br>
                            快乐是语文,众数是数学,计算是英语<br>
                节气: 2~4 + 6~7 + 9~11 + 13~14<br>
                状态: 平静 * 扰动 * 震动<br> 
                计算: 单独 / 部分<br>
                版本: - 春节快乐<br>
                被动: id = 8,hp = ?<br>
                群号: 非众数 ^ 2 - 7<br>
                期末考的怎么样,想知道就 导入 密码!`},
            unlocked(){return true},
        },
    },
    milestones:{
        0: {
            requirementDescription: "1m 内完成速通",
            effectDescription(){return hasMilestone("h",0)?"你个肮脏的黑客":"???"},//看这段代码的人 你也是肮脏的黑客qwq
            done(){return player.q.Ftime.lte(60)},
            unlocked(){return true},
        },
        1: {
            requirementDescription: "1h 内完成速通",
            effectDescription(){return hasMilestone("h",1)?"恭喜,你在1h内完成了游戏,但作者本人认为 1h 实际上可能并不太行<br>既然你已经到了这里,恭喜你!你要的东西在下面那个里程碑":"???"},
            done(){return player.q.Ftime.lte(3600)},
            unlocked(){return true},
        },
        2: {
            requirementDescription: "1h 11min 22.71s 内完成速通",
            effectDescription(){return hasMilestone("h",2)?"恭喜,你超越了游戏作者!实际上,对作者来说,这是一个充满失误的速通,也许可以将成绩压到 1h 以内<br>既然你到了这里,我将把这段线索给你:<br>祝贺的是 26149;自负的是 25105":"???"},//不要偷看!自己去速通
            done(){return player.q.Ftime.lte(4288.71)},
            unlocked(){return true},
        },
        3: {
            requirementDescription: "1h 20min 内完成速通",
            effectDescription(){return hasMilestone("h",3)?"你做到了,这是一个相当不错的成绩了! 你是否执着于速通呢,给你个提示吧,你要的东西,在上一个里程碑":"???"},
            done(){return player.q.Ftime.lte(4800)},
            unlocked(){return true},
        },
        4: {
            requirementDescription: "1h 30min 内完成速通",
            effectDescription(){return hasMilestone("h",4)?"恭喜你, 你在 1h 30min 内完成了速通,你要试试更进一步吗?":"???"},
            done(){return player.q.Ftime.lte(5400)},
            unlocked(){return true},
        },
        5: {
            requirementDescription: "1h 40min 内完成速通",
            effectDescription(){return hasMilestone("h",5)?"恭喜你, 你在 1h 40min 内完成了速通,试试更进一步吧!":"???"},
            done(){return player.q.Ftime.lte(6000)},
            unlocked(){return true},
        },
        6: {
            requirementDescription: "1h 50min 内完成速通",
            effectDescription(){return hasMilestone("h",6)?"恭喜你, 你在 1h 50min 内完成了速通,也许你应该试试再向前一步":"???"},
            done(){return player.q.Ftime.lte(6600)},
            unlocked(){return true},
        },
        7: {
            requirementDescription: "2h 内完成速通",
            effectDescription(){return hasMilestone("h",7)?"如果你是手机玩家, 取得了这个成绩, 我为你感到骄傲,手机端难度很大,你不必继续前进了<br>如果你是电脑端玩家,你还可以更快的,加油!":"???"},
            done(){return player.q.Ftime.lte(7200)},
            unlocked(){return true},
        },
        8: {
            requirementDescription: "2h 20min 内完成速通",
            effectDescription(){return hasMilestone("h",8)?"加油吧, 这个成绩已经有点...你应该再尝试一次...<br>如果你是手机端玩家,不必在意上面的话,你已经很不错了!":"???"},
            done(){return player.q.Ftime.lte(8400)},
            unlocked(){return true},
        },
        9: {
            requirementDescription: "2h 40min 内完成速通",
            effectDescription(){return hasMilestone("h",9)?"...你的速通看起来不能称之为'速通'了,希望你能更进一步<br>如果你是手机端玩家,不必在意上面的话,多多尝试更进一步吧!":"???"},
            done(){return player.q.Ftime.lte(9600)},
            unlocked(){return true},
        },
        10: {
            requirementDescription: "3h 内完成速通",
            effectDescription(){return hasMilestone("h",10)?"给手机端玩家特别写的话: 非常感谢你们游玩速通, 手机端的速通难度很大, 不过可以试试压到 2h! 祝你们春节快乐!":"???"},
            done(){return player.q.Ftime.lte(10800)},
            unlocked(){return true},
        },
        11: {
            requirementDescription: "1d 内完成速通",//肮脏的黑客,不许偷看!
            effectDescription(){return hasMilestone("h",11)?"祝贺你完成了速通,我将给你一段线索,这条线索与阶段三与阶段四的解谜有关:<br>春风啊,你将你的 苏屠岁 屠屠屠 屠屠苏 岁苏苏 苏岁苏 苏岁屠 苏岁屠 屠岁岁 岁屠苏 岁岁屠 送给了我,让我感受到了温暖,让我拥有了生活的希望<br>人啊,一天天地长大,一岁岁地变老,又有谁注意的到------美好的春风呢?":"???"},
            done(){return player.q.Ftime.lte(86400)},
            unlocked(){return true},
        },
    },
    microtabs:{
        main:{
            "Infobox":{
                buttonStyle: {
                    "border-color": "orange"
                },
                content:[
                    ["infobox","final"]
                ],
            },
            "Final":{
                buttonStyle: {
                    "border-color": "cyan"
                },
                content:[
                    "milestones"
                ],
                unlocked(){return true},
            },
            "Puzzle?":{
                buttonStyle: {
                    "border-color": "gray"
                },
                content:[
                    ["infobox","puzzle"]
                ],
                unlocked(){return true},
            },
        },
    },
    tabFormat:{
        "Main": {   
            content: [
                ["microtabs","main"]
            ],
            unlocked(){return true},
        },
    },
})

//获得击败蛇 #春节树特供
function hasFsnake(id){
    return player.s.snake.includes(id)
}
//蛇死亡读取函数 #春节树特供
function deadSnake(){
    if(player.s.hp.lte(0)){
        player.s.ftimes = 0
        if(!hasFsnake(player.s.page)){
            player.s.snake.push(player.s.page);player.s.points = player.s.points.add(1)
            player.s.coins = player.s.coins.add(tmp.s.snakes[player.s.page].coins.mul(player.s.page))
        }
        else player.s.coins = player.s.coins.add(tmp.s.snakes[player.s.page].coins)
        player.s.hp = tmp.s.snakes[player.s.page].hp
    }
}

var three_thousand_eight_hundred_and_sixty_four = new Decimal(3864)//Liue308特供版
var thirty_eight_million_six_hundred_and_forty_two_thousand_one_hundred_and_eighty = new Decimal(38642180)//cutefu~特供版

//快速生成行列数组 #QqQe308提供
function quickSpawnConst(r,c,grid=false) {
    let a=[]
    let x=grid?100:10
    for(i=1;i<=r;i++){
      for(j=1;j<=c;j++) a.push(i*x+j)
    }
    return a
}

//推荐大家玩 QqQe308 制作的春节树
//支持 元素周期增量树 群 喵

//祝大家2025春节快乐,除了你,偷看代码的肮脏黑客