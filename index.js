'use strict';
document.querySelector('.ctverecky').addEventListener('click', (event) => {
  if (jePolePrazdne(event.target)) {
    zobrazTah(kdoJeNaTahu(), event.target);
    vymenaHrace();
  } else {
    console.log('už tady něco je');
  }
});

const jePolePrazdne = (pole) => {
  if (pole.classList.contains('ikon_c') || pole.classList.contains('ikon_s')) {
    return false;
  } else {
    return true;
  }
};

const kdoJeNaTahu = () => {
  return document.querySelector('.ikon_circle').attributes.alt.value;
};

const vymenaHrace = () => {
  if (kdoJeNaTahu() === 'circle') {
    document.querySelector('.ikon_circle').attributes.alt.value = 'cross';
    document.querySelector('.ikon_circle').attributes.src.value =
      'images/cross.svg';
  } else {
    document.querySelector('.ikon_circle').attributes.alt.value = 'circle';
    document.querySelector('.ikon_circle').attributes.src.value =
      'images/circle.svg';
  }
};

const zobrazTah = (symbol, pole) => {
  if (symbol === 'circle') {
    pole.classList.add('ikon_c');
  } else {
    pole.classList.add('ikon_s');
  }
};
