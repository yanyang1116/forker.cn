1. state 的连接通过 @作用域/具体 value
2. action 的连接通过 $作用域/具体 action，action 应该为纯函数
3. 关于异步
    - action 用 async 标识异步 action，以表明可能要做具体的异步逻辑：$article/asyncSetList
    - 异步 action 可以接受页面入参，来完成页面逻辑
    - 异步 action 只关心 store state 变化，ajax 请求，参数都由页面传递进来
    - 异步 action 专门用到的 dispatch，可以不暴露
4. store change logger // TODO
5. 思考，如何把用户行为完整记录下来 // TODO
