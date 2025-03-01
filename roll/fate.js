var rollbase = require('./rollbase.js');
var rply = {
    default: 'on',
    type: 'text',
    text: ''
};

gameName = function () {
    return '命運Fate .4df(m|-)(加值)'
}

gameType = function () {
    return 'Fate:hktrpg'
}
prefixs = function () {
    //[mainMSG[0]的prefixs,mainMSG[1]的prefixs,   <---這裡是一對  
    //mainMSG[0]的prefixs,mainMSG[1]的prefixs  ]  <---這裡是一對
    //如前面是 /^1$/ig, 後面是/^1D100$/ig, 即 prefixs 變成 1 1D100 
    ///^(?=.*he)(?!.*da).*$/ig
    return [/^[.]4df(\d+|(m|-)(\d+)|)$/i,]
}
getHelpMessage = function () {
    return "【命運Fate】" + "\
	\n命運骰，又稱胡扯骰，是由兩面「＋」號、兩面「－」號，以及兩面空白▉組成的六面骰\
        \n「＋」號代表＋１，「－」號－１，▉則代表０\
        \n.4df(m|-)(加值) 指令: .4df 如常骰出四粒命運骰\
        \n.4df3  四粒命運骰結果+3  .4dfm4 或.4df-4  四粒命運骰結果-4  "
}
initialize = function () {
    return rply;
}

rollDiceCommand = function (inputStr, mainMsg) {
    rply.text = '';
    switch (true) {
        case /^help$/i.test(mainMsg[1]):
            rply.text = this.getHelpMessage();
            return rply;
        default:
            var match = /^[.]4df(\d+|(m|-)(\d+)|)$/i.exec(mainMsg[0])
            //.4dfm23,m23,m,23
            //＋∎－
            console.log(match)
            var i, random, temp = '';
            var ans = 0

            for (i = 0; i < 4; i++) {
                random = (rollbase.Dice(3) - 2)
                ans += random
                temp += random
                // console.log('ans: ', ans, 'temp: ', temp)
                temp = temp.replace('-1', '－').replace('0', '▉').replace('1', '＋')
            }
            rply.text = 'Fate ' + inputStr.toString().replace(/\r/g, " ").replace(/\n/g, " ") + '\n' + temp + ' = ' + ans

            if (match[2] && (match[2].toLowerCase() == 'm' || match[2].toLowerCase() == '-')) {
                rply.text += ' - ' + match[3] + ' = ' + (Number(ans) - Number(match[3]))
            } else if (match[1])
                rply.text += ' + ' + match[1] + ' = ' + (Number(ans) + Number(match[1]))

            return rply;
    }
}


module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};