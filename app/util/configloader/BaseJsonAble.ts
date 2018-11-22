import { JsonDataContainer } from "./JsonDataContainer";

export abstract class BaseJsonAble{
    /**
     * 从实体获得类的名字
     */
      public abstract getInstanceClassName():string;

    /**
     * 强制每个Json必须有一个ID字段
     */
      public abstract getID():number;

    /**
     * 创建一个容纳自己的json数据容器，方便查找等等。
     */
      public abstract createNewContainer (): JsonDataContainer<BaseJsonAble>

}