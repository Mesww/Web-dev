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
          window.location.replace('/views/b-login.html');
        }
      });
}
