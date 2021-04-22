'use strict';

document.querySelector('.ctverecky').addEventListener('click', (event) => {
  zobrazTah(kdoJeNaTahu(), event.target);
  if (zjistiVyhru()) {
    console.log('vyhra');
  } else {
    vymenaHrace();
  }
});

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
  }

  pole.disabled = 'true';
  pole.style.cursor = 'not-allowed';
};

const zjistiVyhru = () => {
  let aktualniStavHry = [];
  document.querySelectorAll('.ctverecky .radek').forEach((radekElm) => {
    let radek = [];
    radekElm.querySelectorAll('button').forEach((btnElm) => {
      const vysledek = kdoJeNapoli(btnElm);
      radek.push(vysledek); /* ulozi se do radku */
    });
    aktualniStavHry.push(radek); /* vyplni radkama hru*/
  });

  let vyhra = false;
  let souradniceRadek = 0;

  while (souradniceRadek < 10 && !vyhra) {
    let souradniceSloupec = 0;
    while (souradniceSloupec < 5 && !vyhra) {
      vyhra = testVyhryVRadku(
        aktualniStavHry,
        souradniceRadek,
        souradniceSloupec,
      );
      souradniceSloupec++;
    }
    souradniceRadek++;
  }

  let souradniceSloupec = 0;
  while (souradniceSloupec < 10 && !vyhra) {
    let souradniceRadek = 0;
    while (souradniceRadek < 5 && !vyhra) {
      vyhra = testVyhryVeSloupci(
        aktualniStavHry,
        souradniceSloupec,
        souradniceRadek,
      );
      souradniceRadek++;
    }
    souradniceSloupec++;
  }

  souradniceSloupec = 0;
  while (souradniceSloupec < 5 && !vyhra) {
    let souradniceRadek = 0;
    while (souradniceRadek < 5 && !vyhra) {
      vyhra = testVyhryVDiagonale(
        aktualniStavHry,
        souradniceSloupec,
        souradniceRadek,
      );
      souradniceRadek++;
    }
    souradniceSloupec++;
  }

  return vyhra;
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

/* testuje vyhru v jednom radku z prvni pozice*/

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

const testVyhryVeSloupci = (
  aktualniStavHry,
  souradniceRadek,
  souradniceSloupec,
) => {
  const symbolPolicka = aktualniStavHry[souradniceRadek][souradniceSloupec];
  if (symbolPolicka === 'o' || symbolPolicka === 'x') {
    if (
      aktualniStavHry[souradniceRadek + 1][souradniceSloupec] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek + 2][souradniceSloupec] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek + 3][souradniceSloupec] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek + 4][souradniceSloupec] === symbolPolicka
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const testVyhryVDiagonale = (
  aktualniStavHry,
  souradniceRadek,
  souradniceSloupec,
) => {
  const symbolPolicka = aktualniStavHry[souradniceRadek][souradniceSloupec];
  if (symbolPolicka === 'o' || symbolPolicka === 'x') {
    if (
      aktualniStavHry[souradniceRadek + 1][souradniceSloupec + 1] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek + 2][souradniceSloupec + 2] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek + 3][souradniceSloupec + 3] ===
        symbolPolicka &&
      aktualniStavHry[souradniceRadek + 4][souradniceSloupec + 4] ===
        symbolPolicka
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
