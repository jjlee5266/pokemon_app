function Pokemon(id){
  this.id = id;
  this.name;
  this.nickname;
  this.hp;
  this.max_hp;
  this.faint = false;
  this.moves = [];
  var pokemon = this;
   $.get('/pokemons/' + id + '/pokemon/fetch').done(function(data){
      pokemon.speed = data[0].speed;
      pokemon.hp = data[0].hp;
      pokemon.max_hp = data[0].hp;
      pokemon.name = data[0].name;
      $('#pokeName').text(pokemon.name);
      $('#pokeHp').text('Hp:' + pokemon.hp);
      $('#opponentHealth').val(pokemon.hp).attr('max',pokemon.hp);

    for (var i =0; i < 4; i++){
      var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
      pokemon.moves.push(random);
    }
    $('#pokeImg').attr('src', data[1])
    game.checkFirstMove();
    $('.textarea').append("Wild " + pokemon.name + " appears");
    $('.textarea').append("\nYou send out " + game.pokemonOut.name);
    });
}
Pokemon.prototype.attack = function(move){
  // var uri_move = move.resource_uri;
  // var id = uri_move.replace("/api/v1/move/","").replace('/','');
  $.get('/pokemons/' + move + '/move/fetch').done(function(data){
    pokeattack(data);
  });
};

var pokeattack = function(data){
  // console.log(data);
  // console.log(this);
  // console.log(data.name);
  var damage = (data.power);
  return damage;


};
