// pages/detail/index.js
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
import {
    changeImg
} from '../../utils/img'
Page({
    socket: null,
    /**
     * 页面的初始数据
     */
    data: {
        retry:0,
        params:null,
        overlayShow:false,
        img: '',
        showShare: false,
        options: [{
                name: '微信',
                icon: 'wechat',
                openType: 'share'
            },
            {
                name: '微博',
                icon: 'weibo'
            },
            {
                name: '复制链接',
                icon: 'link'
            },
            {
                name: '分享海报',
                icon: 'poster'
            },
            {
                name: '二维码',
                icon: 'qrcode'
            },
        ],
        title: "test",
        content: "",
        active: -1,
    },

    onLoad(options) {
        this.change()
        var params = options.x
        this.setData({ params: params});
        this.getData(params)
    },
    alertAndRelauch(){
        Dialog.alert({
            message: '同时使用人数过多，请返回页面重新尝试!',
        })
        .then(() => {
            // on confirm
            
            wx.navigateBack()
        })
    },
    async getData(params) {
        
        this.setData({ overlayShow: true});
        const that = this
        // 确认已经在 onLaunch 中调用过 wx.cloud.init 初始化环境（任意环境均可，可以填空）
        const {
            socketTask
        } = await wx.cloud.connectContainer({
            "config": {
                "env": "prod-6gmh5fc74753bd5b"
            },
            "service": "hugchat-stream",
            "path": "/"
        })
        that.socket = socketTask
        that.socket.onMessage(function (res) {
            if(res.data.includes("error")){
                //说明服务器返回报错信息
                console.log(res.data)
                return
            }
            that.setData({ overlayShow: false });
            that.setData({
                content: that.data.content + res.data
            })
          
        })
        that.socket.onOpen(function (res) {
            console.log('成功连接到服务器')
            params = decodeURIComponent(params)
            that.socket.send({
                data: params
            })
        })
        that.socket.onClose(function (res) {
            that.setData({ overlayShow: false });
            console.log('连接已断开')
            console.log(res)
            if(res.code!=1000&&that.data.retry<5){
                //非服务端主动正常断开,再次尝试获取数据
                that.setData({
                    retry:that.data.retry+=1
                })
                console.log(that.data.retry)
                that.getData(that.data.params)
            }
            
            if(that.data.retry>=5&&res.code!=1000){
                //超过次数重新回到首页
                that.alertAndRelauch()
            }
        })
    },
    change() {
        var img = changeImg()

        this.setData({
            img: img
        })
    },
    onClose() {
        this.setData({
            showShare: false
        });
    },

    onSelect(event) {
        Toast(event.detail.name);
        this.onClose();
    },
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({
            active: event.detail
        });
        if (this.data.active == 0) {
            //分享
            this.setData({
                showShare: true
            });
        }
        if (this.data.active == 1) {
            //复制
            Notify('当前无法复制，请稍后再试')
        }
        if (this.data.active == 2) {
            //反馈
            Notify('当前无法反馈，请稍后再试')
        }
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
       
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
       
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})