$(document).ready(function(){
  retrieveIdeas()
});

$('body').on('click', '.delete', function(){
  removeFromStorage(this)
})

$('.save-button').on('click', function(){
  var title = $('.title').val()
  var body  = $('.body').val()
  var idea = new Idea(title, body)
  idea.setLocalStorage()
})

function removeFromStorage(idea) {
  var ideaArray = idea.parentElement.children
  var storage = JSON.parse(localStorage.getItem('ideas'))
  for (var i = 0; i < storage.length; i++) {
    if (storage[i].title === ideaArray[0].innerText) {
      storage.slice(i)
      debugger;
      localStorage.setItem('ideas', storage)
    }
  }
}

function retrieveIdeas(){
  if (localStorage.getItem('ideas') === null) {
    localStorage.setItem('ideas', '[]')
  } else {
    var ideas = JSON.parse(localStorage.getItem('ideas'))
    for (var i = 0; i < ideas.length; i++) {
      displayIdeas(ideas[i], i)
    }
  }
}

function displayIdeas(idea, id) {
  $('.list-container').prepend('<div class="idea-container"><p class="new-title-input" contenteditable="true">' + idea.title + '</p><i class="fa fa-times-circle-o delete" aria-hidden="true"></i><p class="new-body-input" contenteditable="true">' + idea.idea + '</p><div class="quality-style"><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i><p class="quality">quality: ' + '<span class="quality-value">' + idea.quality + '</span>' + '</p></div></div>');
  // <div class="list-item"' + 'id="' + id + '">
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
