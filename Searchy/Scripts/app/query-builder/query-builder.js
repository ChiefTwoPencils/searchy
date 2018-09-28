(function () {
    angular.module("app")
        .controller("queryController", qbc)
        .directive("queryBuilder", qb);

    qb.inject = ['BUILDER_TEMPLATE_URL']
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
        self.criteria = [new Criterion()];
    }
})();