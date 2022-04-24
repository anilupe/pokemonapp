import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';

export interface Pokemon {
  position: number,
  image: string,
  name: string
}

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})

export class PokemonViewComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  constructor(private pokemonService: PokemonService) { }
  searchPokemon = new FormControl();
  ngOnInit(): void {
    this.searchAll();

  }
  searchAll() {
    let pokemonData: Pokemon;
    for (var index = 1; index < 10; index++) {
      this.pokemonService.getPokemons(index).subscribe(
        res => {
          console.log(res)
          pokemonData = {
            position: res.id,
            image: res.sprites.front_default,
            name: res.name
          };

          this.pokemonList.push(pokemonData);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  search(event: any) {
    let index = event.target.value;
    let pokemonData: Pokemon;
    this.pokemonList = [];

    if (index == "")
      this.searchAll();
    else
      this.pokemonService.getPokemons(index).subscribe(
        res => {
          pokemonData = {
            position: res.id,
            image: res.sprites.front_default,
            name: res.name
          };

          this.pokemonList.push(pokemonData);
        },
        err => {
          console.log(err);
        }
      );
  }
}
