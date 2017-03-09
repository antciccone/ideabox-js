$(document).ready(function(){
  // retrieveIdeas()
});

$('.save-button').on('click', function(){
  var title = $('.title').val()
  var body  = $('.body').val()

  var idea = new Idea(title, body)
  idea.setLocalStorage()
})

function retrieveIdeas(){
  var ideas = JSON.parse(localStorage.getItem('ideas'))
  for (var i = 0; i < ideas.length; i++) {
    displayIdeas(ideas[i], i)
  }
}

function displayIdeas(idea, id) {
  $('.list-container').prepend('<div class="list-item"' + 'id="' + id + '"><li class="title-style"><p class="new-title-input" contenteditable="true">' + idea.title + '</p><button type="button" class="remove-button btn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button></li><li class="body-style"><p class="new-body-input" contenteditable="true">' + idea.body + '</p></li><div class="quality-style"><button type="button" class="upvote btn"></button><button type="button" class="downvote btn"></button><p class="quality">quality: ' + '<span class="quality-value">' + idea.quality + '</span>' + '</p></div></div>');
}


function Idea(title, idea) {
  this.title = title
  this.idea = idea
}

Idea.prototype.setLocalStorage = function(){
  localStorage.setItem('ideas', '[]')
  var storage = JSON.parse(localStorage.getItem('ideas'));
  storage.unshift({title: this.title, idea: this.idea})
  localStorage.setItem('ideas', JSON.stringify(storage))
}
