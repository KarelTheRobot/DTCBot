$(document).ready(function() {
    $("#player_search_button").click(function() {
        var playername = $.trim($("#player_search_textarea").val());
        var data = {
            name: playername
        }
        $.get("/player", data, function(callback) {
            console.log("ok");
        });
    });
});
