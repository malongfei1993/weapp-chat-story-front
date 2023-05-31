import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';
import {
    changeImg
} from '../../utils/img'
Page({
    data: {
        list: ['a', 'b', 'c'],
        result: ['a', 'b'],
        img: '',
        type: '',
        keyword: ''
    },
    onLoad() {
        var img = changeImg()
        this.setData({
            img: img
        })

    },
    reset() {
        this.setData({

            type: '',
            keyword: ''
        })
    },
    fakeLoading(num) {

        const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: "请稍后...还剩" + num + "秒",
            selector: '#custom-selector',
        });

        let second = num;
        const timer = setInterval(() => {
            second--;
            if (second) {
                toast.setData({
                    message: `请稍后...还剩${second}秒`,
                });
            } else {
                clearInterval(timer);
                Toast.clear();
            }
        }, 1000);
    },
    randomNum(begin, end) {
        var num = Math.floor(Math.random() * (end - 2)) + begin;
        return num
    },
    create() {
        var that = this
        var result = {

            type: that.data.type,
            keywords: that.data.keyword
        }
        if (result.type == "") {
            Notify('请输入题材！');
            return;
        }
        if (result.keywords == "") {
            Notify('请输入联想词！');
            return;
        }

        var params = encodeURIComponent(JSON.stringify(result))
        wx.navigateTo({
            url: `/pages/detail/index?x=${params}`
        })
        // var num = this.randomNum(3,4)
        // this.fakeLoading(num)

        // console.log(result)
        // setTimeout(()=>{
        //     wx.navigateTo({url:"/pages/detail/index"})
        // },num*1000)

    },
    onChange(event) {
        this.setData({
            location: event.detail,
        });
    },
    onRoleChange(event) {
        this.setData({
            role: event.detail,
        });
    },
    onTypeChange(event) {
        this.setData({
            type: event.detail,
        });
    },
    onKeyChange(event) {
        this.setData({
            keyword: event.detail,
        });
    },
    toggle(event) {
        const {
            index
        } = event.currentTarget.dataset;
        const checkbox = this.selectComponent(`.checkboxes-${index}`);
        checkbox.toggle();
    },

    noop() {},
});