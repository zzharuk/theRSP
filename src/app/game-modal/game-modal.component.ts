import { Component, Input, OnInit } from '@angular/core';
import { GameItems, UserResult } from '../game-enums.enum';


interface Item {
  // name: string,
  index: number,
  icon: string
}

interface ItemsMap {
  [itemIndex:number]: Item
}


@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})

export class GameModalComponent {
  @Input() UserName: string;
  constructor() {}

  allTheItems: ItemsMap = [
    {
      index: GameItems.Rock,
      icon: "hand-rock"
    },
    {
      index: GameItems.Scissors,
      icon: "cut"
    },
    {
      index: GameItems.Paper,
      icon: "paper-plane"
    },
  ]

  ResultMessage:string = "";
  buttonStartTitle:string = "Play";
  wellcomeMsg:string = "Wellcome";
  aiSideTitle:string = "Ai";
  userSideTitle:string = "Player: ";
  

  
  Game = {
    status: false,
    buttonSelected : -1,
    userSelectedItem: null,
    aiSelectedItem: null,
    aiInterval: null,
    aiIcon: "question",
    userScores: {
      win:0,
      tie:0,
      lose:0,
      total: 0
    },
    resetValues: () => {
      this.ResultMessage = "";
      this.Game.buttonSelected = -1;
    },
    start: () => {
      this.Game.resetValues();
      this.Game.status = true;
      this.Timer.init();
      this.Game.aiChoose();
      this.Game.userScores.total++;
    },
    stop: (user_selected:number) => {
      this.Game.userSelectedItem = user_selected;
      this.Game.buttonSelected = user_selected;
      this.Game.status = false;
      this.Timer.destroyTimer();
      this.Game.aiDestroyInterval();
      this.checkResult([this.Game.userSelectedItem, this.Game.aiSelectedItem]);
    },
    aiChoose: () =>{
      this.Game.aiInterval = setInterval(()=>{
        let items = Object.values(this.allTheItems);
        let index = Math.floor(Math.random() * items.length);
        console.log(GameItems[index]+" => "+items[index].icon);
        this.Game.aiSelectedItem = index;
        this.Game.aiIcon = items[index].icon;
      }, 200);
    },
    aiDestroyInterval: ()=>{
      clearInterval(this.Game.aiInterval);
    }
  }


  checkResult(twoDigit:[number, number]) {
    let item_win : number;
    
    if(twoDigit[0] == twoDigit[1]){
      this.ResultMessage=UserResult[2]; //tie
      this.Game.userScores.tie++;
      return ;
    } else if(twoDigit.includes(GameItems.Rock) && twoDigit.includes(GameItems.Scissors)){
      item_win = GameItems.Rock;
    } else if (twoDigit.includes(GameItems.Paper) && twoDigit.includes(GameItems.Scissors)) {
      item_win = GameItems.Scissors;
    } else if (twoDigit.includes(GameItems.Rock) && twoDigit.includes(GameItems.Paper)){
      item_win = GameItems.Paper;
    }
    
    if(this.Game.userSelectedItem == item_win) {
      this.ResultMessage=UserResult[1]; // win
      this.Game.userScores.win++;
    } else {
      this.ResultMessage=UserResult[3]; // lose
      this.Game.userScores.lose++;
    }
  }

  Timer = {
    time_def: 5,
    time: null,
    timer: null,
    init: () => {
      this.Game.status = true;
      this.Timer.time = this.Timer.time_def;
      this.Timer.timer = setInterval(()=> { 
        this.Timer.checkTimer();       
      }, 1000);
    },
    checkTimer: () => {
      if( --this.Timer.time == 0) {
        this.Timer.destroyTimer();
        this.Game.aiDestroyInterval();
        if(this.Game.buttonSelected == -1){
          this.ResultMessage=UserResult[3]; // lose
          this.Game.userScores.lose++;
        }
      }
    },
    destroyTimer: () => {
      this.Game.status = false;
      clearInterval(this.Timer.timer);
    }
  }

  ngOnInit() {
    
  }

}
