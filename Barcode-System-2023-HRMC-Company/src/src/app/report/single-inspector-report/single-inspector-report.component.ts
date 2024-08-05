import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-single-inspector-report',
  templateUrl: './single-inspector-report.component.html',
  styleUrls: ['./single-inspector-report.component.scss']
})
export class SingleInspectorReportComponent {
  data: any;
  id: any
  myReactiveForm!: FormGroup;
  // constructor(private route: ActivatedRoute, private service: ItemService, private router: Router) {}
  constructor(private service: ReportService, private route: ActivatedRoute) { }
  ngOnInit():void{
    this.route.params.subscribe(params => {
      console.log(params);
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        console.log(this.id);
        this.service.getSingle(this.id).subscribe(res => {
          this.data = res[0];
          console.log(res);
           })
      }
    })
  }
}
