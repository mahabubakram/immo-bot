import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        HttpModule,
        RouterModule,
    ],
    providers: [],
    exports: [NavbarComponent]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
