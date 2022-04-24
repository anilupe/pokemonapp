import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProfileComplete } from 'src/app/models/profile-model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredHobby!: Observable<string[]>;
  hobbies: string[] = [];
  profileForm: FormGroup;
  allHobbies: string[] = ['Jugar Fútbol', 'Jugar Basquetball', 'Jugar Tennis', 'Jugar Voleibol', 'Jugar Fifa', 'Jugar Videojuegos'];
  @ViewChild('hobbyInput') hobbyInput!: ElementRef<HTMLInputElement>;
  
  @Output() submit = new EventEmitter<ProfileComplete>();

  constructor(private formBuilder: FormBuilder) {

    this.profileForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      hobby: new FormControl("", []),
      hobbyInput: new FormControl("", [Validators.required]),
      dni: new FormControl("", [Validators.required]),
      age:new FormControl("", []),
      birthdate: new FormControl("", [Validators.required]),
    });
  }
  next() {
    let profile:ProfileComplete={
      name:this.profileForm.get('name')?.value,
      age:this.profileForm.get('age')?.value,
      dni:this.profileForm.get('dni')?.value,
      hobby:this.profileForm.get('hobbyInput')?.value
    }
    this.submit.emit(profile);
  }
  ngOnInit(): void {
    this.profileForm.valueChanges.subscribe(value=>{
    })
    this.profileForm.get('birthdate')?.valueChanges.subscribe(value => {
      if (this.getAge(value) >= 18) {
        this.profileForm.controls['dni']?.setValidators([Validators.required]);
      } else {
        this.profileForm.controls['dni']?.clearValidators();
      }
      this.profileForm.controls['dni'].updateValueAndValidity()
    });
    this.filteredHobby = this.profileForm.get('hobby')!.valueChanges.pipe(
      startWith(null),
      map((hobby: string | null) => (hobby ? this._filter(hobby) : this.allHobbies.slice())),
    );
  }
  getAge(date: Date) {
    var timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age= Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    this.profileForm.get('age')?.setValue(age);
    return age;
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our hobby
    if (value) {
      this.hobbies.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.profileForm.get('hobby')!.setValue(null);
  }

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);
    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
    this.profileForm.get('hobbyInput')?.setValue(this.hobbies.length>0?this.hobbies:null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbyInput.nativeElement.value = '';
    this.profileForm.get('hobby')!.setValue(null);
    this.profileForm.get('hobbyInput')?.setValue(this.hobbies);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allHobbies.filter(hobby => hobby.toLowerCase().includes(filterValue));
  }
}
