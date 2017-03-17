const LICENSE_API_URL= "https://data.seattle.gov/resource/87w5-fd6d.json?species=Dog";
const OFF_LEASH_API_URL="https://data.seattle.gov/resource/5tqj-tg8y.json"
const LICENSE_SALES_API_URL="https://data.seattle.gov/resource/yef9-cfuw.json"


$().ready(function() {

  let form = $("#licenseSearch");
  getOffLeashAreas();
  getLicensingStores();
  $('#reset').on('click', function () {
    location.reload();

  })

  form.on("submit", function(event) {
    event.preventDefault();

    let formData = $("#licenseSearch :input")

    .filter(function(index, element) {
      String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }
      if ($(element).val() !== null) {
      $(element).val($(element).val().capitalizeFirstLetter())
      }
      return $(element).val() != "";

    })
    .serialize();
    getLicenseData(formData);

  })
});

function getLicenseData(formData) {
  $.get(LICENSE_API_URL, formData, function(data){
  })
  .done(function(data) {
    if(data.length <=0) {
      $("#warning-alert").removeClass("hidden");
      $("#multiple-results").addClass("hidden");
      $("#match-results").addClass("hidden");
      $(".status-pic").attr("src", 'img/police.jpg');

    }

    else if(data.length > 1) {
      let zipCodes = [];
      let breeds = [];

      for(let i = 0; i < data.length; i++){
        var zip = data[i].zip_code;
        if (zipCodes.indexOf(zip) === -1) {
          zipCodes.push(zip)

        }
        var breed = data[i].primary_breed;
        if (breeds.indexOf(breed) === -1) {
          breeds.push(breed)
        }
      }
      var zipSort = zipCodes.sort();
      for (var i = 0; i < zipSort.length; i++) {
        $("#zip_code").append($('<option>', {value:zipSort[i], text:zipSort[i]}));
      }
      var breedSort = breeds.sort();
      for (var i = 0; i < breedSort.length; i++) {
        $("#primary_breed").append($('<option>', {value:breedSort[i], text:breedSort[i]}));
      }

      $("#extraFilters").removeClass("hidden");
      $("#warning-alert").addClass("hidden");
      $("#multiple-results").removeClass("hidden");
      $("#match-results").addClass("hidden");
      $(".status-pic").attr("src", 'img/multidog.jpg');

    } else {
      for(let i = 0; i < data.length; i++) {
        $("#license_number").attr("placeholder", data[i].license_number);
        $("#license_issue_date").attr("placeholder", data[i].license_issue_date.slice(0,10));
        $("#match-results").removeClass("hidden");
        $("#extraFiltersTwo").removeClass("hidden");
        $("#multiple-results").addClass("hidden");
        $("#warning-alert").addClass("hidden");
        $(".status-pic").attr("src", 'img/seattlelicense.png');
      }
    }
  })
}

function getOffLeashAreas() {
  $.get(OFF_LEASH_API_URL, function(data) {

  })
  .done(function(data){
    console.log(data)
    for(let i = 0; i < data.length; i++) {
      $("#offLeashContainer").append('<address><strong>'+ data[i].common_name+'</strong><br>'
      + data[i].address + '<br>'
      + '<a href=' + data[i].website.url +'>Site</a>' + '<br><a href="http://maps.google.com/maps?&z=15&mrt=yp&t=k&q='
      + data[i].latitude +','+ data[i].longitude +'" target="_blank">Map</a></address>')
    }
  })
}

function getLicensingStores() {
  $.get(LICENSE_SALES_API_URL, function(data) {

  })
  .done(function(data){
    for(let i = 0; i < data.length; i++) {
      $("#petLicenseSales").append('<address><strong>'+ data[i].common_name+'</strong><br>'
      + data[i].address + '<br>'
      + '<a href=' + data[i].website.url +'>Site</a>' + '<br><a href="http://maps.google.com/maps?&z=15&mrt=yp&t=k&q='
      + data[i].latitude +','+ data[i].longitude +'" target="_blank">Map</a></address>')
    }
  })
}

$(document).on('click','.navbar-collapse.in',function(event) {
    if( $(event.target).is('a') ) {
        $(this).collapse('hide');
        $('.interactive').collapse('hide');
        $($(event.target).attr('href')).collapse('show');

    }
});

$(function (){
    $(document).on("focus", "input:text", function() {
        $(this).select();
    });
});


$('.btn-info').on('click',function(event) {
    if( $(event.target).is('a') ) {
        $(this).collapse('hide');
        $('.interactive').collapse('hide');
        $($(event.target).attr('href')).collapse('show');

    }
});
