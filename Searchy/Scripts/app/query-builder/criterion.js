class Chain {
    constructor() {
        this.type = ""
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
    constructor() {

    };
};

class Field {
    constructor() {

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