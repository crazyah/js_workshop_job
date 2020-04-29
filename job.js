let pageNum 


addEventListener("submit", function(e){
  e.preventDefault();
  const params = {
    description: document.forms[0].elements['description'].value,
    location: document.forms[0].elements['location'].value,
    full_time: document.forms[0].elements['full_time'].checked
  }
  pageNum = 1
  console.log(getUrl(params))
  axios.get(getUrl(params))
  .then(function(res) {
    let objs = res.data
    let data = ""
    for (obj of objs) {
      // console.log(urlToHtml(obj))
      data += urlToHtml(obj)
    }
    document.getElementById('job-pannel').innerHTML = data
    // console.log(data)
    console.log(objs.length)
    if(objs.length === 50) {
      document.getElementById('pagination-next').removeAttribute('disabled')
    }
    let nextPage = function(e) {
      e.preventDefault()
      pageNum += 1
      console.log(pageNum)
      console.log(getUrl(params))
      axios.get(getUrl(params))
        .then(function(res) {
          let newObjs = res.data
          let newData = ""
          for (obj of newObjs) {
            newData += urlToHtml(obj)
          }
          if(newObjs.length === 50 ) {
            console.log('if' + newObjs.length)
            data = data + newData
            document.getElementById('job-pannel').innerHTML = data + newData
          }else if(newObjs.length < 50) {
            console.log('else if' + newObjs.length)
            data = data + newData
            document.getElementById('job-pannel').innerHTML = data + newData
            document.getElementById('pagination-next').setAttribute("disabled","")
            document.getElementById('pagination-next').removeEventListener('click', nextPage)
          }

        })
    }
    document.getElementById('pagination-next').addEventListener('click', nextPage)
  })
})
let getUrl = function(params) {
  return `https://still-spire-37210.herokuapp.com/positions.json?description=${params.description}&location=${params.location}&full_time=${params.full_time}&page=${pageNum}`
}


let urlToHtml = function(data) {
  return `<tr>
            <td>
              <h4><a href="${data.url}">${data.title}</a></h4>
              <p class="source">
              <a class="company" href="${data.company_url}">${data.company}</a>
              –
              <strong class="fulltime">Full Time</strong>
              </p>
            </td>
            <td class="meta">
              <span class="location">${data.location}</span>
            </td>
          </tr>`
}