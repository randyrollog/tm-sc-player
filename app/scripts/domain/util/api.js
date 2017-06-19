'use strict';

var api;

export default api = {
  get(route) {
    return new Promise((resolve, reject) => {
      let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    
      xhr.open('GET', route);
      xhr.onreadystatechange = () => {
        if (xhr.readyState > 3 && xhr.status === 200) {
          resolve(xhr.response);
        }
      };
      
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
    });
  }
}