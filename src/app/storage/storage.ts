import {InjectionToken} from '@angular/core';
export class Storage {
}
export const BROWSER_STORAGE=new InjectionToken<Storage>('Browser Storage',{
	providedIn:'root',factory:()=> localStorage
});
