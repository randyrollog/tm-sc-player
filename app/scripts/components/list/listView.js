'use strict';

import date from '../../domain/util/date';

////////////////
// helpers
////////////////
var buildContentDom = function(content) {
  let d = document.createElement('div');
  let p = document.createElement('p');

  p.innerText = content;
  d.classList.add('list-content');
  d.appendChild(p);
  return d;
};

// Need to abstract into own helper module
var initLocalStorage = function() {
  var a = [];
  a.push(JSON.parse(localStorage.getItem('interested')));

  localStorage.setItem('interested', JSON.stringify(a));   
};

var saveToLocalStorage = function(data) {
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('interested'));
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('interested', JSON.stringify(a));
};

var removeFromLocalStorage = function(data) {
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('interested'));

    var index = a.indexOf(data);
    if (index > -1) {
      a.splice(index, 1);
    }

    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('interested', JSON.stringify(a));
};
//////////////////////////////////////


export default class ListView {
  constructor(data) {
    this.data = data.projects;

    this.onReady_();
  }

  onReady_() {
    if (!JSON.parse(localStorage.getItem('interested'))) {
      initLocalStorage();  
    }
    
    this.setupDom();
    this.render();
  }

  setupDom() {
    this.elem_ = document.querySelector('.list-container');
  }

  // builds row by creating and 
  // injecting row content
  buildRow(data, index) {
    let row = document.createElement('li');
    let inner = document.createElement('div');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let interest = document.createElement('div');
    let contentArray = [
      data.title,
      data.castingDirector,
      data.type,
      data.formattedStartDate,
      data.formattedPostDate
    ].map(c => {
      return buildContentDom(c);
    });
    
    row.classList.add('list-item');
    inner.classList.add('list-inner');

    checkbox.classList.add('list-input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'interested');
    checkbox.setAttribute('id', `bd-${index}`);
    
    label.classList.add('list-label');
    label.setAttribute('for', `bd-${index}`);

    // Persist the checkbox!!!
    var ls = JSON.parse(localStorage.getItem('interested'));
    if (ls.indexOf(`bd-${index}`)  > -1) {
      checkbox.setAttribute('checked', true);
    }
    
    // Bind change event
    checkbox.onchange = function() {
      if( this.checked ) {
        saveToLocalStorage(`bd-${index}`);
      } else {
        removeFromLocalStorage(`bd-${index}`);
      }
    };

    interest.classList.add('list-content');
    interest.appendChild(checkbox);
    interest.appendChild(label);

    contentArray.forEach(con => {
      inner.appendChild(con);
    });

    inner.appendChild(interest);
    row.appendChild(inner);

    return row;
  }

  // sort rows by most recent
  sortRows(rows) {
    return rows.sort((a, b) => {
      return a.added - b.added;
    }).reverse();
  }

  render() {
    // first sort rows
    let rows = this.sortRows(this.data);

    // then render rows
    rows.forEach((d, i) => {
      d.formattedPostDate = date.getRelativeTime(d.added);
      d.formattedStartDate = date.getFormattedDate(d.startDate);
      
      let r = this.buildRow(d, i);
      
      this.elem_.appendChild(r);
    });
  }
}