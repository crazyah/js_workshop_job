
addEventListener("submit", function(e){
  e.preventDefault();

  const params = {
      description: document.forms[0].elements['description'].value,
      location: document.forms[0].elements['location'].value,
      full_time: document.forms[0].elements['full_time'].checked
    }
    console.log(getParams(params))
    axios.get(getParams(params))
      .then(function(res) {
        console.log(res.data)
      })
})

let getParams = function (params) {
  return `https://still-spire-37210.herokuapp.com/positions.json?description=${params.description}&location=${params.location}&full_time=${params.full_time}`
}
