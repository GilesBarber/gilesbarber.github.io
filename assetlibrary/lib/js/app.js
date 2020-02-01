function populate(library, prefix, classes) {
  $.each(library, function (index, value) {
    $(".flex-container").append('<li id="' + prefix + index + '" class="resultItems ' + classes + '"><a href="' + value.url + '" target="_blank">' + value.title + '</a><p>' + value.description + '</p></li>');
    $("#" + prefix + index).css("background-image", "url(" + value.thumbnail + ")");
  });
}

function init() {
  $(".multi-range").append('<input type="range" min="' + daysMin + '" max="' + daysMax + '" value="' + daysMin + '" id="lower" class="range-slider"> <input type="range" min="' + daysMin + '" max="' + daysMax + '" value="' + daysMax + '" id="upper" class="range-slider"></input>');
  var i;
  for (i = 0; i < libNames.length; i++) {
    initialiseLib(libNames[i], className[i], IDprefix[i]);
    $(".filters").append('<input type="checkbox" name="' + libNames[i] + '" id="' + libNames[i] + '" value="' + IDprefix[i] + '" checked> <span class="colourVar">' + className[i] + '</span><br>');
  }

  function initialiseLib(fileJSON, classes, prefix) {
    $.getJSON("lib/json/" + fileJSON + ".json", function (result) {
      populate(result, prefix, classes);
      libraries[fileJSON] = result;
    });
  }
  var root = document.querySelector(':root');
  var rootStyles = getComputedStyle(root);
  var colour1 = rootStyles.getPropertyValue('--colour1');
  var colour2 = rootStyles.getPropertyValue('--colour2');
  var colour3 = rootStyles.getPropertyValue('--colour3');
  var colour4 = rootStyles.getPropertyValue('--colour4');
  var colour5 = rootStyles.getPropertyValue('--colour5');
  root.style.setProperty('--colour1', labelColours[0]);
  root.style.setProperty('--colour2', labelColours[1]);
  root.style.setProperty('--colour3', labelColours[2]);
  root.style.setProperty('--colour4', labelColours[3]);
  root.style.setProperty('--colour5', labelColours[4]);
};

$(document).ready(function () {

  init();

  $("#upperValue").text("Slide to calculate");
  $(".multiDay").hide();

  var lowerSlider = document.querySelector('#lower'),
    upperSlider = document.querySelector('#upper'),
    lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  upperSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);

    if (upperVal < lowerVal + 1) {
      $(".multiDay,#lowerValue").hide();
    } else { $(".multiDay,#lowerValue").show(); }

    if (upperVal < lowerVal) {
      lowerSlider.value--;
      lowerVal = parseInt(lowerSlider.value);
    };
  };
  lowerSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    $("#upper").show();
    if (lowerVal > upperVal - 1) {
      $(".multiDay,#lowerValue").hide();
      if (upperVal == upperSlider.max) {
        $("#upper").hide();
      }
    } else { $(".multiDay,#lowerValue").show(); }
  };

  $('input[type=range]').change(function () {
    var i;
    for (i = 0; i < libNames.length; i++) {
      $.each(libraries[libNames[i]], function (index, value) {
        var days = libraries[libNames[i]][index].daysToBuild;
        var itemID = libraries[libNames[i]].indexOf(libraries[libNames[i]][index]);
        if (days >= lowerVal && days <= upperVal) {
          $("#" + IDprefix[i] + itemID).removeClass("daysHide");
        } else {
          $("#" + IDprefix[i] + itemID).addClass("daysHide");
        }
      });
    }
    $("#lowerValue").text(lowerVal);
    $("#upperValue").text(upperVal);
  });

  $('input[type=checkbox]').change(function () {

    var i;
    for (i = 0; i < libNames.length; i++) {
      if ($("#" + libNames[i]).prop('checked')) {
        $("." + className[i]).removeClass("typeHide");
      } else { $("." + className[i]).addClass("typeHide"); }
    }
  });

  $("form").submit(function (e) {
    e.preventDefault();

    var form = document.getElementById("textForm");
    var getText = form.elements.textField.value;

    $(".resultItems").addClass("searchHide");
    searchCat(getText);

    function searchCat(getText) {

      var i;
      for (i = 0; i < libNames.length; i++) {
        $.each(libraries[libNames[i]], function (index, value) {
          $.each(value.keywords, function (index2, value2) {
            if (value2.match(getText)) {

              var itemID = libraries[libNames[i]].indexOf(libraries[libNames[i]][index]);

              $("#" + IDprefix[i] + itemID).removeClass("searchHide");

            }
          });
        });
      }
    }
  });
});