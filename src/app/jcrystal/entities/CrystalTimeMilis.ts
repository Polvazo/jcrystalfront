import * as moment from 'moment';
export class CrystalTimeMilis{
    date: Date;
    constructor(d: Date | string){
        if(typeof d === "string"){
            let resp = moment.utc(d,'HHmmssSSS', true)
            if(!resp.isValid()){ throw new Error('Invalid Format'); }
            else{ this.date = resp.toDate();}
        }else{
            this.date = d;
        }
    }
    format(format : string = null) : string {
        return moment.utc(this.date).format(format || 'HHmmssSSS');
    }
    formatClient(format : string = null) : string {
        return moment(this.date).format(format || 'HH:mm:ss');
    }
}
