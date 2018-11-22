import KeyedCollection from "./KeyedCollection";
import { JsonDataContainer } from "./JsonDataContainer";
import { BaseJsonAble } from "./BaseJsonAble";

export class  ConfigDataLoader {
    //单例模式，用作场景管理类
    private static _configDataLoader: ConfigDataLoader;

    private mapProxyContainer: KeyedCollection<JsonDataContainer<BaseJsonAble>> = new KeyedCollection<JsonDataContainer<BaseJsonAble>>();

    //全局唯一个实例，只能通过该函数访问
    public static getInstance(): ConfigDataLoader {
        if (!ConfigDataLoader._configDataLoader) {
            ConfigDataLoader._configDataLoader = new ConfigDataLoader();
        }
        return ConfigDataLoader._configDataLoader;
    }

    //只能内部创建,防止外部随便创建该类
    private constructor() {
        // this.loadDataConfig(1, GameServer)
    }


       /**
     * 同步读取资源
     * @param id        资源ID
     * @param ctor       需要读取的类
     * @param completeCb    读取完毕的回调函数
     */
     getDataConfigSync <T extends BaseJsonAble> (id:number, ctor: { new (): T }):T{
        let result : T = new ctor();

        /**
         * 通过实体获取实体所在类的，getInstanceClassName 为自动生成，所以几乎不会出错。
         * 这样处理能快速知道所在的类，加快查询速度
         * @type {string}
         */
        let className =  result.getInstanceClassName();

        /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
        let containerMap: JsonDataContainer<BaseJsonAble>;

        if(this.mapProxyContainer.ContainsKey(className)){
            containerMap = this.mapProxyContainer.Item(className);
            //从该表获取数据
        }
        else {
            //每个数据类都有一个对应的容器类，自动生成代码，加快开发效率
            containerMap =  result.createNewContainer();
            containerMap.initMapSync();


            this.mapProxyContainer.Add(className, containerMap);
   
        }

         //从该表获取数据
		 let resultJson = containerMap.getItem(id);
		 
		 if(resultJson == null)
		 	return null;

         (<any>Object).assign(result, resultJson);
         return result;
    }


    /**
     * 异步读取资源
     * @param id        资源ID
     * @param ctor       需要读取的类
     * @param completeCb    读取完毕的回调函数
     */
     async  getDataConfigAsync <T extends BaseJsonAble> (id:number, ctor: { new (): T }):Promise<T>{
        let result : T = new ctor();

        /**
         * 通过实体获取实体所在类的，getInstanceClassName 为自动生成，所以几乎不会出错。
         * 这样处理能快速知道所在的类，加快查询速度
         * @type {string}
         */
        let className =  result.getInstanceClassName();

        /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
        let containerMap: JsonDataContainer<BaseJsonAble> = await this.getContainerAsync(result.createNewContainer,className);
        

         //从该表获取数据
         let resultJson = containerMap.getItem(id);

         (<any>Object).assign(result, resultJson);
         return result;


    }

    //没有则构建一个容器
    private async getContainerAsync (createFun :()=>JsonDataContainer<BaseJsonAble>, className:string):Promise<JsonDataContainer<BaseJsonAble>>{

               /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
        let containerMap: JsonDataContainer<BaseJsonAble>;

        if(this.mapProxyContainer.ContainsKey(className)){
            containerMap = this.mapProxyContainer.Item(className);
            //从该表获取数据
        }
        else {
            //每个数据类都有一个对应的容器类，自动生成代码，加快开发效率
            containerMap =  createFun();
            await containerMap.initMapAsync();


            this.mapProxyContainer.Add(className, containerMap);
   
        }
        return containerMap;
    }


    /**
     * 异步读取资源
     * @param id        资源ID
     * @param ctor       需要读取的类
     * @param completeCb    读取完毕的回调函数
     */
    async  getAllDataConfigAsync <T extends BaseJsonAble> (ctor: { new (): T }):Promise<T[]>{
        let result : T = new ctor();

        /**
         * 通过实体获取实体所在类的，getInstanceClassName 为自动生成，所以几乎不会出错。
         * 这样处理能快速知道所在的类，加快查询速度
         * @type {string}
         */
        let className =  result.getInstanceClassName();

        /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
         /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
        let containerMap: JsonDataContainer<BaseJsonAble> = await this.getContainerAsync(result.createNewContainer,className);

         //从该表获取数据

         return <T[]>containerMap.items();


    }

    /**
     * 异步读取资源
     * @param id        资源ID
     * @param ctor       需要读取的类
     * @param completeCb    读取完毕的回调函数
     */
    async  getDatasConfigAsync <T extends BaseJsonAble> (ids:number[], ctor: { new (): T }):Promise<T[]>{
        let result : T = new ctor();

        /**
         * 通过实体获取实体所在类的，getInstanceClassName 为自动生成，所以几乎不会出错。
         * 这样处理能快速知道所在的类，加快查询速度
         * @type {string}
         */
        let className =  result.getInstanceClassName();

        /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
         /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
        let containerMap: JsonDataContainer<BaseJsonAble> = await this.getContainerAsync(result.createNewContainer,className);

        var resultArray:T[] = [];
        for(var id of ids){
            let resultJson = containerMap.getItem(id);
            if(resultJson){
                let va  = {};
                Object.assign(va, resultJson);
                resultArray.push(<any>va );
            }
        }
         //从该表获取数据

         return resultArray;


    }


       /**
     * 异步读取资源的长度
     * @param id        资源ID
     * @param ctor       需要读取的类
     * @param completeCb    读取完毕的回调函数
     */
    async  getDatasConfigLenthAsync <T extends BaseJsonAble> ( ctor: { new (): T }):Promise<number>{
        let result : T = new ctor();

        /**
         * 通过实体获取实体所在类的，getInstanceClassName 为自动生成，所以几乎不会出错。
         * 这样处理能快速知道所在的类，加快查询速度
         * @type {string}
         */
        let className =  result.getInstanceClassName();

        /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
         /**
         * 获取一个查询数据的一个表，没有则创建，
         * 已经有了则用已经读取过的内存里面的数据。
         */
        let containerMap: JsonDataContainer<BaseJsonAble> = await this.getContainerAsync(result.createNewContainer,className);


         //从该表获取数据

         return containerMap.length();

    }
}