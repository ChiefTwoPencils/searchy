(function () {
    "use strict";
    angular.module("app")
        .controller("queryController", qbc)
        .directive("criteria", qbCriteria)
        .directive("criterion", qbCriterion)
        .directive("queryBuilder", qb);

    qb.inject = ["BUILDER_TEMPLATE_URL"];
    function qb(BUILDER_TEMPLATE_URL) {
        return {
            restrict: "E",
            controller: "queryController",
            controllerAs: "qc",
            templateUrl: BUILDER_TEMPLATE_URL
        };
    }

    qbCriterion.inject = ["CRITERION_TEMPLATE_URL"];
    function qbCriterion(CRITERION_TEMPLATE_URL) {
        return {
            restrict: "E",
            templateUrl: CRITERION_TEMPLATE_URL
        }
    }

    qbCriteria.inject = ["CRITERIA_TEMPLATE_URL"];
    function qbCriteria(CRITERIA_TEMPLATE_URL) {
        return {
            restrict: "E",
            templateUrl: CRITERIA_TEMPLATE_URL
        }
    }

    function qbc() {
        const self = this;

        self.groupable = false;

        self.fields = [
            "User name", "Email", "Date Created"
        ];
        self.operators = [
            "=", "<>", "<", ">", "<=", ">=", "Contains", "Does Not Contain", "In", "Not In"
        ];
        self.criteria = [new Criterion()];

        self.chainable = criterion => self.criteria.indexOf(criterion) !== 0;

        self.updateGroupable = () => self.groupable = self.criteria.filter(c => c.selected).length > 1;

        self.groupSelected = () => {
            const group = getSelected(self.criteria)
                .sort((a, b) => b.index - a.index);
            const first = group[group.length - 1];
            group.forEach(c => self.criteria.splice(c.index, 1));
            const criteria = new Criteria();
            criteria.group = group.map(ci => ci.criterion).reverse();            
            self.criteria.splice(first.index, 0, criteria);
            uncheckGroup(criteria.group);
        };

        const getSelected = all => all
            .map((c, i) => { return { criterion: c, index: i }; })
            .filter(ci => ci.criterion.selected);

        const uncheckGroup = group => group.forEach(c => c.selected = false);

        self.addCriterion = () => self.criteria.push(new Criterion());

        self.removeCriterion = criterion => {
            if (self.criteria.length !== 1) {
                const index = self.criteria.indexOf(criterion);
                index < 0
                    ? () => { /*noop*/ }
                    : self.criteria.splice(index, 1);
            }            
        };

        self.isCriteria = criterion => criterion instanceof Criteria;
    }
})();