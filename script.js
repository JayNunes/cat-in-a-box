const app = {
  api_key: config.api_key,
  open: false,
  currentProfile: null,
  randomCatProfile: null,
  allCats: null,
};

app.getCats = async function () {
  const response = await $.ajax({
    url: "https://api.thecatapi.com/v1/breeds",
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.api_key,
    },
  });
  app.allCats = response;
};

app.getCat = function (allCats) {
  app.currentProfile = app.randomCatProfile(allCats);
};

app.randomCatProfile = function (allCats) {
  let randomProfileIndex = Math.floor(Math.random() * allCats.length);
  return allCats[randomProfileIndex];
};

app.renderCat = function (profile) {
  app.$cat.attr("src", profile.image.url);
  app.$name.html(
    `<span>Breed Type:</span> <a href="https://www.google.com/search?q=${profile.name}+cat" target="_blank" rel="noopener">${profile.name}.</a>`
  );
  app.$description.html(`<span>Description:</span> ${profile.description}`);
  app.$origin.html(`<span>Origin:</span> ${profile.origin}.`);
  app.$temperament.html(`<span>Temperament:</span> ${profile.temperament}.`);
  if (profile.alt_names === undefined) {
    app.$altName.html(``);
  } else if (/^\s*$/.test(profile.alt_names)) {
    app.$altName.html(``);
  } else {
    app.$altName.html(`<span>Alt. Names:</span> ${profile.alt_names}.`);
  }
  app.$text.addClass("visible");
};

app.boxSwitch = function () {
  app.$input.on("click", function () {
    app.open = !app.open;
    if (app.open) {
      app.$box.attr("aria-expanded", "true");
      app.$flap1.addClass("open-flap1");
      app.$flap2.addClass("open-flap2");
      app.$flap3.addClass("open-flap3");
      app.$flap4.addClass("open-flap4");
      app.$h1.addClass("h1-light");
      app.getCat(app.allCats);
      app.renderCat(app.currentProfile);
    } else {
      app.$box.attr("aria-expanded", "false");
      app.$flap1.removeClass("open-flap1");
      app.$flap2.removeClass("open-flap2");
      app.$flap3.removeClass("open-flap3");
      app.$flap4.removeClass("open-flap4");
      app.$text.removeClass("visible");
      app.$h1.removeClass("h1-light");
    }
  });
};

app.init = function () {
  app.$input = $("input");
  app.$h1 = $("h1");
  app.$box = $("#box");
  app.$flap1 = $(".flap1");
  app.$flap2 = $(".flap2");
  app.$flap3 = $(".flap3");
  app.$flap4 = $(".flap4");
  app.$text = $(".text");
  app.$cat = $("#cat");
  app.$name = $("#name");
  app.$altName = $("#alt-name");
  app.$description = $("#description");
  app.$origin = $("#origin");
  app.$temperament = $("#temperament");
  app.boxSwitch();
  app.getCats();
};

$(function () {
  app.init();
});
