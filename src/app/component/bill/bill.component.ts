import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Command } from 'src/app/model/command';
import { CommandService } from 'src/app/service/command.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  command: Command;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly commandService: CommandService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      if (params.id) {
        this.command = await this.commandService.findCommandById(params.id).toPromise();
      }
    });
  }

  onPrint(): void {
    window.print();
  }
}
