const changeImg = ()=>{

    var imgs = ['/imgs/1.jpg', '/imgs/2.jpg','/imgs/4.jpg']
    var begin = 0
    var end = imgs.length-1
    var num = Math.floor(Math.random()*(end - begin + 1)) + begin;
    return imgs[num]
}


module.exports = {
    changeImg
  }