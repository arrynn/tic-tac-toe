import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyComponent implements OnInit {
  @ViewChild("submitBtn") submitBtn: ViewChild;
  lobbyService: LobbyService;

  name: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ]);

  constructor(private apiService: ApiService) {
    this.lobbyService = this.apiService.lobbyService
  }

  ngOnInit(): void {}

  joinLobby(): void {
    if (!this.name.valid) {
      this.handleInvalidForm();
      return;
    }

    this.apiService.joinLobby(this.name.value);
  }
  private handleInvalidForm(): void {
    alert('The name must be at least 3 characters long.');
  }
}
