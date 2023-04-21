export class XPAlertType {
  static Info = new XPAlertType("Info");
  static Message = new XPAlertType("Message");
  static Success = new XPAlertType("Success");
  static Error = new XPAlertType("Error");
  static Warning = new XPAlertType("Warning");
  static Confirm = new XPAlertType("Confirm");

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `${this.name}`;
  }
}

export class XPAlertTheme {
  static Info = new XPAlertTheme("info");
  static Success = new XPAlertTheme("success");
  static Error = new XPAlertTheme("danger");
  static Confirm = new XPAlertTheme("secondary");
  static Warning = new XPAlertType("warning");
  static Message = new XPAlertType("light");

  constructor(name) {
    this.name = name;
  }

  static byType(type) {
    switch (type) {
      case XPAlertType.Confirm:
        return `${this.Confirm}`;
      case XPAlertType.Error:
        return `${this.Error}`;
      case XPAlertType.Info:
        return `${this.Info}`;
      case XPAlertType.Message:
        return `${this.Message}`;
      case XPAlertType.Success:
        return `${this.Success}`;
      case XPAlertType.Warning:
        return `${this.Warning}`;
      default:
        return "";
    }
  }

  toString() {
    return `${this.name}`;
  }
}

export class XPAlertIcon {
  static Info = new XPAlertIcon("info");
  static Success = new XPAlertIcon("success");
  static Error = new XPAlertIcon("error");
  static Confirm = new XPAlertIcon("question");
  static Warning = new XPAlertIcon("warning");

  constructor(name) {
    this.name = name;
  }

  static byType(type) {
    switch (type) {
      case XPAlertType.Confirm:
        return `${this.Confirm}`;
      case XPAlertType.Error:
        return `${this.Error}`;
      case XPAlertType.Info:
        return `${this.Info}`;
      case XPAlertType.Success:
        return `${this.Success}`;
      case XPAlertType.Warning:
        return `${this.Warning}`;
      default:
        return "";
    }
  }

  toString() {
    return `${this.name}`;
  }
}

export class XPCrudType {
  static Add = new XPCrudType("Add");
  static Update = new XPCrudType("Update");
  static Delete = new XPCrudType("Delete");

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `${this.name}`;
  }
}
