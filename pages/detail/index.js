// pages/detail/index.js
import Notify from '@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        content: "testtesttesttesttesttesttesttesttesttesttesttesttesttest",
        active: -1,
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
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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