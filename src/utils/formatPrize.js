const currencyFormat = (num) => {
  // new Intl.NumberFormat('vi-VN', {
  //     style: 'currency',
  //     currency: 'VND'
  //   }).format(num);
  if (num) {
    var x = num.toLocaleString("vi", { style: "currency", currency: "VND" });
  }
  return x;
};
export default currencyFormat;
