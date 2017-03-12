const LICENSE_API_URL= "https://data.seattle.gov/resource/87w5-fd6d.json?species=Dog";
const OFF_LEASH_API_URL="https://data.seattle.gov/resource/5tqj-tg8y.json"


$().ready(function() {


  let form = $("#licenseSearch");
  getOffLeashAreas();
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
        }
        $("#extraFilters").toggleClass("hidden");
      } else {
        console.log(data)
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
