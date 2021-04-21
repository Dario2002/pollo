export class Marker
{
    url: string;
    scaledSize: ScaledSize = {width:80,height:80}
    constructor (url : string, dim: number){
    this.url = url;
    this.scaledSize.width = dim;
    this.scaledSize.height = dim;
    }
}

interface ScaledSize
{
  width : number,
  height: number
}
