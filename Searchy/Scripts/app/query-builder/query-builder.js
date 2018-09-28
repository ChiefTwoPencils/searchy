(function () {
    angular.module("app")
        .controller("queryController", qbc)
        .directive("queryBuilder", qb);

    function qb() {
        return {
            restrict: "E",
            template: "<div class='query-builder'><div ng-repeat='c in qc.criteria'>{{c}}</div></div>"
        };
    }

    function qbc() {
        var self = this;
        self.criteria = ["first", "second", "third"];
    }
})();