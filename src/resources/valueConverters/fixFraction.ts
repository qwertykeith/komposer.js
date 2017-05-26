export class FixFractionValueConverter {
  toView(value: number): string {

    if (value >= 1) {
      return value.toString()
    }
    else {
      const v = 1 / value;
      return "1/" + v.toString();
    }

  }
}
