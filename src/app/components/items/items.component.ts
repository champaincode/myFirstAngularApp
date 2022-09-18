import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;
  constructor(private itemService:ItemService) {}

  ngOnInit(): void {
    // this.items = this.itemService.getItems()
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.getTotal();
    });
  }

  deleteItem(item: Item) {
    this.items = this.items.filter(i => i.id != item.id);
    this.itemService.deleteItem(item).subscribe();
    this.getTotal();
  }
  toggleItem(item: Item) {
    this.itemService.toggleItem(item).subscribe()
    this.getTotal();
  }
  addItem(item:Item){
  
    this.itemService.addItem(item).subscribe(i => {
      this.items.unshift(i);
      this.getTotal();
    });
  }

  getTotal() {
    this.total = this.items
    .filter(item => item.completed === false)
    .map(item => item.price * item.quantity)
    .reduce((acc, item) => acc += item, 0);
  }
}
