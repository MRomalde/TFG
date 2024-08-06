import { Component, Input } from '@angular/core';
import { Hero } from '../heroes/hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  @Input() hero!: Hero | undefined;

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }
  
  getHero(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      // Ahora puedes usar `id` de manera segura
      this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    }
    else{}
  
  }
}
