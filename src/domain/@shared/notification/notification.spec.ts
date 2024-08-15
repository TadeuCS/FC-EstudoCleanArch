import Notification from "./notification";

describe("Unit tests for notifications", () => {
  it("should create customer errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,");

    const error2 = {
      message: "error message2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );

    const error3 = {
      message: "error message3",
      context: "order",
    };
    notification.addError(error3);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );
  });

  it("should create product errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "product",
    };

    notification.addError(error);

    expect(notification.messages("product")).toBe("product: error message,");

    const error2 = {
      message: "error message2",
      context: "product",
    };
    notification.addError(error2);

    expect(notification.messages("product")).toBe(
      "product: error message,product: error message2,"
    );

    const error3 = {
      message: "error message3",
      context: "order",
    };
    notification.addError(error3);

    expect(notification.messages("product")).toBe(
      "product: error message,product: error message2,"
    );
  });

  it("should check if notifications from context consumer, order and product", () => {
    const notification = new Notification();
    const errorConsumer = {
      message: "error message consumer",
      context: "consumer",
    };
    notification.addError(errorConsumer);

    const errorOrder = {
      message: "error message order",
      context: "order",
    };
    notification.addError(errorOrder);

    const errorProduct = {
      message: "error message product",
      context: "product",
    };
    notification.addError(errorProduct);

    expect(notification.messages()).toBe(
      "consumer: error message consumer,order: error message order,product: error message product,"
    );
  })

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);

    const notification2 = new Notification();
    const error2 = {
      message: "error message",
      context: "order",
    };
    notification2.addError(error2);

    expect(notification2.hasErrors()).toBe(true);

    const notification3 = new Notification();
    const error3 = {
      message: "error message",
      context: "product",
    };
    notification3.addError(error3);

    expect(notification3.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);

    const notification2 = new Notification();
    const error2 = {
      message: "error message",
      context: "product",
    };
    notification2.addError(error2);

    expect(notification2.getErrors()).toEqual([error2]);
  });
});
