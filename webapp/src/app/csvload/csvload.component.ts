import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-csvload',
  templateUrl: './csvload.component.html',
  styleUrls: ['./csvload.component.css']
})
export class CsvloadComponent implements OnInit {

  @ViewChild('csvReader', {static: false}) csvReader: any;  
  records: any[] = [];  
  header: any[] = [];  
  idRun: string;
  message: any;

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private http: HttpClient) {
    this.idRun = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }


  uploadListener($event: any): void {  
  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        this.header = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.header.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  } 
  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(';');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  


  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: number) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) { 
      var text = (<string>csvRecordsArray[i]).replace(new RegExp("�", "g"), '');
      let curruntRecord = text.split(';');  

      if(curruntRecord.length == headerLength){
        
        csvArr.push(curruntRecord);  
      }

     
    }  
    return csvArr;  
  }  


  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
    this.header = [];
  }  


  previewRecords(){
    if(this.records.length > 0){
      return this.records[0];
    }
    return [];
  }


  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  


  open(content) {
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title'});
    return false;
  }

  formatNumber(value: String){
    return value.replace(new RegExp("\\+", "g"), '').replace(new RegExp("\\.", "g"), '').replace(new RegExp(",", "g"), '.');
  }

  formatStructCom(value: String){
    value = value.replace(new RegExp("\\*", "g"), '+');
    if(value.includes('/') && !value.startsWith('+++')){
      value = '+++' + value + '+++';
    }
    return value;
  }


  saveClose(modal: NgbActiveModal,form: any): void {
    //console.log('you submitted value:', form);
    
    const body = [];

    for (let record of this.records) {  
      //console.log(record);
      body.push({
        "price": this.formatNumber(record[form.csvPositionAmount]), 
        "structuredCom": this.formatStructCom(record[form.csvPositionBankCom])
      });  
    }  

    

     //console.log(body);
    // console.log(`${environment.apiUrl}/subscribers/confirmation/${this.idRun}`);
 
    
    this.http.post<any>(`${environment.apiUrl}/subscribers/confirmation/${this.idRun}`, body).subscribe({
      next: data => { this.message=data.message },
      error: error => console.error('There was an error!', error) 
   });

    modal.close();
  }


}
