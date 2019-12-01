$(function() {
  // cart.js
  let json = kits.loadData('cartList');
  // console.log(json)

  let html = '';
  json.forEach(element => {
    // console.log(element);
    html += `<div class="item" data-id="${element.pID}">
      <div class="row">
        <div class="cell col-1 row"  >
          <div class="cell col-1">
            <input type="checkbox" class="item-ck" ${element.isChecked ? 'checked' : ''}>
          </div>
          <div class="cell col-4">
            <img src="${element.imgSrc}" alt="">
          </div>
        </div>
        <div class="cell col-4 row">
          <div class="item-name">${element.name}</div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="price">${element.price}</em>
        </div>
        <div class="cell col-1 tc lh70">
          <div class="item-count">
            <a href="javascript:void(0);" class="reduce fl ">-</a>
            <input autocomplete="off" type="text" class="number fl" value="${element.number}">
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${element.price * element.number}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
    </div>`;
  });
  $('.item-list').append(html);

  let isNoCkAll = json.find(e => {
    return !e.isChecked;
  });
  $('.pick-all').prop('checked', !isNoCkAll);

  if (json.length != 0) {
    // 控制样式
    $('.cart-header').show();
    $('.empty-tip').hide();
    $('.total-of').show();
  }

  // ckAll事件
  $('.pick-all').on('click', function() {
    // $(this)
    // console.log($(this).prop('checked'));
    let flag = $(this).prop('checked');
    $('.item-ck').prop('checked', flag);
    $('.pick-all').prop('checked', flag);
    json.forEach(e => {
      e.isChecked = flag;
    });
    kits.saveData('cartList', json);
    calc();
  });

  // 时间委托与item-list
  $('.item-list').on('click', '.item-ck', function() {
    console.log(222);
    let ckall = $('.item-ck').length === $('.item-ck:checked').length;
    // 设置全选的状态和ckall一致就行
    $('.pick-all').prop('checked', ckall);
    // console.log($(this).parents('.row').attr('data-id'));
    let id = $(this)
      .parents('.item')
      .attr('data-id');
    let isChecked = $(this).prop('checked');
    // console.log(isChecked);
    json.forEach(e => {
      if (e.pID == id) {
        e.isChecked = isChecked;
      }
    });
    kits.saveData('cartList', json);
    calc();
  });

  // 计数求和
  function calc() {
    let arr = kits.loadData('cartList');
    let totalNum = 0;
    let totalMoney = 0;
    arr.forEach(e => {
      if (e.isChecked) {
        totalNum += e.number;
        totalMoney += totalNum * e.price;
      }
    });

    $('.selected').text(totalNum);
    $('.total-money').text(totalMoney);
  }

  calc(json);

  // 购物车加
  $('.add').on('click', function() {
    let num = $(this)
      .prev()
      .val();
    $(this)
      .prev()
      .val(++num);
    // $(this).parents('')
    // json.forEach()
    let id = $(this)
      .parents('.item')
      .attr('data-id');
    // console.log(isChecked);
    /*      json.forEach(e => {
        if (e.pID == id) {
          e.number = num;
        }
      }); */
    let obj = json.find(e => {
      return e.pID == id;
    });
    obj.number = num;
    kits.saveData('cartList', json);
    calc();
    $(this)
      .parents('.item')
      .find('.computed')
      .text(obj.number * obj.price);
  });

  // 购物车减
  $('.reduce').on('click', function() {
    let num = $(this)
      .next()
      .val();
    if (num <= 1) {
      alert('商品的件数不能小于1');
      return;
    }
    $(this)
      .next()
      .val(--num);
    let id = $(this)
      .parents('.item')
      .attr('data-id');
    // console.log(isChecked);
    /*       let obj = json.forEach(e => {
        if (e.pID == id) {
          e.number = num;
        }
      }); */
    let obj = json.find(e => {
      return e.pID == id;
    });
    obj.number = num;
    kits.saveData('cartList', json);
    calc();
    $(this)
      .parents('.item')
      .find('.computed')
      .text(obj.number * obj.price);
  });

  // 手动输入数量
  $('.number').on('focus', function() {
    let oldVal = $('.number').val();
    let id = $('.item').attr('data-id');
    let obj = json.find(e => {
      return e.pID == id;
    });
    obj.number = num;
  });

  // 商品移除
  $('.item-list').on('click', '.item-del', function() {
    // console.log(this);
    $(this)
      .parents('.item')
      .remove();
    let id = $(this)
      .parents('.item')
      .attr('data-id');
    console.log(id);
    json = json.filter(e => {
      return e.pID != id;
    });
    kits.saveData('cartList', json);
    calc();
  });
});
