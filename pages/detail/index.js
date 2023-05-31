// pages/detail/index.js
import Notify from '@vant/weapp/notify/notify';
import {
    changeImg
} from '../../utils/img'
Page({
    socket: null,
    /**
     * 页面的初始数据
     */
    data: {
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
        params = decodeURIComponent(params)
        
        this.getData(params)


    },
    getData(params) {

        // 创建 WebSocket 客户端对象
        this.socket = wx.connectSocket({
            url: 'ws://43.135.136.65:8000/',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log('WebSocket 连接成功')

            },

            fail: function (res) {
                console.log(res)
            },

        });
        this.socket.onOpen(() => {
            this.socket.send({
                data:params
            })
        })
        this.socket.onMessage((res) => {
            console.log('从服务器接收到数据:', res.data)

            this.setData({
                content: this.data.content + res.data
            })
        })

        this.socket.onClose((res) => {
            console.log('WebSocket 连接关闭')
        });

        this.socket.onError((res) => {
            console.log('WebSocket 错误:', res.errMsg)
        });
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
        this.socket.close()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        this.socket.close()
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