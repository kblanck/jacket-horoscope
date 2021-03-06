$(() => {

/* Sets variables for the modal div and the modal div to which contents will be appended:*/
  const $modalDiv = $('#modal').css('display', 'none');
  const $modalContentDiv = $('#modal-content');

/* Event handlers */
  const openModal = () => {
    $modalDiv.css('display', 'flex');
    $modalDiv.css('background-color', 'rgba(0,0,0,0.6)');
  }

  const closeModal = $('#modal-close').on('click', () => {
    $('#modal').css('display', 'none');
    location.reload(true);
  })

/* Defines the action that takes place when the "See my jacket" button is clicked:*/
  $('.button').on('click', (e) => {

    e.preventDefault();

    openModal();

    const $zip = $('#zip').val();
    console.log($zip);

  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?zip=${$zip},us&appid=7fa87af9efde6d7183d84d7ce869e1b2&units=imperial`,
    type: "GET",
  }).then(
    (data) => {
      const temp = Math.round(data.main.feels_like);
      const isItRaining = () => {
        if (data.weather[0].main == 'Rain'){
          console.log('Raining');
        } else {
          console.log('Not raining');
        }
      }
      isItRaining(); /*This function was in use for a possible rain variable.*/
      if (temp <= 10) {
        $modalContentDiv.append('<img id="onesie" src="./imgs/onesie.png">').append(`Oh my God, it feels like ${temp}° outside. Stay inside and maybe wear this onesie.`)
      } else if (temp > 10 && temp <= 25) {
          $modalContentDiv.append('<img id="sleeping-bag" src="./imgs/sleeping-bag.png">').append(`Yikes, it feels like ${temp}° outside. Grab that sleeping bag coat.`);
        } else if (temp > 25 && temp <= 39) {
          $modalContentDiv.append('<img id="down" src="./imgs/down.png">').append(`Yeah, we wouldn't say it's warm (because it feels like ${temp}° out there). Get that down coat on.`);
          { if (data.weather[0].main === 'Rain') {
            $modalContentDiv.append(` And bring an umbrella.`);
            }
          }
        } else if (temp > 39 && temp <= 49) {
          $modalContentDiv.append('<img id="peacoat" src="./imgs/peacoat.png">').append(`Not so bad! It feels like ${temp}° out there. Grab that wool coat.`);
          { if (data.weather[0].main === 'Rain') {
            $modalContentDiv.append(` And bring an umbrella.`);
            }
          }
        } else if (temp > 49 && temp <= 59) {
          $modalContentDiv.append('<img id="bomber" src="./imgs/bomber.png">').append(`Oooh. In our opinion, ${temp}° is the PERFECT walking temp. Break out that bomber today!`);
          { if (data.weather[0].main === 'Rain') {
            $modalContentDiv.append(` And bring an umbrella.`);
            }
          }
        } else if (temp > 59 && temp <= 68) {
          $modalContentDiv.append('<img id="denim" src="./imgs/denim.png">').append(`We love a balmy ${temp}°. All you need is a denim jacket today, honey!`);
          { if (data.weather[0].main === 'Rain') {
            $modalContentDiv.append(` And bring an umbrella.`);
            }
          }
        } else if (temp > 68 && temp <= 74) {
          $modalContentDiv.append('<img id="hoodie" src="./imgs/hoodie.png">').append(`It's ${temp}° where you are?? Girl, all you need is a hoodie! Go enjoy your day!`);
          { if (data.weather[0].main === 'Rain') {
            $modalContentDiv.append(` And bring an umbrella!`);
            }
          }
        } else if (temp > 74 && temp <= 95) {
          $modalContentDiv.append('<img id="t-shirt" src="./imgs/t-shirt.png">').append(`Wow, at ${temp}°, winter is not known where you are. Throw on a T-shirt and enjoy your year-round summer!`);
          { if (data.weather[0].main === 'Rain') {
            $modalContentDiv.append(` And bring an umbrella!`);
            }
        }
      } else if (temp === NaN) {
          $modalContentDiv.append(`This zip code doesn't exist!`);
          console.log(`testing out temp`);
        }
      },
    (error) => {
      $modalContentDiv.append('Oops! This zip code is not recognized.')
      // /*I removed this error, as it was refreshing oddly on mobile devices. I have yet to figure out a better way to display errors to the users.*/
    })
    }
  )
})
