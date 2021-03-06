
function update() {
  showNumHistory();
  showHistory();
}

function showHistory() {
  var str = "";

  if (countHistory() != 0) {
    var jsonObj = getHistory();
    //str = JSON.stringify(jsonObj, null, 2);
  }
  $("#historyTextarea").empty();
  //$("#historyTextarea").append("<li role='list-divider'>Previous Searches:</li>");
  for (var key in jsonObj) {
  if (jsonObj.hasOwnProperty(key)) {
    str=str+"<br/>"+key;
    $("#historyTextarea").append("<li>"+key+'<div class="ui-li-count">'+jsonObj[key]+'</div>'+"</li>");
  }
  }
  //$("#historyTextarea").html(str);
  $("#historyTextarea").listview('refresh');
}

function showNumHistory() {
  var str = "(" + countHistory() + ")";
  $("#numHistory").html(str);
}

function getDisplayedHistory() {
  var str = $("#historyTextarea").val();
  var jsonObj = JSON.parse(str);
  return jsonObj;
}

// -- events

// http://www.w3schools.com/jsref/event_onclick.asp
function addClearEvent() {
  $("#clearButton").click(function(){
    clearHistory();
    update();
  });
}

function addClickLinkEvent() {
  $("#gdictLinkButton").click(function(){
    var url = "https://github.com/tomabroad/gdict";
    window.open(url, '_blank');
  });
}

function addSearchEvent() {

  $("#qr").keyup(function(event){
    if(event.keyCode == 13){
        $("#sv").click();
    }
  });



  $("#sv").click(function(){
      var sText = $("#qr").val();

      addHistory(sText);
      var udAPI = "http://api.urbandictionary.com/v0/define?";






      $.getJSON( udAPI, { term: sText } )
          .done(function( json ) {
            if ( (typeof json.tags == 'undefined') || (json.tags.length == 0) || (json.result_type == "no_results"))
                $("#searchResult").html("No Definition Found");
            else
                $("#searchResult").html("<b>Definition for "+sText+":</b><br/>"+json.list[0].definition.toString()+"<br/><b>Example:</b><br/>"+json.list[0].example.toString()+"<br/>"+(json.list.length>=2 ? '<br/><br/><a href="http://www.urbandictionary.com/define.php?term='+sText+'" target="_blank" style="a:link    {color:#000000; background-color:transparent; text-decoration:none}">See '+(json.list.length-1)+' more definitions on the website</a>':''));

            update();

      });


  });
}


// update history
function addUpdateEvent() {
  $("#updateButton").click(function(){
    var jsonObj = getDisplayedHistory();

    if (jsonObj) {
      setHistory(jsonObj);
      update();
    } else {
      alert("error");
    }
  });
}

$(document).ready(function(){
  /*update();
  addUpdateEvent();

  addClearEvent();
  addClickLinkEvent();

  addSearchEvent();*/
	$('body').fadeOut(500, function() { $(this).show() });

	chrome.tabs.query({
    active: true,               // Select active tabs
    lastFocusedWindow: true     // In the current window
}, function(array_of_Tabs) {
    // Since there can only be one active tab in one active window, 
    //  the array has only one element
    var tab = array_of_Tabs[0];
    // Example:
    var url = tab.url.toString();


    addHistory(url);

	var arnum=url.match(/arnumber=[0-9]+/);
if (arnum!=null)
{
	$.get( 'http://216.189.153.85:3000/bgen/ix/'+arnum[0].substring(9), { } )
      .done(function( bibtext ) {
	
	$('#bib').text(''+bibtext.toString());
	$('#bib').textarea('refresh');
	$('textarea').autoResize();

});
}





    



    
});
});


function setbg(color)
{
	document.getElementById("styled").style.background=color
}	
