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

    $scope.createMeetup = function(){
        var meetup = new Meetup();
        meetup.name = $scope.meetup.name;
        meetup.$save(function (result){
            $scope.meetups.push(result);
        });
        $scope.meetup.name = '';
    };

    $scope.removeMeetup = function (meetup){
        console.log(meetup.id)
        Meetup.delete(meetup)
        var index = $scope.meetups.indexOf(meetup);
        $scope.meetups.splice(index,1);
    };

    $scope.editMeetup = function (meetup){
        console.log(meetup);
        $scope.meetup = Meetup.get(meetup);
    };

    $scope.updateMeetup = function (){
        Meetup.get($scope.meetup, function(result){
            Meetup.update(result, $scope.meetup, function(result){
                refresh();
            });
        });
    };

}]);