import galleryItems from "./app.js";
console.log(galleryItems);

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
};//--------------мвссив ссылок

let activeIndex = null;//-----переменная для индекса активной картинки



const imgCardsMarkup = createImgGalleryMarkup(galleryItems);



function createImgGalleryMarkup(galleryItems) {
  return galleryItems.map((galleryItem) => {
    return `<li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${galleryItem.original}"
                >
                <img
                    class="gallery__image"
                    src="${galleryItem.preview}"
                    data-source="${galleryItem.original}"
                    alt="${galleryItem.description}"
                    />
                </a>
            </li>`;
  });
}//-------- функция, которая преображает входящий массив объектов в разметку. через мап и шаблонную строку
//джоин используем при вставке в хтмл

refs.gallery.insertAdjacentHTML("beforeend", imgCardsMarkup.join(""));//джоин и вставляем в хтмл 



refs.gallery.addEventListener("click", onGalleryClick);//----ловим клик по галерее и используем функцию 



function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }//защита от срабатывания в рандомном месте
  imgCardsMarkup.forEach((element, index) => {
    if (element.includes(event.target.src)) {
      activeIndex = index;
    }
  });
  console.log(activeIndex);
  window.addEventListener("keydown", keyboardManipulation);
  refs.modal.classList.add("is-open");
  refs.modalImg.src = event.target.dataset.source;
}



refs.modal.addEventListener("click", closeModal);

function closeModal() {
  refs.modal.classList.remove("is-open");
  refs.modalImg.src = "";
  refs.modalImg.alt = "";
  window.removeEventListener("keyup", keyboardManipulation);
}





function keyboardManipulation(e) {
  switch (e.key) {
    case activeIndex < galleryItems.length - 1 && "ArrowRight":
      activeIndex += 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case activeIndex > 0 && "ArrowLeft":
      activeIndex -= 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case activeIndex === 0 && "ArrowLeft":
      activeIndex = galleryItems.length - 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case activeIndex === galleryItems.length - 1 && "ArrowRight":
      activeIndex = 0;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case "Escape":
      closeModal();
      break;
    default:
      alert("что-то пошло не так");
  }
}// переключение стрелками
