import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }
  showSuccess(message, title){
    this.toastr.success(message, title,{positionClass:'toast-bottom-center'});
  }
  showError(message,title){
    this.toastr.error(message,title,{positionClass:'toast-bottom-center'});
  }
  showWarning(message,title){
    this.toastr.warning(message,title,{positionClass:'toast-bottom-center'});
  }
  showInfo(message,title){
    this.toastr.info(message,title,{positionClass:'toast-bottom-center'});  
  }
}
