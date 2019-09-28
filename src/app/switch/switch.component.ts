import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})

export class SwitchComponent implements OnInit {

  xIndex : number  = null;
  yIndex : number  = null;
  manualToggle: boolean = false;
  switchgroupClass: string = ".switch_group";
  switchClass: string = "switched";
  errors: string = "";

  btns = [
    ["1","2","3","4"],
    ["1","2","3","4"],
    ["1","2","3","4"],
    ["1","2","3","4"]
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleSwitch(eventTarget: Element,  manualOverride: boolean){
    manualOverride ? 
      eventTarget.classList.toggle(this.switchClass, this.manualToggle) : 
      eventTarget.classList.toggle(this.switchClass);
  }

  formValidation(){
    let selectedButton : Element;
    this.errors = "";
    (this.xIndex == 0 && this.yIndex == 0) || 
    (!this.xIndex && !this.yIndex)  ? 
      this.errors += "X and Y Coordinate is empty"  : 
    this.xIndex > this.btns.length  || this.xIndex <= 0 || !this.xIndex? 
      this.errors += "in X Coordinate Field"  : 
    this.yIndex > this.btns[this.xIndex - 1].length || this.yIndex <= 0 || !this.yIndex ?
      this.errors += "in Y Coordinate Field" : 
    true;

    !this.errors ? (selectedButton = document.querySelectorAll(this.switchgroupClass)[this.xIndex - 1].querySelectorAll("button")[this.yIndex - 1]): true;
    selectedButton && selectedButton.classList.contains(this.switchClass) && this.manualToggle ? this.errors += "Button is already On" :
    selectedButton && !selectedButton.classList.contains(this.switchClass) && !this.manualToggle ? this.errors += "Button is already Off" : true;

  }

  switchOverride(){
    this.formValidation();
    !this.errors ? this.toggleSwitch(document.querySelectorAll(this.switchgroupClass)[this.xIndex - 1].querySelectorAll("button")[this.yIndex - 1], true) : true;
  }

  resetAll(){
    this.errors = "";
    document.querySelectorAll("button.switch").forEach(function(x){ 
      x.classList.remove("switched");
    });
  }

}
