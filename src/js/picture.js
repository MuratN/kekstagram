'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var caption = [];

var galleryOverlay = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template').content;
var miniPicture = pictureTemplate.querySelector('.picture');
var galleryClose = document.querySelector('.gallery-overlay-close');


var getRandomElement = function(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

for(var i = 1; i < 26; i++) {
  var randomLike = 15 + Math.floor(Math.random() * 185);
  var randomComment = getRandomElement(comments);
  var number = 'photos/' + i + '.jpg';

  caption.push({
    url: number,
    likes: randomLike,
    comments: randomComment
  });
}

var getPicture = function(pic) {
  var pictureElement = miniPicture.cloneNode(true);

  pictureElement.querySelector('.picture-src').src = pic.url;
  pictureElement.querySelector('.picture-likes').textContent = pic.likes;
  pictureElement.querySelector('.picture-comments').textContent = pic.comments;

  return pictureElement;
};

var picturesContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var j = 0; j < caption.length; j++) {
  var pictureElement = getPicture(caption[j]);
  pictureElement.setAttribute('data-index', j);
  pictureElement.addEventListener('mousedown', function(evt) {
    var index = evt.currentTarget.getAttribute('data-index');
    console.log(index);
    openPicture(+index);
  });
  pictureElement.addEventListener('keydown', function(evt) {
    evt.preventDefault();
    var index = evt.currentTarget.dataset.index;
    if (evt.keyCode === ENTER_KEYCODE) {
      openPicture(+index);
    }
  });
  fragment.appendChild(pictureElement);
}
picturesContainer.appendChild(fragment);

document.querySelector('.comment').remove('p');

var onPictureEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePicture();
  }
};

var openPicture = function(index) {

  galleryOverlay.querySelector('.comments-count').textContent = caption[index].comments;
  galleryOverlay.querySelector('.likes-count').textContent = caption[index].likes;
  galleryOverlay.querySelector('.gallery-overlay-image').src = caption[index].url;
  galleryOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onPictureEscPress);
};

var closePicture = function() {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onPictureEscPress);
};

galleryClose.addEventListener('mousedown', function() {
  closePicture();
});

galleryClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePicture();
  }
});

