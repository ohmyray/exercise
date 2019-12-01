function calc() {
  let arr = kits.loadData('cartList');
  let totalNum = 0;
  let totalMoney = 0;
  arr.forEach(e => {
      totalNum += e.number;
      totalMoney += totalNum * e.price;
  });

  $('.selected').text(totalNum);
  $('.total-money').text(totalMoney);
  $('.shopcar .count').text(totalNum);
}
calc();
