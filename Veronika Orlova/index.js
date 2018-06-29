/*---------Класс Персонаж-----------*/
function Character(type, name, aHeroOrAMonster){
  this.type = type;
  this.life = type.maxLife;
  this.counter = 2;
  this.name = name;
  this.isDrunk = false;
  this.aHeroOrAMonster = aHeroOrAMonster;
}

Character.prototype.getClass_name = function() {
  return this.type.class_name;
}

Character.prototype.getName = function() {
  return this.name;
}

Character.prototype.getLife = function() {
  return this.life;
}

Character.prototype.getAHeroOrAMonster = function() {
  return this.aHeroOrAMonster;
}

Character.prototype.getIsDrunk = function() {
  return this.isDrunk;
}

/* Атака this на obj*/
Character.prototype.attack = function(obj) {
  obj.changeLife(this.getDamage());
}

Character.prototype.isAlive = function() {
  return this.life > 0;
}

Character.prototype.shouldUseSkill = function() {
  return (this.life < this.type.maxLife/2 && this.counter > 0); 
}

Character.prototype.setIsDrunk = function() {
  this.isDrunk = true;
}

Character.prototype.ifItsDrunk = function() {
  if(this.isDrunk)
    return ' Хитрый';
  else
    return '';
}

/*Вероятность 25%, что участник примет зелье*/
Character.prototype.drinkAPotion = function() {
  var chance = getRandomArbitrary(1, 5);
  if (chance === 4) {
    this.setIsDrunk();
    console.log('    решивший принять зелье и отныне зовущийся хитрым');
  }
}

/* Получение урона с учетом скила */
Character.prototype.changeLife = function(dmg) {
  if (this.shouldUseSkill() && ((this.getAHeroOrAMonster() === 'hero' && !this.getIsDrunk()) ||
                                (this.getAHeroOrAMonster() === 'monster' && this.getIsDrunk()))) {
    console.log(this.getName() + ' использует способность класса и остается неуезвивым');
    this.counter--;   
  } else {
      this.life -= dmg;
    } 
}

/*C учетом скила*/
Character.prototype.getDamage = function() {
  if (this.shouldUseSkill() && ((this.getAHeroOrAMonster() === 'hero' && this.getIsDrunk()) ||
                                (this.getAHeroOrAMonster() === 'monster' && !this.getIsDrunk()))) {
    console.log(this.getName() + ' использует способность класса и наносимый им урон увеличивается в 2 раза');
    this.counter--;
    return this.type.damage*2;
  }
  return this.type.damage;
}

/*---------Класс Герой-----------*/
function Hero () {
  Character.apply(this, arguments);
}

Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.getGoodNames = function() {
  return Hero.goodNames;
}

Hero.THIEF = {maxLife: 50, damage: 10, class_name: "Вор"}
Hero.WARRIOR = {maxLife: 70, damage: 6, class_name: "Воин"}
Hero.WIZARD = {maxLife: 30, damage: 14, class_name: "Волшебник"}
Hero.arrayOfClasses = [Hero.THIEF, Hero.WARRIOR, Hero.WIZARD]
Hero.goodNames = ['Сандрзера', 'Даволера', 'Джейгуст', 'Джонда', 'Годцер',
                  'Бетдерса', 'Сандртон', 'Джейцер', 'Уторонд', 'Андузера']
Hero.names = ['Сандрзера', 'Даволера', 'Джейгуст', 'Джонда', 'Годцер',
              'Бетдерса', 'Сандртон', 'Джейцер', 'Уторонд', 'Андузера',
              'Джейромби', 'Гилрик', 'Годна', 'Каласия', 'Керинса', 'Анса']

function heroFactory(type) {
  var nameNumber = getRandomArbitrary(0, Hero.names.length);
  return new Hero(type, Hero.names[nameNumber], 'hero');
}

/*---------Класс Монстр-----------*/
function Monster () {
  Character.apply(this, arguments);
}

Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.getGoodNames = function() {
  return Monster.goodNames;
}

Monster.GOBLIN = {maxLife: 50, damage: 10, class_name: "Гоблин"}
Monster.ORC_CROWD = {maxLife: 70, damage: 6, class_name: "Толпа орков"}
Monster.VAMPIRE = {maxLife: 30, damage: 14, class_name: "Вампир"}
Monster.arrayOfClasses = [Monster.GOBLIN, Monster.ORC_CROWD, Monster.VAMPIRE]
Monster.goodNames = ['Эмиель Регис Рогеллек Терзиефф-Годфрой', 'Детлафф вар дер Эретайн', 
                     'Хагмар', 'Ориана', 'Зелбибур', 'Скузжетов', 'Пигатон', 'Газбабахс', 
                     'Хамрабахс', 'Стелзлатель']
Monster.names = ['Эмиель Регис Рогеллек Терзиефф-Годфрой', 'Детлафф вар дер Эретайн', 
                 'Хагмар', 'Ориана', 'Зелбибур', 'Скузжетов', 'Пигатон', 'Газбабахс',
                 'Хамрабахс', 'Стелзлатель', 'Гровевид', 'Зарерикс', 'Гобгатяп',
                 'Взрызагс', 'Темзеганс', 'Гризларезли']

function monsterFactory(type){
  var nameNumber = getRandomArbitrary(0, Monster.names.length);
  return new Monster(type, Monster.names[nameNumber], 'monster');
}

