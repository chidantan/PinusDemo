
import KeyedCollection from "./KeyedCollection";
// import * as fs  from "fs";
import {
	getLogger
} from 'pinus-logger';
import { BaseJsonAble } from "./BaseJsonAble";
// import { promisify } from 'bluebird';
import * as fs   from 'mz/fs';
import * as path   from 'path';
import { retry } from "async";
var logger = getLogger(__filename);

export class  JsonDataContainer<T extends BaseJsonAble>{
    private readonly  resName:string;
    private readonly  resUrl:string;
    private readonly ctor: { new (): T };
    public  constructor(resName:string,  ctor: { new (): T }){
        this.resName =  resName;
        //获取当前目录绝对路径，这里resolve()不传入参数
        var filePath = path.resolve();
        this.resUrl = path.resolve( "app/configdata/" + resName);
        this.ctor = ctor;
    }
    /**
     *  默认会构建一个hash表，方便查询
     */
   protected dataMap :  Map<number, T> = new Map();
   private  isIniting:boolean = false;
   private  isInited:boolean = false;

    /**
     *    异步构建Json资源融器
     * @param compFunc   转换完毕的回调函数
     * @param thisObject
     */
    public  async  initMapAsync( ){
        //已经创建则返回，不执行下面读取逻辑
         if(this.isInited ){
             return;
         }

         try{
             var contents: string = await fs.readFile (this.resUrl,{encoding: 'utf8'});
         }catch(err){
                logger.error('illegal data， no id Property', JSON.stringify(err));
            }


         this.isInited = true;
         var result:Array<any> =  JSON.parse(contents);
         result.forEach(element => {
            if(element.hasOwnProperty('id')){
                let newInstance: T = new this.ctor();
                (<any>Object).assign(newInstance, element);
                this.dataMap.set(element['id'], newInstance);
            }
            else {
               ;
            }
        });
    }


    /**
     *    同步构建Json资源融器
     * @param compFunc   转换完毕的回调函数
     * @param thisObject
     */
    public   initMapSync( ){
        //已经创建则返回，不执行下面读取逻辑
         if(this.isInited ){
             return;
         }

         try{
             var contents: string =  fs.readFileSync (this.resUrl,{encoding: 'utf8'});
         }catch(err){
                logger.error('load config data errror, url is ' + this.resUrl + ". error is " + err);
            }


         this.isInited = true;
         var result:Array<any> =  JSON.parse(contents);
         result.forEach(element => {
            if(element.hasOwnProperty('id')){
                let newInstance: T = new this.ctor();
                (<any>Object).assign(newInstance, element);
                this.dataMap.set(element['id'], newInstance);
            }
            else {
               ;
            }
        });
    }

    public getItem(id:number):T{
        return   this.dataMap.get(id);
    }

    public items():Array<T>{
        return Array.from(this.dataMap.values()) ;
    }

    public length():number{
        return this.dataMap.size;
    }
}