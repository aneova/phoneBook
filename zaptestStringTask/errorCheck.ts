import { HelperService } from '../services/helper.service';

export  class HeroesComponent implements OnInit {
...
  private heroes: Hero[];
...
  constructor(private helperService: HelperService) {}
...
}

heroes.component.html:

<ul class="heroes">
<li *ngFor="let hero of heroes"    [class.selected]="hero === selectedHero"     (click)="onSelect(hero)">
<a href="/hero/{{hero.id}}"><span class="badge">{{hero.id}}</span> {{ helperService.getHeroDisplayName(hero) }}</a>
</li>
</ul>

Firts of all, this string will cause the error
private heroes: Hero[];
because of the access isssue.
error TS2341: Property 'Hero' is private and only accessible within class 'HeroesComponent'.
The second one is the invoke of the function getHeroDisplayName through the service.
The best practice is to keep name of object like interface or class and get access to object properties as
{{hero.name}} not as {{ helperService.getHeroDisplayName(hero) }}
