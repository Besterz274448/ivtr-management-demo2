export class Product {
  constructor() {
    this.rows = [
      {
        id: "5f709300fb00db33d58c1148",
        name: "Lemonade - Mandarin, 591 Ml",
        price: 752,
        quantity: 415,
        category: "Shoes",
        sold: 86,
      },
      {
        id: "5f709300fb00db33d58c112f",
        name: "Taro Leaves",
        price: 393,
        quantity: 409,
        category: "Grocery",
        sold: 398,
      },
    ];
  }

  get allProduct() {
    return this.rows;
  }
}
