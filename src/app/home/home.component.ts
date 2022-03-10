import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { CompareIDandDOB, ValidateID } from '../validators/customvalidators.validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public createUser: FormGroup;
  public isLoading: boolean = true;
  public isSubmit: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _userServ: UsersService,
    private _toast: ToastrService,
    ) {
    this.createUser = _fb.group({
      name: ['',[
        Validators.required, 
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      surname: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]] ,
      id_no: ['', [
        Validators.required, 
        Validators.minLength(13), 
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$'),
        // ValidateID
      ]],
      date_of_birth: ['',[
        Validators.required,
        Validators.pattern('^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)[0-9]{4}')
      ]]
    }, {
      validator: CompareIDandDOB('id_no', 'date_of_birth')
    })
  }

  get createUserFormControl() {
    return this.createUser.controls;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onSubmit() {
    this.isSubmit = true;
    let user = this.createUser.value;
    this._userServ.createUser(user)
    .subscribe((res) => {

      if(res.error) {
        this._toast.error(res.message);
      } else {
        this._toast.success(res.message);
      }
      this.isSubmit = false;
    })
  }

  cancel() {
    this.createUser.reset('');
  }

}
