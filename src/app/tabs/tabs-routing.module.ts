import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '', loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
                    }
                ]
            },
            {
                path: 'tab2',
                children: [
                    {
                        path: '', loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
                    }
                ]
            },
            {
                path: 'tab3',
                children: [
                    {
                        path: '', loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
                    }
                ]
            },
            {
                path: 'offer',
                loadChildren: () => import('../offer/offer.module').then(m => m.OfferPageModule)
            },
            {
                path: 'category',
                loadChildren: () => import('../category/category.module').then(m => m.CategoryPageModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
                path: 'login',
                loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
            },
            {
                path: 'signup',
                loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule)
            },
            {
                path: 'products',
                loadChildren: () => import('../products/products.module').then(m => m.ProductsPageModule)
            },
            {
                path: 'editprofile',
                loadChildren: () => import('../editprofile/editprofile.module').then(m => m.EditprofilePageModule)
            },
            {
                path: 'product/:id',
                loadChildren: () => import('../product-info/product-info.module').then(m => m.ProductInfoPageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
