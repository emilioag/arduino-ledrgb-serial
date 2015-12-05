$(function($){
    if (!("WebSocket" in window)) {
        alert("Your browser does not support web sockets");
    }else{
        setup();
    }
    function setup(){
        var host = "ws://localhost:9090/ws";
        var socket = new WebSocket(host);
        setInterval(function (){
            var x = $("#MyPicker").find(".pin").position().left,
                y = $("#MyPicker").find(".pin").position().top;
            if (x != LEFT || y != TOP) {
                LEFT = x;
                TOP = y;
                var hex = HEX();
                socket.send(hex);
                $("#MyPicker").addClass("disabledbutton");
                setTimeout(function (){
                    $("#MyPicker").removeClass("disabledbutton");
                }, 1000);
            }
        }, 50);
        if(socket){
            socket.onopen = function(){
                console.log("Connection openned")
            }
            socket.onmessage = function(msg){
                console.log("Response");
            }
            socket.onclose = function(){
                console.log("The connection has been closed.");
            }
        }else{
            console.log("invalid socket");
        }
    }
var LEFT = -1,
    TOP = -1;
function HEX() {
    var x = $("#MyPicker").find(".pin").position().left,
        y = $("#MyPicker").find(".pin").position().top,
        weight = $("#MyPicker").find(".spectrum").width();
        height = $("#MyPicker").find(".spectrum").height(),
        h = Math.round(x/ weight *360),
        s = Math.round(y/ height *100),
        l = parseInt($("#MyPicker").find("input[type=range]").val());
    h /= 360;
    s /= 100;
    l /= 100;
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // Achromatic
    } else {
        var hueToRGB = function(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
            p = 2 * l - q;
        r = hueToRGB(p, q, h + 1/3);
        g = hueToRGB(p, q, h);
        b = hueToRGB(p, q, h - 1/3);
    }
    return ((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)).toString(16).slice(1);
}
});