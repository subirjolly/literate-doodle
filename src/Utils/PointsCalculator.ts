export default class PointsCalculator {
  static calculate(price: number) {
    if (price <= 50) {
      return 0;
    }

    if (price <= 100) {
      return price - 50;
    }

    return 50 + (price - 100) * 2;
  }
}
