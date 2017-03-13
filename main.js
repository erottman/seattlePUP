const LICENSE_API_URL= "https://data.seattle.gov/resource/87w5-fd6d.json?species=Dog";
const OFF_LEASH_API_URL="https://data.seattle.gov/resource/5tqj-tg8y.json"
const LICENSE_SALES_API_URL="https://data.seattle.gov/resource/yef9-cfuw.json"


$().ready(function() {


  let form = $("#licenseSearch");
  getOffLeashAreas();
  getLicensingStores();
  form.on("submit", function(event) {
    event.preventDefault();

    let formData = $("#licenseSearch :input")
        .filter(function(index, element) {
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
        console.log("No Data");
        // show the alert warning-alert
        $("#warning-alert").toggleClass("hidden")
      }


      if(data.length > 1) {
        for(let i = 0; i < data.length; i++){
          $("#primary_breed").append($('<option>', {value:data[i].primary_breed, text:data[i].primary_breed}));
          $("#zip_code").append($('<option>', {value:data[i].zip_code, text:data[i].zip_code}));
        }
        $("#extraFilters").toggleClass("hidden");
        $("#multiple-results").toggleClass("hidden")
      } else {
        for(let i = 0; i < data.length; i++) {
        console.log(data)
        $("#license_number").append($('<option>', {value:data[i].license_number, text:data[i].license_number}));
        $("#license_issue_date").append($('<option>', {value:data[i].license_issue_date, text:data[i].license_issue_date}));
      }$("#match-results").toggleClass("hidden");
        $("#extraFiltersTwo").toggleClass("hidden");
          $("#multiple-results").toggleClass("hidden")
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