/*------Класс Игра--------*/
function Game(competitor1, competitor2) {
  this.competitor1 = competitor1;
  this.competitor2 = competitor2;
}

Game.prototype.getCompetitor1 = function() {
  return this.competitor1;
}

Game.prototype.getCompetitor2 = function() {
  return this.competitor2;
}

Game.prototype.fight = function () {
  var competitor1name = this.competitor1.ifItsDrunk() + ' ' + this.competitor1.getClass_name() +
      " по имени " + this.competitor1.getName();
  var competitor2name = this.competitor2.ifItsDrunk() + ' ' + this.competitor2.getClass_name() +
              " по имени " + this.competitor2.getName();
  console.log('\n------------\nСражаются' + competitor1name + ' (жизни: ' + this.competitor1.getLife() +
              '; урон ' + this.competitor1.getDamage() + ')' + ' и' + competitor2name + ' (жизни: ' + 
              this.competitor2.getLife() + '; урон ' + this.competitor2.getDamage() + ')');
  while (this.competitor1.isAlive() && this.competitor2.isAlive()) {
    console.log('Бьет ' + this.competitor1.getName());
    console.log(this.competitor1.getName() + ': ' + this.competitor1.getLife() +
                'Хп;  ' + this.competitor2.getName() + ': '  + this.competitor2.getLife() + 'Хп');
    this.competitor1.attack(this.competitor2);
    console.log('Бьет ' + this.competitor2.getName());
    console.log(this.competitor1.getName() + ': ' + this.competitor1.getLife() +
                'Хп;  ' + this.competitor2.getName() + ': '  + this.competitor2.getLife() + 'Хп');
    this.competitor2.attack(this.competitor1);
  }
  console.log(this.competitor1.getName() + ': ' + this.competitor1.getLife() +
            'Хп;  ' + this.competitor2.getName() + ': '  + this.competitor2.getLife() + 'Хп');
  if(this.competitor1.isAlive()) {
    console.log('^^^^^^^^^^^^^\nПобедил' + competitor1name);
    return this.competitor1;
  }
  else if(this.competitor2.isAlive()) {
    console.log('^^^^^^^^^^^^^\nПобедил' + competitor2name);
    return this.competitor2;
  }
  else {
    console.log('^^^^^^^^^^^^^\nОбъявляется нечья');
    return "noone";
  }
}


/*-------Класс Турнир-------*/
function Tournament(stack) {
  this.stack = stack;
  this.winner = "no winner";
}

Tournament.prototype.getStack = function() {
  return this.stack;
}

Tournament.prototype.setStack = function(stack) {
  this.stack = stack;
}

Tournament.prototype.faceControlHelpfulFunc = function(stack, amont){
  for (var i = 0; i < amont; i++) {
    console.log(stack[i].getClass_name() + " по имени " + stack[i].getName());
    stack[i].drinkAPotion();
    if(stack[i].getGoodNames().indexOf(stack[i].getName()) != -1)
      console.log("        Допущен по турнира");
    else {
      console.log("        Не допущен по турнира");
      stack.splice(i, 1);
      i--;
      amont--;
    }
  }
  return stack;
}

Tournament.prototype.faceControl = function() {
  console.log("Зарегистрировавшиеся участники:");
  this.setStack(this.faceControlHelpfulFunc(this.getStack(), this.getStack().length));
}

Tournament.prototype.startTournament = function() {
  console.log('\nСписок участников в порядке выхода на арену:');
  for (var i = 0; i < this.getStack().length; i++) {
    var competitor = this.getStack()[this.getStack().length - 1 - i];
    console.log((i + 1) + '. ' + competitor.ifItsDrunk() + ' ' + competitor.getClass_name() + 
                " по имени " + competitor.getName() + ' (жизни: ' + competitor.getLife() + '; урон ' +
               competitor.getDamage() + ')');
    
  }
  console.log("\nТурнир начинается!");
  while(this.getStack().length > 1) {
    var competitor1 = this.getStack().pop();
    var competitor2 = this.getStack().pop();
    var newGame = new Game(competitor1, competitor2);
    var winner = newGame.fight();
    if(winner !== "noone") {
      winner.life = winner.type.maxLife;
      winner.counter = 2;
      this.getStack().push(winner);
    }
  }
  if (this.getStack().length === 1) {
    var winnerOfTournament = this.getStack()[0];
    this.winner = winnerOfTournament.ifItsDrunk() + ' ' + winnerOfTournament.getClass_name() +
      " по имени " + winnerOfTournament.getName();
    console.log('\n*************\nПобедитель турнира: ' + this.winner);
  }
  else
    console.log('\n*************\nУвы, достойного не нашлось');
}

/*----------------*/
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function registration(N) {
  console.log('Объявляется турнир на ' + N + ' участников!');
  var stack = [];
  for (var i = 0; i < N; i++) {
    var monsterOrHero = getRandomArbitrary(0, 2);
    if(monsterOrHero === 0)
      stack.push(heroFactory(Hero.arrayOfClasses[getRandomArbitrary(0, 3)]));
    else
      stack.push(monsterFactory(Monster.arrayOfClasses[getRandomArbitrary(0, 3)]));
  }
  return stack;
}

var myTournament = new Tournament(registration(10));
myTournament.faceControl();
myTournament.startTournament();