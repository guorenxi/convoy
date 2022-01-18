import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	searchForm: FormGroup = this.formBuilder.group({
		search: ['', Validators.required]
	});
	@Output() searchInput = new EventEmitter<string>();
	@Output() clear = new EventEmitter<any>();
	@Input() searchPlaceholder: string = '';
	@Input() searchFilter: boolean = false;
	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

	search() {
		this.searchInput.emit(this.searchForm.value.search);
	}

	clearSearch() {
		this.searchForm.reset();
		this.clear.emit()
	}
}
