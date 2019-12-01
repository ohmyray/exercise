class Tap {
    constructor(parameters) {
        let actual = {
            items: '.item',
            taps: '.tap',
            eType: 'click',
            isActive: 'active',
            isShow: 'show',
            interval: 1000
        }
        Object.assign(actual, parameters);
        Object.assign(this, actual);

        // 操作对象
        this.itemList = document.querySelectorAll(this.items);
        this.tapList = document.querySelectorAll(this.taps);
        this.addEvent();
    }

    // 事件
    addEvent() {
        this.itemList.forEach((element, index) => {
            element.addEventListener(this.eType, e => {
                this.changeItems(element);
                this.changeTaps(index);
            })
        })
    }

    // 改变item
    changeItems(element) {
        this.itemList.forEach(e => {
            e.classList.remove(this.isActive);
        })
        element.classList.add(this.isActive);
    }

    // 改变tap
    changeTaps(index) {
        this.tapList.forEach(e => {
            e.classList.remove(this.isShow)
        })
        this.tapList[index].classList.add(this.isShow)
    }

    // 自动播放
    autoPlay() {
        let currentIndex = 0;
        this.timer = setInterval(e => {
            currentIndex++;
            currentIndex %= this.itemList.length;
            this.changeItems(this.itemList[currentIndex]);
            this.changeTaps(currentIndex);
        }, this.interval)
    }
}