import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/entities/user.entity';
import { AccountService } from '../../services/account.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserInfoValidatonService, Error } from './user-info-validaton.service';

@Component({
    selector: 'ss-account',
    templateUrl: './create-account.component.html',
    providers: [UserInfoValidatonService]
})

export class CreateAccountComponent {
    user = new User();
    err = { email: "", main: "", password: "", self_bio: "", institution: "", firstname: "", lastname: "", username: "", conf_email: "", conf_password: "" };
    msgclass = "alert alert-success";

    constructor(private _accountService: AccountService, private _authService: AuthenticationService,
                private _validationService: UserInfoValidatonService, private _router: Router) { }

    createAccount() {
        let formValid = this._validationService.validateAll(this.user, $("#email").val(), $("#conf_email").val(), $("#conf_password").val());
        if (formValid) {
            this._accountService.create(this.user)
                .subscribe(
                result => this.handleResult(result),
                error => console.log(error)
                );
        }
        else {
            this.err.main = "Fill all required fields and resolve all the errors.";
            this.msgclass = "alert alert-danger";
        }
    }

    handleResult(result: any) {
        if (result.errno == '0') {
            this._authService.login(this.user.username, this.user.password)
                .subscribe(
                result => {
                    this._accountService.addUserEmail(this.user.username, $("#email").val());
                    this.err.main = "Account created. You will be redirected to login page now.";
                    this.msgclass = "alert alert-success";
                    this._router.navigate(["/login"]);
                },
                error => { return }
                )
        }
        else {
            this.err.main = result.errstr;
            this.msgclass = "alert alert-danger";
        }
    }

    validate(event: any) {
        let id = event.srcElement.id;
        let currentErr : Error = new Error(0, "");
        switch (id) {
            case "email":
                     currentErr = this._validationService.is_valid_email($("#email").val());
                     this.err.email = currentErr.errstr;
                     break;
            case "conf_email":
                    currentErr = this._validationService.do_emails_match($("#email").val(), $("#conf_email").val());
                    this.err.conf_email = currentErr.errstr;
                    break;
            case "password":
                    currentErr = this._validationService.is_valid_password(this.user.password);
                    this.err.password = currentErr.errstr;
                    break;
            case "conf_password":
                    currentErr = this._validationService.do_passwords_match(this.user.password, $("#conf_password").val());
                    this.err.conf_password = currentErr.errstr;
                    break;
            case "self_bio":
                    currentErr = this._validationService.is_valid_self_bio(this.user.self_bio);
                    this.err.self_bio = currentErr.errstr;
                    break;
            case "institution":
                    currentErr = this._validationService.is_valid_institution(this.user.institution);
                    this.err.institution = currentErr.errstr;
                    break;
            case "firstname":
                    currentErr = this._validationService.is_valid_firstname(this.user.firstname);
                    this.err.firstname = currentErr.errstr;
                    break;
            case "lastname":
                    currentErr = this._validationService.is_valid_lastname(this.user.lastname);
                    this.err.lastname = currentErr.errstr;
                    break;
            case "username":
                    currentErr = this._validationService.is_valid_username(this.user.username);
                    this.err.username = currentErr.errstr;
                    break;
        }
    }
}