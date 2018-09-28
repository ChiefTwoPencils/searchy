(function () {
    angular.module("app")
        .controller("queryController", qbc)
        .directive("queryBuilder", qb);

    function qb() {
        return {
            restrict: "E",
            controller: "queryController",
            controllerAs: "qc",
            template: `<div class='query-builder'>
                           <div ng-repeat='c in qc.criteria'>{{c}}</div>
                       </div >`
        };
    }

    function qbc() {
        var self = this;
        self.criteria = [new Criterion()];
    }
})();