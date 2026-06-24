import { Injectable, signal } from '@angular/core';

interface User {
    username : string,
    role : 'user' | 'admin'
}

@Injectable({
    providedIn : 'root'
})



export class UserStore {

    user = signal<User | null>(null)

    login(username: string, role :  'admin' | 'user'){
        this.user.set({username, role})
    }

    logout(){
        this.user.set(null)
    }

    isAdmin() {
        return this.user()?.role === 'admin'
    }




}
