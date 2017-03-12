const LICENSE_API_URL= "https://data.seattle.gov/resource/87w5-fd6d.json?species=Dog";
const OFF_LEASH_API_URL="https://data.seattle.gov/resource/5tqj-tg8y.json"


$().ready(function() {
  // Notice that the baseURl has the species as Dog set by default. We do this so that we don't have to filter out cats
  // once the datasource comes back.

  let form = $("#licenseSearch");
  // getOffLeashAreas();
  form.on("submit", function(event) {
    event.preventDefault();

    // We are only going to serialize the fields that actually have data in them.
    let formData = $("#licenseSearch :input")
        .filter(function(index, element) {
            return $(element).val() != "";
        })
        .serialize();
    getLicenseData(formData);
  })
});

// Starting to abstract out the core method of getting
function getLicenseData(formData) {
  $.get(LICENSE_API_URL, formData, function(data){
  })
    .done(function(data) {
      // first lets check to make sure we actually got some results from the api.
      if(data.length <=0) {
        console.log("No Data");
        // show the alert warning-alert
        $("#warning-alert").toggleClass("hidden")
      }

      // There is a chance that there is more than one dog with the same name. We start with a simple search and then
      // we will show more advanced search features if this happens.
      // Godzilla will show the advanced search features
      // Governor will not show the advanced search featurs.

      // There is a case that is unhandled. What if you have the same name and breed and the dogs live in the same zipcode.
      // Lets leave this as a strech case once you have updated your UI with the code here.
      if(data.length > 1) {
        // we need to populate the advanced search select box with the breeds that are returned by the first request.
        // should probably FILTER this so that the list is unique
        for(let i = 0; i < data.length; i++){
          $("#primary_breed").append($('<option>', {value:data[i].primary_breed, text:data[i].primary_breed}));
        }

        // unhide the advanced sarch features
        $("#extraFilters").toggleClass("hidden");
      } else {
        // only one record was found. We need to do something with this data.
        // From this point. we will need to use some sort of geocoding to determine the cloest dog park to the person.
        console.log(data)
      }
    })
}

// This method is a way to get ALL of the off leash parks avaliable.
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
