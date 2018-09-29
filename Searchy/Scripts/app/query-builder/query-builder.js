(function () {
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
        var self = this;
        self.fields = [
            "User name", "Email", "Date Created"
        ];
        self.operators = [
            "=", "<>", "<", ">", "<=", ">=", "Contains", "Does Not Contain", "In", "Not In"
        ];
        self.criteria = [new Criterion()];
        self.addCriterion = function () {
            self.criteria.push(new Criterion());
        };
        self.removeCriterion = function (index) {
            if (index < 0 || index >= criteria.length) {
                return;
            }
            self.criteria.splice(index, 1);
        };
    }
})();