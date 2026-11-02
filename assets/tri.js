// Range chaque expo selon la date du jour (celle de l'ordinateur du visiteur).
// Rien à modifier ici : il suffit que les dates de début et de fin soient justes.
(function () {
  var toutes = document.getElementById('toutes');
  if (!toutes) return;

  var n = new Date();
  var aujourdhui = n.getFullYear() + '-' +
    String(n.getMonth() + 1).padStart(2, '0') + '-' +
    String(n.getDate()).padStart(2, '0');

  var groupes = { 'en-cours': [], 'a-venir': [], 'passees': [] };

  Array.prototype.slice.call(toutes.querySelectorAll('.expo')).forEach(function (el) {
    var debut = el.getAttribute('data-debut');
    var fin = el.getAttribute('data-fin');
    if (debut > aujourdhui) groupes['a-venir'].push(el);
    else if (fin < aujourdhui) groupes['passees'].push(el);
    else groupes['en-cours'].push(el);
  });

  // À venir : la plus proche en premier. Les autres : la plus récente en premier.
  groupes['a-venir'].reverse();

  Object.keys(groupes).forEach(function (id) {
    var section = document.getElementById(id);
    if (!groupes[id].length) return;
    var liste = section.querySelector('.liste');
    groupes[id].forEach(function (el) { liste.appendChild(el); });
    section.hidden = false;
  });

  toutes.hidden = true;
})();
