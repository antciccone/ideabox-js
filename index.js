$(document).ready(function(){
  retrieveIdeas()
});

$('body').on('click', '.delete', function(){
  removeIdea(this)
})

$('body').on('click', '.up', function(){
  checkQaulity(this)
})

$('body').on('click', '.down', function(){
  checkQaulity(this)
})

$('.save-button').on('click', function(){
  var title = $('.title').val()
  var body  = $('.body').val()
  var idea = new Idea(title, body)
  idea.setLocalStorage()
})

$('body').on("blur", ".new-title-input", function(){
  debugger;
})

$('.search').on('keyup', function(){
  var filter = this.value.toUpperCase();
  var search = $('.idea-container')
  for (i = 0; i < search.length; i++) {
    td = search[i].getElementsByClassName('new-title-input')[0]
    ta = search[i].getElementsByClassName('quality')[0]
    if (td || ta) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || ta.innerHTML.toUpperCase().indexOf(filter) > -1 ) {
        search[i].style.display = "";
       } else {
        search[i].style.display = "none";
       }
     }
   }
})

function checkQaulity(quality) {
  var type = quality.parentElement.children[2].innerText
  if (type === "quality: swill" && quality.className === "fa fa-arrow-circle-o-up up fa-2x") {
    quality.parentElement.children[2].innerText = "quality: plausible"
    updateStorage(quality, "plausible")
  } else if (type === "quality: plausible" && quality.className === "fa fa-arrow-circle-o-up up fa-2x") {
    quality.parentElement.children[2].innerText = "quality: genius"
    updateStorage(quality, "genius")
  } else if (type === "quality: genius" && quality.className === "fa fa-arrow-circle-o-down down fa-2x") {
    quality.parentElement.children[2].innerText = "quality: plausible"
    updateStorage(quality, "plausible")
  } else if (type === "quality: plausible") {
    quality.parentElement.children[2].innerText = "quality: swill"
    updateStorage(quality, "swill")
  }
}

function removeIdea(idea) {
  idea.parentElement.remove()
  var ideaArray = idea.parentElement.children
  var storage = JSON.parse(localStorage.getItem('ideas'))
  for (var i = 0; i < storage.length; i++) {
    if (storage[i].title.trim() === ideaArray[0].innerText.trim()) {
      storage.splice(i, 1)
      localStorage.setItem('ideas', JSON.stringify(storage))
    }
  }
}

function updateStorage(idea, quality) {
  var storage = JSON.parse(localStorage.getItem('ideas'))
  for (var i = 0; i < storage.length; i++) {
    if (storage[i].title.trim() ===  idea.parentElement.parentElement.children[0].innerText.trim()) {
      storage[i].quality = quality
      localStorage.setItem('ideas', JSON.stringify(storage))
    }
  }
}

function retrieveIdeas(){
  if (localStorage.getItem('ideas') === null) {
    localStorage.setItem('ideas', '[]')
  } else {
    var ideas = JSON.parse(localStorage.getItem('ideas')).reverse()
    for (var i = 0; i < ideas.length; i++) {
      displayIdeas(ideas[i], i)
    }
  }
}

function displayIdeas(idea, id) {
  $('.list-container').prepend('<div class="idea-container"><p class="new-title-input" contenteditable="true">' + idea.title + '</p><i class="fa fa-times-circle-o delete fa-2x"" aria-hidden="true"></i><p class="new-body-input" contenteditable="true">' + idea.idea + '</p><div class="quality-style"><i class="fa fa-arrow-circle-o-up up fa-2x"" aria-hidden="true"></i><i class="fa fa-arrow-circle-o-down down fa-2x"" aria-hidden="true"></i><p class="quality">quality: ' + '<span class="quality-value">' + idea.quality + '</span>' + '</p></div></div>');
}
function Idea(title, idea) {
  this.title = title
  this.idea = idea
}

Idea.prototype.setLocalStorage = function(){
  var storage = JSON.parse(localStorage.getItem('ideas'));
  storage.unshift({title: this.title, idea: this.idea, quality: 'swill'})
  localStorage.setItem('ideas', JSON.stringify(storage))
  displayIdeas(storage[0])
}
