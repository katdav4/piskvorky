'use strict';

document.querySelector('.ctverecky').addEventListener('click', (event) => {
  if (jePolePrazdne(event.target)) {
    zobrazTah(kdoJeNaTahu(), event.target);
    vymenaHrace();
  } else {
    alert('osazeno');
  }
  kdoVyhral();
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
  }
  if (symbol === 'cross') {
    pole.classList.add('ikon_s');
  } else {
    pole.disabled = 'true';
  }
};

const kdoVyhral = () => {
  let aktualniStavHry = [];
  document.querySelectorAll('.ctverecky .radek').forEach((radekElm) => {
    let radek = [];
    radekElm.querySelectorAll('button').forEach((btnElm) => {
      const vysledek = kdoJeNapoli(btnElm);
      radek.push(vysledek); /* ulozi se do radku */
    });
    aktualniStavHry.push(radek);
  });
  console.log(aktualniStavHry);

  let souradniceRadek = 0;
  let souradniceSloupec = 0;
  let vyhra = false;
  while (souradniceSloupec < 5 && !vyhra) {
    vyhra = testVyhryVRadku(
      aktualniStavHry,
      souradniceRadek,
      souradniceSloupec,
    );
    souradniceSloupec++;
  }

  if (vyhra) {
    console.log('vyhra');
  }
};

const kdoJeNapoli = (btnElm) => {
  if (btnElm.classList.contains('ikon_c')) {
    return 'o';
  } else if (btnElm.classList.contains('ikon_s')) {
    return 'x';
  } else {
    return '';
  }
};

const testVyhryVRadku = (
  aktualniStavHry,
  souradniceRadek,
  souradniceSloupec,
) => {
  const symbolPolicka = aktualniStavHry[souradniceRadek][souradniceSloupec];
  if (symbolPolicka === 'o' || symbolPolicka === 'x') {
    if (
      aktualniStavHry[souradniceRadek][souradniceSloupec + 1] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek][souradniceSloupec + 2] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek][souradniceSloupec + 3] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek][souradniceSloupec + 4] === symbolPolicka
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
