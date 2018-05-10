
import API_CONSTANT_MAP from '../components/apiMap'

  // handle S3 upload
  function getSignedUrl(file, roomId) {
    let queryString = '?objectName=' + (roomId + "_" + file.id) + '&contentType=' + encodeURIComponent(file.type);
    console.log("signed url queryString" + queryString);
    return fetch('/s3/sign' + queryString)
    .then((response) => {
      //console.log('response: ', response.json());
      return response.json();
    })
    .catch((err) => {
      console.log('error: ', err)
    })
  }
  
  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    console.log("createCORSRequest "+ method + " " + url);
    if (xhr.withCredentials != null) {
      console.log('withCredentials');
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest();
      console.log('new withCredentials');
      xhr.open(method, url);
    } else {
      console.log('withCredentials null');
      xhr = null;
    }
  
    return xhr;
  };
  
  export function S3Upload(fileInfo, roomId) { //parameters: { type, data, id }
    return new Promise((resolve, reject) => {
      getSignedUrl(fileInfo, roomId)
      .then((s3Info) => {
        
        // upload to S3
        var xhr = createCORSRequest('PUT', s3Info.signedUrl);

        xhr.onload = function() {
          console.log('xhr status:' + xhr.status);
          if (xhr.status === 200) {
            console.log("S3 URL: " + s3Info.signedUrl);
            console.log(xhr.status);

            var s3UrlLink = {  
              'StorageURL':s3Info.signedUrl
            }
            var msg = "Video recording has been saved into aws S3.";
            $.ajax({  
              url: API_CONSTANT_MAP.updates3url,  
              dataType: 'json',  
              type: 'POST',  
              data: s3UrlLink,  
              success: function(data) {
                  alert(msg);
                  resolve(true);
              }.bind(this),  
              error: function(xhr, status, err) {  
                console.log(err);
              }.bind(this)  
            });              
          } else {
            console.log('error status ' + xhr.status)            
            reject(xhr.status);
          }
        };
  
        xhr.setRequestHeader('Content-Type', fileInfo.type);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
  
        return xhr.send(fileInfo.data);
      })
    })
  }