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
    console.log(formData);

  })
});

function getLicenseData(formData) {
  $.get(LICENSE_API_URL, formData, function(data){
  })
  .done(function(data) {
    // Array.from(new Set(data))
    // _.uniq([data]);
    // filter

    if(data.length <=0) {
      console.log("No Data");
      $("#warning-alert").removeClass("hidden");
      $("#multiple-results").addClass("hidden");
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
      $("#multiple-results").removeClass("hidden");
      $(".status-pic").attr("src", 'img/multidog.jpg');




    } else {
      for(let i = 0; i < data.length; i++) {
        $("#license_number").append($('<option>', {value:data[i].license_number, text:data[i].license_number}));
        $("#license_issue_date").append($('<option>', {value:data[i].license_issue_date, text:data[i].license_issue_date.slice(0,10)}));

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
      + data[i].website.url + '<br><a href="https://www.google.com/maps/preview/@'
      + data[i].latitude +','+ data[i].longitude +'" target="_blank">Map</a></address>')
    }
  })
}



function getLicensingStores() {
  $.get(LICENSE_SALES_API_URL, function(data) {

  })
  .done(function(data){
    console.log(data)
    for(let i = 0; i < data.length; i++) {
      $("#petLicenseSales").append('<address><strong>'+ data[i].common_name+'</strong><br>'
      + data[i].address + '<br>'
      + data[i].website.url + '<br><a href="https://www.google.com/maps/preview/@'
      + data[i].latitude +','+ data[i].longitude +'" target="_blank">Map</a></address>')
    }
  })
}
