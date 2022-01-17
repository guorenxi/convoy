import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../components/loader/loader.module';

const routes: Routes = [{ path: '', component: TeamComponent }];

@NgModule({
	declarations: [TeamComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, LoaderModule, RouterModule.forChild(routes)]
})
export class TeamModule {}
