import * as moment from 'moment';
export class CrystalDateSeconds{
    date: Date;
    constructor(d: Date | string){
        if(typeof d === "string"){
            let resp = moment.utc(d,'YYYYMMDDHHmmss', true)
            if(!resp.isValid()){ throw new Error('Invalid Format'); }
            else{ this.date = resp.toDate();}
        }else{
            this.date = d;
        }
    }
    format(format : string = null) : string {
        return moment.utc(this.date).format(format || 'YYYYMMDDHHmmss');
    }
    formatClient(format : string = null) : string {
        return moment(this.date).format(format || 'DD/MM/YYYY HH:mm');
    }
}
