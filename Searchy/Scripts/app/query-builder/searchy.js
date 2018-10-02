class Searchy {
    constructor() { }
    static get DataType() {
        return new DataTypes();
    }
    static get Operators() {
        return new Operators();
    }
    static get Chains() {
        return new Chains();
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
        return Chains.Or(a, b, op.doop, Equal);
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
        this.doop = doop ? doop : Operators.Noop;
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
        this.doop = doop ? doop : () => { }
    }
}

class FieldType {
    constructor() {
        this.dataType = Searchy.DataType.String;
        this.supportedOps = [];
    }
}

class Field {
    constructor() {
        this.value = "";
        this.fieldType = new FieldType();
    }
}

class Value {
    constructor() {
        this.text = "";
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