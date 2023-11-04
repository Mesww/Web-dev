class Auth_admin {
    constructor() {
        document.querySelector('body').style.display = 'none';
        const auth_admin = localStorage.getItem('auth_admin');
        this.validtateAuth(auth_admin);
    }

    // ! check if admins are logged in by the localStorage.
    validtateAuth(auth_admin){
        console.log(auth_admin);
        if (auth_admin != 1) {
            // ! if admins are not logged in, Page will navigate to login
            window.location.replace('/b-login/admin');
        }else{
            // window.location.replace('/admin/dashboard')
            
            document.querySelector('body').style.display = 'block';
        }
    }
    logout(){
        localStorage.removeItem('auth_admin');
        window.location.replace('/b-login/admin')
    }
}