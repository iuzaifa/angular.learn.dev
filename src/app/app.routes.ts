import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './dashboard/profile/profile';
import { Settings } from './dashboard/settings/settings';
// import { Home } from './routing-demo/pages/home/home';
// import { About } from './routing-demo/pages/about/about';
// import { Contact } from './routing-demo/pages/contact/contact';

export const routes: Routes = [
    // {path : '', component : Home},
    // {path : 'about', component : About},
    // {path : 'contact', component : Contact}


    {   
        path : "dashboard",
        component : Dashboard,
        children : [
            {path : "profile", component : Profile},
            {path : "settings", component : Settings}
        ]
    },
    {path : "", redirectTo : "dashboard", pathMatch : 'full'}

];
