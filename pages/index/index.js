import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';
Page({
    data: {
        list: ['a', 'b', 'c'],
        result: ['a', 'b'],
        location: '草原',
        role: '美羊羊,懒羊羊',
        type: '赶跑大灰狼',
        keyword: '裤腰带,鞋带'
    },
    reset() {
        this.setData({
            location: '',
            role: '',
            type: '',
            keyword: ''
        })
    },
    fakeLoading(num){
       
        const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: "请稍后...还剩"+num+"秒",
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
    randomNum(begin,end){
        var num = Math.floor(Math.random() * (end-2)) + begin;
        return num
    },
    create() {
        var that = this
        var result = {
            location: that.data.location,
            role: that.data.role,
            type: that.data.type,
            keyword: that.data.keyword
        }
        if (result.loation == "" || result.role == "") {
            Notify('请输入地点和角色！');
            return;
        }
        var num = this.randomNum(3,4)
        this.fakeLoading(num)
     
        console.log(result)
        setTimeout(()=>{
            wx.navigateTo({url:"/pages/detail/index"})
        },num*1000)
        
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