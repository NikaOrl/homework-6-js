/*---------����� ��������-----------*/
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

/* ����� this �� obj*/
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
    return ' ������';
  else
    return '';
}

/*����������� 25%, ��� �������� ������ �����*/
Character.prototype.drinkAPotion = function() {
  var chance = getRandomArbitrary(1, 5);
  if (chance === 4) {
    this.setIsDrunk();
    console.log('    �������� ������� ����� � ������ ��������� ������');
  }
}

/* ��������� ����� � ������ ����� */
Character.prototype.changeLife = function(dmg) {
  if (this.shouldUseSkill() && ((this.getAHeroOrAMonster() === 'hero' && !this.getIsDrunk()) ||
                                (this.getAHeroOrAMonster() === 'monster' && this.getIsDrunk()))) {
    console.log(this.getName() + ' ���������� ����������� ������ � �������� ����������');
    this.counter--;   
  } else {
      this.life -= dmg;
    } 
}

/*C ������ �����*/
Character.prototype.getDamage = function() {
  if (this.shouldUseSkill() && ((this.getAHeroOrAMonster() === 'hero' && this.getIsDrunk()) ||
                                (this.getAHeroOrAMonster() === 'monster' && !this.getIsDrunk()))) {
    console.log(this.getName() + ' ���������� ����������� ������ � ��������� �� ���� ������������� � 2 ����');
    this.counter--;
    return this.type.damage*2;
  }
  return this.type.damage;
}

/*---------����� �����-----------*/
function Hero () {
  Character.apply(this, arguments);
}

Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.getGoodNames = function() {
  return Hero.goodNames;
}

Hero.THIEF = {maxLife: 50, damage: 10, class_name: "���"}
Hero.WARRIOR = {maxLife: 70, damage: 6, class_name: "����"}
Hero.WIZARD = {maxLife: 30, damage: 14, class_name: "���������"}
Hero.arrayOfClasses = [Hero.THIEF, Hero.WARRIOR, Hero.WIZARD]
Hero.goodNames = ['���������', '��������', '��������', '������', '������',
                  '��������', '��������', '�������', '�������', '��������']
Hero.names = ['���������', '��������', '��������', '������', '������',
              '��������', '��������', '�������', '�������', '��������',
              '���������', '������', '�����', '�������', '�������', '����']

function heroFactory(type) {
  var nameNumber = getRandomArbitrary(0, Hero.names.length);
  return new Hero(type, Hero.names[nameNumber], 'hero');
}

/*---------����� ������-----------*/
function Monster () {
  Character.apply(this, arguments);
}

Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.getGoodNames = function() {
  return Monster.goodNames;
}

Monster.GOBLIN = {maxLife: 50, damage: 10, class_name: "������"}
Monster.ORC_CROWD = {maxLife: 70, damage: 6, class_name: "����� �����"}
Monster.VAMPIRE = {maxLife: 30, damage: 14, class_name: "������"}
Monster.arrayOfClasses = [Monster.GOBLIN, Monster.ORC_CROWD, Monster.VAMPIRE]
Monster.goodNames = ['������ ����� �������� ��������-�������', '������� ��� ��� �������', 
                     '������', '������', '��������', '���������', '�������', '���������', 
                     '���������', '�����������']
Monster.names = ['������ ����� �������� ��������-�������', '������� ��� ��� �������', 
                 '������', '������', '��������', '���������', '�������', '���������',
                 '���������', '�����������', '��������', '��������', '��������',
                 '��������', '���������', '�����������']

function monsterFactory(type){
  var nameNumber = getRandomArbitrary(0, Monster.names.length);
  return new Monster(type, Monster.names[nameNumber], 'monster');
}

/*------����� ����--------*/
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
      " �� ����� " + this.competitor1.getName();
  var competitor2name = this.competitor2.ifItsDrunk() + ' ' + this.competitor2.getClass_name() +
              " �� ����� " + this.competitor2.getName();
  console.log('\n------------\n���������' + competitor1name + ' (�����: ' + this.competitor1.getLife() +
              '; ���� ' + this.competitor1.getDamage() + ')' + ' �' + competitor2name + ' (�����: ' + 
              this.competitor2.getLife() + '; ���� ' + this.competitor2.getDamage() + ')');
  while (this.competitor1.isAlive() && this.competitor2.isAlive()) {
    console.log('���� ' + this.competitor1.getName());
    console.log(this.competitor1.getName() + ': ' + this.competitor1.getLife() +
                '��;  ' + this.competitor2.getName() + ': '  + this.competitor2.getLife() + '��');
    this.competitor1.attack(this.competitor2);
    console.log('���� ' + this.competitor2.getName());
    console.log(this.competitor1.getName() + ': ' + this.competitor1.getLife() +
                '��;  ' + this.competitor2.getName() + ': '  + this.competitor2.getLife() + '��');
    this.competitor2.attack(this.competitor1);
  }
  console.log(this.competitor1.getName() + ': ' + this.competitor1.getLife() +
            '��;  ' + this.competitor2.getName() + ': '  + this.competitor2.getLife() + '��');
  if(this.competitor1.isAlive()) {
    console.log('^^^^^^^^^^^^^\n�������' + competitor1name);
    return this.competitor1;
  }
  else if(this.competitor2.isAlive()) {
    console.log('^^^^^^^^^^^^^\n�������' + competitor2name);
    return this.competitor2;
  }
  else {
    console.log('^^^^^^^^^^^^^\n����������� �����');
    return "noone";
  }
}


/*-------����� ������-------*/
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
    console.log(stack[i].getClass_name() + " �� ����� " + stack[i].getName());
    stack[i].drinkAPotion();
    if(stack[i].getGoodNames().indexOf(stack[i].getName()) != -1)
      console.log("        ������� �� �������");
    else {
      console.log("        �� ������� �� �������");
      stack.splice(i, 1);
      i--;
      amont--;
    }
  }
  return stack;
}

Tournament.prototype.faceControl = function() {
  console.log("�������������������� ���������:");
  this.setStack(this.faceControlHelpfulFunc(this.getStack(), this.getStack().length));
}

Tournament.prototype.startTournament = function() {
  console.log('\n������ ���������� � ������� ������ �� �����:');
  for (var i = 0; i < this.getStack().length; i++) {
    var competitor = this.getStack()[this.getStack().length - 1 - i];
    console.log((i + 1) + '. ' + competitor.ifItsDrunk() + ' ' + competitor.getClass_name() + 
                " �� ����� " + competitor.getName() + ' (�����: ' + competitor.getLife() + '; ���� ' +
               competitor.getDamage() + ')');
    
  }
  console.log("\n������ ����������!");
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
      " �� ����� " + winnerOfTournament.getName();
    console.log('\n*************\n���������� �������: ' + this.winner);
  }
  else
    console.log('\n*************\n���, ���������� �� �������');
}

/*----------------*/
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function registration(N) {
  console.log('����������� ������ �� ' + N + ' ����������!');
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