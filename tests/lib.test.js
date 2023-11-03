import lib from "../lib";
import db from "../db";
import mail from "../mail";

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return a 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
    expect(result).toContain("Mosh");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");
    expect(result.length).toBe(3);

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
    expect(result).toHaveProperty("price", 10);

    //expect(result).toStrictEqual({ id: 1, price: 10 });
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // Null
    // undefined
    // NaN
    // ''
    // 0
    // false
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

// Mock functions
describe("applyDiscount", () => {
  it("should give 10% discount if customer has more than 10 points", () => {
    //we replace getCustomerSync with our mock function:
    db.getCustomerSync = function (customerId) {
      console.log("fake reading customer");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

//interaction testing - function gets a customer id and sends email
describe("notifyCustomer", () => {
  it("should send an email to a customer", () => {
    //mock db.getCustomerSync function:
    db.getCustomerSync = function (customerId) {
      console.log("fake reading customer");
      return { email: "email" };
    };

    let mailIsSent = false; //initialize to false
    //mock mail.send function:
    mail.send = function (to, subject) {
      console.log("Sending an email...");
      mailIsSent = true;
    };

    const order = { customerId: 1 };
    lib.notifyCustomer(order);
    expect(mailIsSent).toBe(true);
  });
});

//better solution for notifyCustomer
describe("notifyCustomer2", () => {
  it("should send an email to a customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "email" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled(); //check if it has been called
    //check if first argument was "email"
    expect(mail.send.mock.calls[0][0]).toBe("email");
    //check if second argument contained "order"
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
