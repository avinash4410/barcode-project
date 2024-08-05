import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExportService } from 'src/app/services/export.service';
import { ReportService } from 'src/app/services/report.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-single-report',
  templateUrl: './single-report.component.html',
  styleUrls: ['./single-report.component.scss']
})
export class SingleReportComponent implements OnInit {
  data: any;
  id: any
  // id: 'tblOldDb'  {
  // window.print();}


  myReactiveForm!: FormGroup;
  // constructor(private route: ActivatedRoute, private service: ItemService, private router: Router) {}
  constructor(private service: ReportService, private route: ActivatedRoute, private exportSerrive : ExportService) { }
  ngOnInit(): void {
    console.log("Helllooooooooooo");
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
