class Auth_user {
    constructor() {
        document.querySelector('body').style.display = 'none';
        const auth_user = localStorage.getItem('auth_user');
        this.validtateAuth(auth_user);
    }

    // ! check if users are logged in by the localStorage.
    validtateAuth(auth_user){
        console.log(auth_user);
        if (auth_user != 1) {
            // ! if users are not logged in, Page will navigate to login
            window.location.replace('/b-login');
        }else{
            document.querySelector('body').style.display = 'block';
        }
    }
    logout(){
        localStorage.removeItem('auth_user');
        window.location.replace('/b-login')
    }
}