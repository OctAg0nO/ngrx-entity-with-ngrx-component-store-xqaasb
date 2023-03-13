import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

export interface State extends EntityState<Hero>{
}

export const adapter = createEntityAdapter<Hero>();

export const initialState = adapter.getInitialState();

export const { selectAll, selectEntities } = adapter.getSelectors();

@Injectable({ providedIn: 'root' })
export class HeroService extends ComponentStore<State>{
  heroes$ = this.select(selectAll);
  heroEntities$ = this.select(selectEntities);
  hero = (id: number) => this.select(
    this.heroEntities$,
    (entities) => entities[id]
  );

  constructor(private messageService: MessageService) {
    super(adapter.addAll(HEROES, initialState));
    console.log('HeroService created');
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return this.heroes$;
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.hero(id);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/