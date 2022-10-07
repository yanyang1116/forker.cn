1. 一个 reducer 只负责一个 state value 的变化

2. 业务中，可以 dispatch 多个 action，reducer 通过 action type + action payload 来决定负责的 value 如何变化

3. action type 使用帕斯卡风格，以示区分

---

分层：

非常有必要为 state、reducer、action 进行命名空间的分层

article/... 下的任何 state value

dispatch('article', 函数) // 这个要二次封装

有了上面两个分层，reducer 就比较自然而然
