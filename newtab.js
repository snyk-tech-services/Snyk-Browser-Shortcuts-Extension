var getAllCallback = function(list) {

  var apps = document.getElementById("apps");

  for(var i in list) {
    // we don't want to do anything with extensions yet.
    var extInf = list[i];
    if(extInf.isApp && extInf.enabled) {
      var app = document.createElement("div");

      var img = new Image();
      img.className = "image";
      img.src = find128Image(extInf.icons);
      img.addEventListener("click", (function(ext) {
        return function() {
          chrome.management.launchApp(ext.id);
        };
      })(extInf));

      var name = document.createElement("div");
      name.className = "name";
      name.textContent = extInf.name;

      app.className = "app";
      app.appendChild(img);
      app.appendChild(name);
      apps.appendChild(app);
    }
  }
};

var find128Image = function(icons) {
  for(var icon in icons) {
    if(icons[icon].size == "128") {
      return icons[icon].url;
    }
  }

  return "/noicon.png";
};

Date.prototype.stdTimezoneOffset = function () {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

function date_time()
{

        date = new Date();
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

        var clocks = document.getElementsByClassName("clock");
        for (var i=0;i<clocks.length; i++){
          var offset=0;
          var minOffset = 0;
          var ampm="am";
          switch (clocks[i].parentElement.id) {
            case 'pst':
              offset=-8
              break;
            case 'est':
              offset=-5
              break;
            case 'london':
              offset=0;
              break;
            case 'tlv':
              offset=2;
              break;
            case 'india':
              offset+=5;
              minOffset+=30;
              break;

          }
          // daylight savings
          if(date.isDstObserved){
            offset++;
          }

          h = date.getUTCHours() + offset;
          console.log(h);
          if(h<0){
            h = h + 24;
          }
          if(h>24){
            h = h - 24;
          }

          if(h>12){
            h = h - 12;
            ampm = "pm";
          }
          if(h<10)
          {
                  h = "0"+h;
          }
          m = date.getMinutes() + minOffset;
          if(m>59)
          {
                  m = m - 60;
          }
          if(m<10)
          {
                  m = "0"+m;
          }
          // result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
          result = h+':'+m +ampm;
          clocks[i].innerHTML = result;
          if(h < 7 && h >= 0 && ampm == "am"){
            clocks[i].parentElement.className += " dnd"
          }
        }



}
chrome.alarms.create("minute", {periodInMinutes: 1});

chrome.alarms.onAlarm.addListener(function(alarm){
  date_time();
})

document.addEventListener('DOMContentLoaded', () => {
  //chrome.management.getAll(getAllCallback);
  date_time();
  document.getElementById("jenkins").addEventListener('click', function(){
    chrome.runtime.sendNativeMessage('com.google.chrome.aarlaud.jenkins',
            {text: "send"},
            function(response) {console.log("Received " +
                                chrome.runtime.lastError.message);
            });
  });
});
