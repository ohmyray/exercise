// detail.js
$(() => {
  let id = location.search.substring(4);
  console.log(id);
  let targetPhone = phoneData.find(e => {
    // 前面拿到的id类型是string
    return e.pID == id;
  });
  // console.log(targetPhone);
  // 拿到当前id对应的数据
  // 将其渲染到页面中
  $('.preview-img img').attr('src', targetPhone.imgSrc); // 商品 img
  $('.summary-price em').text(`￥${targetPhone.price}`); // 商品 price
  $('.sku-name').text(targetPhone.name); // 商品 标题

  //添加到购物车
  $('.addshopcar').on('click', () => {
    let number = $('.choose-number').val();
    if (number.trim().length === 0 || isNaN(number) || parseInt(number) <= 0) {
      //判断是否为一个数字
      alert('请输入正确数量');
    }
    let cartData = kits.loadData('cartList');
    // 查看数据中是否有此商品的数据
    let product = cartData.find(e => {
      // 通过id从local比较数据
      return e.pID == id;
    });
    console.log(product);
    number = parseInt(number); // string类型的数字直接存的话后面不能做+-运算
    if (product) {
      // 若有本地数据中有该id的商品，为其直接改变number
      product.number += number;
    } else {
      // 使用对象的方式存
      let carObj = {
        pID: targetPhone.pID,
        imgSrc: targetPhone.imgSrc,
        price: targetPhone.price,
        name: targetPhone.name,
        number: number,
        isChecked: true
      };
      // 将数据追加到尾部
      cartData.push(carObj);
    }
    // 修改后的数据再次存储回去
    kits.saveData('cartList', cartData);
    // 跳转至购物车
    location.href = './cart.html';
  });
});
