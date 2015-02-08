app.controller('meetupsController', ['$scope', '$resource', function($scope, $resource){
    var Meetup = $resource('/RESTapi/meetups/:_id', {id: '@_id'});

    Meetup.query(function (results) {
        $scope.meetups = results;
    });

    $scope.createMeetup = function(){
        var meetup = new Meetup();
        meetup.name = $scope.meetupName;
        meetup.$save(function (result){
            $scope.meetups.push(result);
        });
        $scope.meetupName = '';
    };

    $scope.removeMeetup = function (meetup){
        Meetup.delete(meetup)
        
        var index = $scope.meetups.indexOf(meetup);
        $scope.meetups.splice(index,1);
    };

}]);