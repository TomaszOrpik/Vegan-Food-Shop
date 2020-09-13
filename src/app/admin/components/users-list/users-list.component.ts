import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetUsersDataService } from 'src/app/shared/services/get-users-data.service';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/shared/models/session';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  getAllSub: Subscription;
  usersList: string[] = [];

  constructor(private getUserData: GetUsersDataService) { }

  ngOnInit(): void {
    this.getAllSub = this.getUserData.getGlobalSessions().subscribe((sessions: Session[]) => {
      const tempUserList = sessions.map((ss: Session) => ss.userId);
      this.usersList = [...new Set(tempUserList)];
    });
  }

  ngOnDestroy() {
    this.getAllSub.unsubscribe();
  }

}
