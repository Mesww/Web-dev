//! call calss Auth  
const auth_user = new Auth_user();

document.querySelector('#signout').onclick = function(){
    // alert('ok');
    Swal.fire({
        title: 'Do you want to sign out',
        color:'#FFA559',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFA559',
        cancelButtonColor: '#FFE6C7',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Sure'
        
      }).then((result) => {
        if (result.isConfirmed) {
          auth_user.logout('/b-login');
        }
      });
}

