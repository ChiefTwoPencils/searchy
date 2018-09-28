class AndOr {
    constructor() {

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

    }
}

class Criterion {
    constructor() {
        this.selected = false;
        this.andOr = new AndOr();
        this.field = new Field();
        this.operator = new Operator();
        this.value = new Value();
    }
};