(function () {
    "use strict";
    angular.module("app")
        .controller("queryController", qbc)
        .directive("queryBuilder", qb);

    qb.inject = ['BUILDER_TEMPLATE_URL'];
    function qb(BUILDER_TEMPLATE_URL) {
        return {
            restrict: "E",
            controller: "queryController",
            controllerAs: "qc",
            templateUrl: BUILDER_TEMPLATE_URL
        };
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
            const reversedGroup = group.reverse();
            criteria.group = reversedGroup;            
            self.criteria.splice(first.index, 0, ...group.map(ci => ci.criterion));
            uncheckGroup(self.criteria);
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
    }
})();