import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Injectable()
export class UserEffects {
    user_id: string = '';
  constructor(private actions$: Actions, private userService: ApiServiceService) {
    this.user_id = localStorage.getItem('data') ? (JSON.parse(localStorage.getItem('data')|| 'false').body.id) : '';
  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers(this.user_id).pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );
}
