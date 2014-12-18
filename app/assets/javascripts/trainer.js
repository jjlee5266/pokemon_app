var Me = function(id){
  this.id = id,
  this.username;
  this.pokemons;
  var me =this;
  $.get('/trainers/' + id +'.json').done(function(data){
          me.username = data[0].username;
          me.pokemons = data[1];
          for (var i = 0; i < data[1].length; i++){
                me.pokemons[i].faint = false;
              }
          // for (var i = 0; i < me.pokemons.length; i++){
          //   var integer = i;
            $.get('/pokemons/'+ me.pokemons[0].api_ref + '/pokemon/fetch').done(function(data){
                me.pokemons[0].randomMoves = [];
              for (var i =0; i < 4; i++){
                var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
                me.pokemons[0].randomMoves.push(random);
              }
            });
      });
};

Me.prototype.pokeswitch = function(index){
  // this.pokemons[index];
  game.pokemonOut = game.stage[0].pokemons[index];
  $('.textarea').append("\n" + game.stage[0].username + " sends out " + game.pokemonOut.name).animate({scrollTop: 600});
    // if (game.pokemonOut.randomMoves === []){
    game.pokemonOut.randomMoves = [];
    $.get('/pokemons/'+ game.pokemonOut.api_ref + '/pokemon/fetch').done(function(data){
      for (var i =0; i < 4; i++){
        var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
        game.pokemonOut.randomMoves.push(random);
      }
    game.assign();
    game.checkFirstMove();
    });
  // }
};


Me.prototype.catch = function(){
  // add if statement with MAth.random, var chances
  // nickname

  var takenPosition = game.stage[0].pokemons.map(function(num){
    return num.position;
  }).sort().pop();
  var position = takenPosition + 1;

  var catchPokemon = {
    pokemon: {
      name: game.stage[1].name,
      api_ref: game.stage[1].id,
      hp: game.stage[1].hp,
      speed: game.stage[1].speed,
      trainer_id: this.id,
      position: position,
      max_hp: game.stage[1].max_hp,
      battle_img: "/assets/pokemon-main-sprites/yellow/back/" + game.stage[1].id + ".png"
    }
  };
  game.stage[0].pokemons.push(catchPokemon.pokemon);
    // game.stage.pokemons.push(catchPokemon.pokemon);
  $.post('/pokemons', catchPokemon).done(function(){
    $('#gameConsole').remove();
  });
  // .done(); close window
};
