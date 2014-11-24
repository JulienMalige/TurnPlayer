
$(function(){

    // Swipe/drag the vinyl
    $(document).on( "swipedown", turnVinyl);
    // Tape the vinyl
    $(document).bind( "tap", stopVinyl);

    var degree=0;
    var turn=false;
    var counter;

    // Start counting and change the Vinyl Css (rotation)
    function turnVinyl(){
        console.log("Turn vinyl");
        turn = true;
        counter = setInterval(function(){
            if(degree>=360){degree=0;}
            degree++;
            $('#vinyle').css('-webkit-transform', 'rotate('+degree*4+'deg)');
        },10)
    }

    // Stop the Vinyl and Start the song
    function stopVinyl(){
        console.log("Stop vinyl");
        clearInterval(counter);
        if(turn==true) {
            connectToSoundCloud();
        }
        turn=false;
    }

    // Get on the SoundCloud API
    function connectToSoundCloud() {
        id = genRamdomId();
        $.get("http://api.soundcloud.com/tracks/" + randomId + ".json?client_id=69f9f6cb4aae2f1b2fca3f809ff86ffe")
            .done(function (data) {
                updateDomElement(data);
            }).fail(function () {
                connectToSoundCloud();
            });
    }

    // Generate a Custom Id for the soundCloud search
    function genRamdomId(){
        randomId =  Math.round(Math.random()* 1000000000);
        console.log("Custom Id generated : "+randomId);
        return randomId;
    }

    // Update the HTML with the find track info
    function updateDomElement(data){
        $('.playerZone').html('<audio  id="player" src="" controls></audio>');

        $('#player').attr("src", "http://api.soundcloud.com/tracks/" + data.id + "/stream?client_id=69f9f6cb4aae2f1b2fca3f809ff86ffe");
        $('#title').text(data.title);
        $('#artist').text(data.user.username);

        $('#cover').css("background-image", "url('img/default-cover.jpg')");

        if (data.artwork_url != null) {
            artwork_url = data.artwork_url;
            res = artwork_url.substr(0, (artwork_url.length - 9));
            $('#cover').css("background-image", "url(" + res + "t300x300.jpg)");
        }
        $("#player").trigger('play');

        //$('.marquee').marquee();

    }

});

export ANDROID_HOME=//"MAC HD"/Applications/adt-bundle-mac-x86_64-20140702/sdk export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

set ANDROID_HOME=

set PATH=%PATH%;%ANDROID_HOME%/tools;%ANDROID_HOME%/platform-tools