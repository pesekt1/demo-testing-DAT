import fizzBuzz from "../fizzBuzz";

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    const args = ["a", null, undefined, {}, false];
    args.forEach((a) => {
      expect(() => {
        fizzBuzz(a);
      }).toThrow();
    });
  });

  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const args = [15, 30, 45];
    args.forEach((a) => expect(fizzBuzz(a)).toBe("FizzBuzz"));
  });

  it("should return Fizz if input is only divisible by 3", () => {
    const args = [3, 6, 9, 12];
    args.forEach((a) => expect(fizzBuzz(a)).toBe("Fizz"));
  });

  it("should return Buzz if input is only divisible by 5", () => {
    const args = [5, 10, 20, 25];
    args.forEach((a) => expect(fizzBuzz(a)).toBe("Buzz"));
  });

  it("should return input if input is not divisible by 3 or 5", () => {
    const args = [-1, 1, 2, 4, 7, 8, 11, 13, 14];
    args.forEach((a) => expect(fizzBuzz(a)).toBe(a));
  });
});
