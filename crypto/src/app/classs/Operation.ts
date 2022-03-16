export class Operation {
    public fkUsuario:number=0;
    public tipoMovimiento:number=0;
    public fkMoneda:number=0;
    public cantidad:number=0;
    public destino:boolean=false;

    constructor(fkUsuario:number,fkMoneda:number,tipoMovimiento:number,cantidad:number,destino:boolean){
        this.fkUsuario=fkUsuario;
        this.tipoMovimiento=tipoMovimiento;
        this.fkMoneda=fkMoneda;
        this.cantidad=cantidad;
        this.destino=destino;
    }
}
  