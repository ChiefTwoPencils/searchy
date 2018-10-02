class Searchy {
    constructor() { }
    static get DataType() {
        return DataTypes;
    }
    static get Operators() {
        return Operators;
    }
    static get Chains() {
        return Chains;
    }
};

class DataTypes {
    static get Boolean() {
        return "Boolean";
    }
    static get DateTime() {
        return "DateTime";
    }
    static get Double() {
        return "Double";
    }
    static get Guid() {
        return "Guid";
    }
    static get PlainText() {
        return "Plain Text"
    }
    static get String() {
        return "String";
    }
}

class Operators {
    static get Noop() {
        return new Operator("", () => { });
    }
    static get Equal() {
        return new Operator("=", (a, b) => a == b);
    }
    static get NotEqual() {
        return new Operator("<>", (a, b) => a != b);
    }
    static get LessThan() {
        return new Operator("<", (a, b) => a < b);
    }
    static get LessThanOrEqual() {
        return new Operator("<=", (a, b) => orEqual(a, b, LessThan));
    }
    static get GreaterThan() {
        return new Operator(">", (a, b) => a > b);
    }
    static get GreaterThanOrEqual() {
        return new Operator(">=", (a, b) => orEqual(a, b, GreaterThan));
    }
    orEqual(a, b, op) {
        return Chains.Or.doop(a, b, op.doop, Equal.doop);
    }
}

class Chains {
    static get And() {
        return new Chain("And", (a, b, f, g) => f(a, b) && g(a, b));
    }
    static get Or() {
        return new Chain("Or", (a, b, f, g) => f(a, b) || g(a, b));
    }
}

class Chain {
    constructor(type, doop) {
        this.type = type ? type : "";
        this.doop = doop ? doop : Operators.Noop.doop;
        this.options = [];
    }
}


class AndOr extends Chain {
    constructor() {
        super();
        this.options = ["And", "Or"];
    }
}

class Operator {
    constructor(symbol, doop) {
        this.symbol = symbol ? symbol : "";
        this.doop = doop ? doop : Operators.Noop.doop;
    }
}

class FieldType {
    constructor(dataType, supportedOps) {
        this.dataType = dataType ? dataType : Searchy.DataType.String;
        this.supportedOps = supportedOps ? supportedOps : [];
    }
}

class Field {
    constructor(value, fieldType) {
        this.value = value ? value : "";
        this.fieldType = fieldType ? fieldType : new FieldType();
    }
}

class Value {
    constructor(text) {
        this.text = text ? text : "";
    }
}

class Criterion {
    constructor() {
        this.selected = false;
        this.chain = new AndOr();
        this.field = new Field();
        this.operator = new Operator();
        this.value = new Value();
    }
};

class Criteria extends Criterion {
    constructor() {
        super();
        this.group = [];
        this.addCriterion = criterion => this.group.push(criterion);
    }
};