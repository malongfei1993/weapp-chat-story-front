const changeImg = ()=>{

    var imgs = ['https://636c-cloud1-3gbu2vhtc829b325-1318513107.tcb.qcloud.la/fairytale/1.jpg?sign=31b8a936407987fae06fcfe471342d37&t=1686626387', 'https://636c-cloud1-3gbu2vhtc829b325-1318513107.tcb.qcloud.la/fairytale/2.jpg?sign=46bd569f9a0aa7f80b2613123c840218&t=1686626408','https://636c-cloud1-3gbu2vhtc829b325-1318513107.tcb.qcloud.la/fairytale/3.jpg?sign=6af9732cb53e1556b8746cf24c62a07d&t=1686626415','https://636c-cloud1-3gbu2vhtc829b325-1318513107.tcb.qcloud.la/fairytale/4.jpg?sign=a68f36fe21042a6b2e402251c245f7a6&t=1686626423','https://636c-cloud1-3gbu2vhtc829b325-1318513107.tcb.qcloud.la/fairytale/5.jpg?sign=e46d7d7575d6136cd688d02bf99d51a5&t=1686626432','https://636c-cloud1-3gbu2vhtc829b325-1318513107.tcb.qcloud.la/fairytale/6.jpg?sign=ba3bc2ae02b7aa09ad6215c25584193f&t=1686626441','https://636c-cloud1-3gbu2vhtc829b325-1318513107.tcb.qcloud.la/fairytale/7.jpg?sign=d038ace2d24d9b4e751310a8dd48bbf7&t=1686626450']
    var begin = 0
    var end = imgs.length-1
    var num = Math.floor(Math.random()*(end - begin + 1)) + begin;
    return imgs[num]
}


module.exports = {
    changeImg
  }