app.controller('meetupsController', ['$scope', '$resource', function($scope, $resource){
    //var Meetup = $resource('/RESTapi/meetups/:_id', {id: '@_id'});

    var Meetup = $resource('/RESTapi/meetups/:_id', {id: '@_id'}, {
        'update': { method: 'PUT' }
    });

    var refresh = function() {
        Meetup.query(function (results) {
            $scope.meetups = results;
        });
        $scope.meetup = '';
    };
    refresh();

    $scope.create = function(){
        Meetup.save($scope.meetup, function (result){
            $scope.meetups.push(result);
        });
        $scope.meetup = '';
    };

    $scope.destroy = function (meetup){
        Meetup.delete(meetup);
        
        var index = $scope.meetups.indexOf(meetup);
        $scope.meetups.splice(index,1);
    };

    $scope.edit = function (meetup){
        $scope.meetup = Meetup.get(meetup);
    };

    $scope.update = function (){
        Meetup.get($scope.meetup, function(result){
            Meetup.update(result, $scope.meetup, function(result){
                refresh();
            });
        });
    };

}]);